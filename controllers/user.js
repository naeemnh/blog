const User = require("../models/User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

// Get all Users
exports.getUsers = async (req, res) => {
	const users = await User.find();
	res.send({ users });
};

// Get User
exports.getUser = async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		req.flash("error", "Cannot find that user!");
		return res.redirect("/users");
	}
	res.json({ user });
};

// Create User
exports.createUser = (req, res) => {
	User.findOne({ username: req.body.username }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send("User Already Exists");
		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			const id = "HH" + Date.now();
			const newUser = new User({
				userId: id,
				username: req.body.username,
				password: hashedPassword,
				userType: req.body.userType,
			});
			try {
				await newUser.save();
				console.log("User Created");
				res.status(200).send("User Created");
			} catch (err) {
				res.status(400).json({ message: err.message });
			}
		}
	});
};

// Update User details
exports.updateUser = async (req, res) => {
	const { id } = req.params;
	console.log(req.body);
	const user = await User.findByIdAndUpdate(id, { ...req.body.user });
	user.push();
	await user.save();

	res.send({ user });
};

// Delete User
exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	const deletedUser = await User.findByIdAndDelete(id);
	res.json({ deletedUser });
};
