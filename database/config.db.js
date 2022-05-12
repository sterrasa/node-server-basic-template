// getting-started.js
const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected');
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = { 
    dbConection
}