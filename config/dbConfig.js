const MONGOHOST = 'containers-us-west-93.railway.app', 
MONGOPASSWORD = 'hSvR5WSKO66MbucGDegN',
MONGOPORT = 6760,
MONGOUSER = 'mongo',
MONGO_URL = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`

module.exports = MONGO_URL;