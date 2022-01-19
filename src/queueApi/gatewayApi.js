const gatewayApi =  {
    async sendResponseMessage (params, args) {
        try {
            const message = args ? {
                status: 200,
                args
            } : {
                status: 200
            }
            await params.channel.sendToQueue(params.request.properties.replyTo, Buffer.from(JSON.stringify(message)),  {
                correlationId: params.request.properties.correlationId
            })
            // await params.channel.close()
            // await connection.close()
            // return await params.channel.ack({
            //     correlationId: params.request.properties.correlationId
            // })
        } catch (err) {
            console.log(err)
        }
    },
    async sendResponseError (params, error) {
        try {
            return await params.channel.sendToQueue(params.request.properties.replyTo, Buffer.from(JSON.stringify({
                status: error.status,
                message: error.message
            })),  {
                correlationId: params.request.properties.correlationId
            })
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = gatewayApi