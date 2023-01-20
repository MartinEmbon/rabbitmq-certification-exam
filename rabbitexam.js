const amqp = require('amqplib');

let msg = 'Hi CloudAMQP, this was fun!'
let queue = 'exam'
let exchange = 'exchange.af604b96-79fe-4483-99f1-375f6aa4f99e'
let routingKey = 'af604b96-79fe-4483-99f1-375f6aa4f99e'

async function course() {
    const conn = await amqp.connect('amqps://student:XYR4yqc.cxh4zug6vje@rabbitmq-exam.rmq3.cloudamqp.com/mxifnklj');
    
    const channel = await conn.createChannel();

    await channel.assertExchange(exchange, 'direct', { persistent: true });

    await channel.assertQueue(queue, { durable: true });

    await channel.bindQueue(queue, exchange, routingKey);

    await channel.publish(exchange, routingKey, Buffer.from(msg),{ persistent: true });

    await channel.unbindQueue(queue, exchange, routingKey);

    console.log(`Job sent successfully: ${msg}`)
    
    await conn.close();
}

course();

