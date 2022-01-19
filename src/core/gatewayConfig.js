const gatewayConfig = {
    durable: false, 
    arguments: {
        "x-message-ttl" : 10000
    }
}

module.exports = gatewayConfig