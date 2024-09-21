const { Kafka } = require('kafkajs');
const WebSocket = require('ws');
const { MongoClient } = require('mongodb');
// const Client = require("mongo.js")

// Kafka setup
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Replace with your Kafka broker
});
const consumer = kafka.consumer({ groupId: 'my-group' });

// MongoDB setup
const uri = process.env.DB_URL;
const mongoPort = process.env.MONGO_PORT || 5000
const client = new MongoClient(uri);
const dbName = 'myDatabase';
const collectionName = 'kafkaMessages';
let db, collection;

// WebSocket setup
const wss = new WebSocket.Server({ port: 8080 });
const clients = [];

// WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');
  clients.push(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
    const index = clients.indexOf(ws);
    if (index > -1) clients.splice(index, 1);
  });
});

// Function to broadcast data to WebSocket clients
const broadcastData = (data) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Kafka consumer
const runKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'your-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = message.value.toString();
      console.log(`Received Kafka message: ${data}`);

      // Save Kafka message to MongoDB
      try {
        await collection.insertOne({ message: data, timestamp: new Date() });
        console.log('Message saved to MongoDB');
      } catch (err) {
        console.error('Error saving to MongoDB:', err);
      }

      // Broadcast data to WebSocket clients
      broadcastData(data);
    }
  });
};

// Connect to MongoDB and start Kafka consumer
const startServer = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    collection = db.collection(collectionName);

    await runKafkaConsumer();
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer().catch(console.error);

// Express app (if needed for serving the frontend)
const express = require('express');
const app = express();
const port = 5000;
app.use(express.static('../client/build'));
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
