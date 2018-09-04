var config = {
	twitter: {
	 consumer_key: 'ka56QbpDVuzH33yx1woLvTyrF',
	 consumer_secret: 'ktN4wPtgKKZlqLXxzjiNN9m8S8kDXg7jdmi2wNAHejibp2y1BQ',
     access_token_key:"91419237-oxkp1tEraKDVC7PX92KbChqKioojoVpXjmZFnFQU9",
     access_token_secret:"HcxcOk3O7SltFNDodusxYglekwgp0nGkSp3xdE6MWW6cn",
     stream_endpoint:'statuses/filter'
	},
    queue:{
        url:'amqp://%s:%s@tiger.cloudamqp.com/jtyqdtfy',
        user:'jtyqdtfy',
        password:'s4BSn9zheih9n5WEQHpPOD13te6JSQS9'
    },
    db:{
        url:'ds141932.mlab.com',
        database:'trackback',
        patterns:'patterns',
        configs:'configs',
				tweets:'tweets',
        username:'hackaton1',
        password:'hackaton1',
				port:'41932'
    }
}

module.exports = config
