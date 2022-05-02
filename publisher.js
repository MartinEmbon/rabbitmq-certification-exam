const amqp = require("amqplib")
//advanced message queue protocol
let limit = 0;

while(limit<=100){

    const msg = {number:limit}

    async function connect(){
        try{
            const amqpServer = "amqps://aawzdcjj:JVv0lelCpZGWMjWFS6h9_vENYx4CC2L6@jackal.rmq.cloudamqp.com/aawzdcjj"
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
