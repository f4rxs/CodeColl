const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');


const sequelize = new Sequelize(process.env.PG_URI, {
    dialect: 'postgres',
    logging: false  
});


const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = { sequelize, connectMongoDB };
