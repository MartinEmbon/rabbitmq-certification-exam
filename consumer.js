const amqp = require("amqplib")
require('dotenv').config()

async function connect(){
    try{
        const amqpServer = process.env.amqpServerConfig
        const connection = await amqp.connect(amqpServer);
        //const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");

        //get messages, consuming de jobs queue
        channel.consume("jobs",message =>{
            const input = JSON.parse(message.content.toString())
            console.log(`Received from ${input.number}`)
            if(input.number<=100){
                channel.ack(message);
            }
        })

        console.log("Waiting for messages...")

    }catch(err){
        console.error(err)
    }
}

connect()