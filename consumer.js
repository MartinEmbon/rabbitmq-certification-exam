const amqp = require("amqplib")
require('dotenv').config()

async function connect(){
    try{
        const amqpServer = process.env.amqpServerConfig
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("exam");

    
        channel.consume("exam",message =>{
            const input = JSON.parse(message.content.toString())
            if(input){
                channel.ack(message);
            }
        })

        console.log("Waiting for messages...")

    }catch(err){
        console.log(err)
    }
    
}

connect()

