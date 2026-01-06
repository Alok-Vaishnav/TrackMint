const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses MONGO_URI from environment variables
 */
const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📍 URI:', process.env.MONGO_URI.split('@')[0] + '@***');
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('⚠️  Make sure:');
    console.log('   1. IP address is whitelisted in MongoDB Atlas');
    console.log('   2. Username and password are correct');
    console.log('   3. Network connection is stable');
    console.log('   4. Retrying connection in 5 seconds...');
    setTimeout(() => connectDB(), 5000);
  }
};

module.exports = connectDB;
