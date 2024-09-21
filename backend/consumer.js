const { Kafka } = require('kafkajs');
const redis = require('redis');
const mongoose = require('mongoose');
const moment = require('moment');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/alerts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const alertSchema = new mongoose.Schema({
  imei: String,
  condition: String,
  createdAt: { type: Date, default: Date.now },
});
const Alert = mongoose.model('Alert', alertSchema);

// Kafka consumer setup
const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'alerts-group' });

// Redis setup
const redisClient = redis.createClient();

// Helper function to trigger alerts and save to MongoDB
const triggerAlert = async (imei, condition) => {
  const alertExists = await redisClient.hgetAsync(`${imei}-alerts`, condition);
  if (!alertExists) {
    console.log(`Triggering alert for IMEI: ${imei}, Condition: ${condition}`);

    // Save alert in Redis to prevent multiple alerts
    await redisClient.hsetAsync(`${imei}-alerts`, condition, true);

    // Save alert to MongoDB
    const alert = new Alert({ imei, condition });
    await alert.save();
    console.log('Alert saved to MongoDB');
  }
};

// Process each message and check for alerts
const processMessage = async (message) => {
  const data = JSON.parse(message.value.toString());
  const imei = data.imei_substring;
  const lastSeenAt = data.last_seen_at ? moment(data.last_seen_at) : null;
  const currentTime = moment();
  const batteryPercentage = data.battery_percentage;

  // Retrieve previous data from Redis
  const previousData = await redisClient.hgetallAsync(imei);
  const previousLastSeenAt = previousData?.last_seen_at ? moment(previousData.last_seen_at) : null;

  // Condition 1: If last data was received 20 minutes ago
  if (previousLastSeenAt && currentTime.diff(previousLastSeenAt, 'minutes') >= 20) {
    await triggerAlert(imei, 'Condition 1: Last data received 20 mins ago');
  }

  // Condition 2: If battery percentage is less than 10
  if (batteryPercentage !== null && batteryPercentage < 10) {
    await triggerAlert(imei, 'Condition 2: Battery < 10');
  }

  // Condition 3: If battery < 10 and last data received time was 10 minutes ago
  if (batteryPercentage !== null && batteryPercentage < 10 && previousLastSeenAt && currentTime.diff(previousLastSeenAt, 'minutes') >= 10) {
    await triggerAlert(imei, 'Condition 3: Battery < 10 and last data received 10 mins ago');
  }


  const createAlert = async () => {
    const alert = new Alert({
        id: 340981,
        alert_type: 'LowCharge',
        vehicle_id: 'AB93EF6RFPB545339',
        message: 'Low Battery',
        value: '9%',
        status: 'resolved',
        created_at: new Date('2024-09-04T18:15:02.595Z'), // ISO format
        updated_at: new Date('2024-09-04T18:51:04.894Z'),
        isCritical: true,
    });

    try {
        const savedAlert = await alert.save(); // Save the alert to MongoDB
        console.log('Alert created:', savedAlert);
    } catch (error) {
        console.error('Error creating alert:', error);
    }
};

  // Update Redis with the latest data
  await redisClient.hmsetAsync(imei, {
    last_seen_at: data.last_seen_at,
    battery_percentage: batteryPercentage,
    drive_mode: data.drive_mode,
    longitude: data.longitude,
    latitude: data.latitude,
  });

  console.log(`Processed data for IMEI: ${imei}`);
};

// Start the consumer and process batches
const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'alerts-topic', fromBeginning: true });

  await consumer.run({
    eachBatch: async ({ batch }) => {
      const messagePromises = batch.messages.map((message) => processMessage(message));
      await Promise.all(messagePromises); // Process each message in parallel
      console.log('Batch processed');
    },
  });
};

startConsumer().catch(console.error);
