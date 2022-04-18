const express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	cookieParser = require("cookie-parser"),
	session = require("express-session"),
	passport = require("passport"),
	keys = require("./config/keys"),
	bodyParser = require("body-parser");

mongoose.connect(
	keys.localMongoURI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("Mongoose Is Connected");
	}
);
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		secret: "secretcode",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./services/passport")(passport);

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
