const dotenv = require('dotenv')
const amqp = require('amqplib')
const router = require('./src/router')
const gatewayConfig = require('./src/core/gatewayConfig')
const { getAuthRules } = require('./src/core')

dotenv.config()

const RABBIT_URL = process.env.RABBIT_URL
const GATEWAY_QUEUE = process.env.GATEWAY_QUEUE

const config = {}

const initialize = async () => {
    config.authRules = await getAuthRules()
}

initialize()

class App {
    constructor (config) {
        this.config = config
        this.entity = this
    }
    static async reloadRules () {
        const authRules = await getAuthRules()
        this.config = { authRules }
    }
    async run () {
        try {
            const connection = await amqp.connect(RABBIT_URL)
            const channel = await connection.createChannel()
            await channel.assertQueue(GATEWAY_QUEUE, gatewayConfig)
            await channel.consume(GATEWAY_QUEUE, (message) => {
                const content = JSON.parse(message.content) 
                const request = {
                    fields: message.fields,
                    properties: message.properties
                }
                router(content, { request, channel, config: this.config, reload: App.reloadRules.bind(this.entity)})
            })
            //await channel.close()
        } catch (error) {
          console.error(error)
        }
      }
}

const app = new App(config)

app.run()