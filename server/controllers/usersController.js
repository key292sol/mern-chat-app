const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		const isUsernameTaken = await User.findOne({ username: username });
		if (isUsernameTaken) {
			return res.json({ msg: 'Username is already taken', status: false });
		}

		const isEmailTaken = await User.findOne({ username: username });
		if (isEmailTaken) {
			return res.json({ msg: 'Email is already used', status: false });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		delete user.password;
		return res.json({ user, status: true });
	} catch (e) {
		next(e);
	}
};

module.exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username: username });
		if (!user) {
			return res.json({ msg: 'Incorrect username or password', status: false });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.json({ msg: 'Incorrect username or password', status: false });
		}

		delete user.password;
		return res.json({ user, status: true });
	} catch (e) {
		next(e);
	}
};

module.exports.setAvatar = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const image = req.body.image;

		// const userData = await User.findByIdAndUpdate(userId,  {
		// 	isAvatarSet: true,
		// 	avatar: image
		// })

		const user = await User.findById(userId);
		user.isAvatarSet = true;
		user.avatar = image;
		user.save();
		return res.json({ isSet: user.isAvatarSet, image: user.avatar });
	} catch (error) {
		next(error);
	}
};

module.exports.getAllUsers = async (req, res, next) => {
	try {
		const userId = req.params.id;

		const allUsers = await User.find({ _id: { $ne: userId } }).select([
			'email',
			'username',
			'avatar',
			'_id',
		]);

		return res.json(allUsers);
	} catch (error) {
		next(error);
	}
};
