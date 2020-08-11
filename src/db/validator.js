const User = require('./schemas/User')

async function validator (request, response, url, document) {
    const index  = document
    const user = await User.findOne({ index });
    if (user) {
		response.status(401).json({ message: 'Data already registered'});
		return false;
	}
};

module.exports = validator;