const amqp = require("amqplib")
require('dotenv').config()

//docker run --name rabbitmq -p 5672:5672 rabbitmq 
//advanced message queue protocol
let limit = 0;

while(limit<=100){

    const msg = {number:limit}

    async function connect(){
        try{
            const amqpServer = process.env.amqpServerConfig
            const connection = await amqp.connect(amqpServer);
            // create connection with the amqp in the RabbitMQ port: 5672
           // const connection = await amqp.connect("amqp://localhost:5672");
            // create a channel for the connection
            const channel = await connection.createChannel();
            // publish to a queue (to an exchange).  
            //assertQueue will make sure the queue exists, otherwise will create one
            await channel.assertQueue("jobs");
            //send the result to the jobs queue
            channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)))
            console.log(`Job sent successfully ${msg.number}`)
            //close chanel and connection
            await channel.close();
            await connection.close();
    
        }catch(err){
            console.error(err)
        }
    }
    
    
    limit++
    connect()
}
