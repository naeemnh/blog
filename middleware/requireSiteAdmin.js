// User is minimum Site Admin

const requireLogin = require("./requireLogin");

module.exports = (req, res, next) => {
	requireLogin(req, res, () => {
		if (req.user.userType !== "SITE ADMIN")
			return res
				.status(401)
				.send({ error: "You do not have access to this page" });
		next();
	});
};
