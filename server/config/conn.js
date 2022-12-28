const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const dbcon = async () => {
    try {
        console.log(process.env.URL)
        // mongoose.set('strictQuery', false);
        const connected = await mongoose.connect(process.env.URL,
            { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("mongodb connected")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { dbcon }