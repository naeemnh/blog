const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

exports.login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) res.send("No User Exists");
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.send("Successfully Authenticated");
				console.log(req.user);
			});
		}
	})(req, res, next);
};

exports.register = (req, res) => {
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
				userType: "USER",
			});
			await newUser.save();
			res.send("User Created");
		}
	});
};

exports.logout = (req, res) => {
	req.logout();
	res.redirect("/");
};
