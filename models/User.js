const mongoose = require("mongoose");
const { Schema } = mongoose;

const Status = Object.freeze({
	SITE_ADMIN: "SITE ADMIN",
	CONTENT_ADMIN: "CONTENT ADMIN",
	USER: "USER",
});

const userSchema = new Schema({
	userId: String,
	username: String,
	password: String,
	userType: {
		type: String,
		enum: Status,
		default: Status.USER,
	},
});

module.exports = mongoose.model("users", userSchema);
