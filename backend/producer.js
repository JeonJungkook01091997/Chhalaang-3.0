const { Kafka } = require('kafkajs');
const fs = require('fs');

// Kafka producer setup
const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092'], // Replace with your Kafka broker
});
const producer = kafka.producer();

// Function to read and parse JSON file in batches of 1,000
const parseJSONData = (filePath, batchSize) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const jsonData = JSON.parse(data);
        const batches = [];
        for (let i = 0; i < jsonData.length; i += batchSize) {
          batches.push(jsonData.slice(i, i + batchSize));
        }
        resolve(batches);
      }
    });
  });
};

// Function to send data to Kafka
const sendBatch = async (batch) => {
  try {
    const messages = batch.map((entry) => ({
      key: entry.imei_substring.toString(),
      value: JSON.stringify(entry),
    }));

    await producer.send({
      topic: 'alerts-topic',
      messages: messages,
    });

    console.log(`Sent batch of ${messages.length} messages at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Error sending batch:', error);
  }
};

// Start producer
const startProducer = async () => {
  const dataBatches = await parseJSONData('data.json', 100); // Read batches of 1,000 entries from JSON

  await producer.connect();
  console.log('Kafka Producer connected');

  for (const batch of dataBatches) {
    await sendBatch(batch); // Send each batch to Kafka
    await new Promise((resolve) => setTimeout(resolve, 100)); // Delay of 1 second between batches
  }
};

startProducer().catch(console.error);
