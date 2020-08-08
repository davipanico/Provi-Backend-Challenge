async function isAuth (request, response, url) {
    const token = request.header('Token');
    const user = await User.findOne({ token });
    if (!user) {
		response.status(401).json({ message: 'Unauthorized Acess, you need a token'});
		return false;
	}
};

module.exports = isAuth