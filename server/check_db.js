require('dotenv').config();
const mongoose = require('mongoose');

async function check() {
    try {
        console.log('Connecting to:', process.env.MONGO_URI || 'mongodb://localhost:27017/ffbn');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ffbn');
        console.log('Connection state:', mongoose.connection.readyState);
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        
        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(`- ${col.name}: ${count} documents`);
        }
        
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

check();
