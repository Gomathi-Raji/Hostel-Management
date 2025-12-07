import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Tenant from './models/Tenant.js';
import Room from './models/Room.js';
import Payment from './models/Payment.js';
import Ticket from './models/Ticket.js';
import Expense from './models/Expense.js';
import VacatingRequest from './models/VacatingRequest.js';
import ExchangeRequest from './models/ExchangeRequest.js';
import ChatLog from './models/ChatLog.js';
import SMSLog from './models/SMSLog.js';
import Property from './models/Property.js';
import RentPayment from './models/RentPayment.js';

// Load environment variables
dotenv.config();

const clearMockData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hostel-management');
    console.log('Connected to MongoDB');

    // Clear all existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Tenant.deleteMany({});
    await Room.deleteMany({});
    await Payment.deleteMany({});
    await Ticket.deleteMany({});
    await Expense.deleteMany({});
    await VacatingRequest.deleteMany({});
    await ExchangeRequest.deleteMany({});
    await ChatLog.deleteMany({});
    await SMSLog.deleteMany({});
    await Property.deleteMany({});
    await RentPayment.deleteMany({});

    console.log('✅ All mock data cleared successfully!');
    console.log('Collections cleared:');
    console.log('- Users');
    console.log('- Tenants');
    console.log('- Rooms');
    console.log('- Payments');
    console.log('- Tickets');
    console.log('- Expenses');
    console.log('- Vacating Requests');
    console.log('- Exchange Requests');
    console.log('- Chat Logs');
    console.log('- SMS Logs');
    console.log('- Properties');
    console.log('- Rent Payments');

  } catch (error) {
    console.error('Error clearing mock data:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the clear function
clearMockData();