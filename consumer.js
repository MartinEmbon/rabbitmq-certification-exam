const amqp = require("amqplib")

async function connect(){
    try{
        const amqpServer = "amqps://aawzdcjj:JVv0lelCpZGWMjWFS6h9_vENYx4CC2L6@jackal.rmq.cloudamqp.com/aawzdcjj"
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