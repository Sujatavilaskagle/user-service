const { Kafka } = require('kafkajs');
require('dotenv').config();
const { setUserId } = require('../state/userContext');


const kafka = new Kafka({
  clientId: 'user-service-consumer',
  brokers: [process.env.KAFKA_BROKER] // e.g., 192.168.1.38:9092
});

const consumer = kafka.consumer({ groupId: 'user-service-group' });

const startConsumer = async () => {
  const topics = ['user.registered', 'user.loggedin'];

  try {
    console.log('🟡 Connecting to Kafka broker...');
    await consumer.connect();
    console.log('✅ Connected to Kafka broker');

    for (const topic of topics) {
      await consumer.subscribe({ topic, fromBeginning: true });
      console.log(`📩 Subscribed to Kafka topic: '${topic}'`);
    }

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const payload = JSON.parse(message.value.toString());

        if (topic === 'user.loggedin') {
  console.log(' [LOGIN] Received:', payload);
  if (payload.userId) {
    setUserId(payload.userId);
    console.log('🔐 Logged-in User ID stored:', payload.userId);
  }
}
else if (topic === 'user.loggedin') {
          console.log('✅ [LOGIN] Received:', payload);
          // Handle login logic here
        } else {
          console.warn(`⚠️ Unknown topic received: ${topic}`);
        }
      }
    });

    console.log('🚀 Kafka consumer is running and listening for events...');
  } catch (err) {
    console.error('❌ Kafka consumer error:', err);
  }
};

module.exports = startConsumer;