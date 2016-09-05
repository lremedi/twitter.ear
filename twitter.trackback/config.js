var config = {
	twitter: {
	 consumer_key: 'ka56QbpDVuzH33yx1woLvTyrF',
	 consumer_secret: 'ktN4wPtgKKZlqLXxzjiNN9m8S8kDXg7jdmi2wNAHejibp2y1BQ',
     access_token_key:"91419237-oxkp1tEraKDVC7PX92KbChqKioojoVpXjmZFnFQU9",
     access_token_secret:"HcxcOk3O7SltFNDodusxYglekwgp0nGkSp3xdE6MWW6cn",
     stream_endpoint:'statuses/filter'
	},
    queue:{
        url:'amqp://%s:%s@127.0.0.1/tweets',
        user:'hackweek',
        password:'admin'
    },
    db:{
        url:'127.0.0.1',
        database:'trackback',
        patterns:'patterns',
        configs:'configs',
				tweets:'tweets',
        username:'hackweek',
        password:'admin',
				port:'27017'
    }
}

module.exports = config
