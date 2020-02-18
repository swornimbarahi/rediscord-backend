const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");

const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// check if user is in database
	const emailExists = await User.findOne({ email: req.body.email });
	if (emailExists) return res.status(400).send("Email already exists.");

	// hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword
	});
	try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
		res.send({
			user: user._id,
			token,
			username: user.username,
			email: user.email
		});
	} catch (err) {
		res.status(400);
	}
});

router.post("/login", async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid email or password.");

	const validPass = await bcrypt.compare(req.body.password, user.password);

	if (!validPass) return res.status(400).send("Email or password is invalid.");

	// create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header("auth-token", token).send({
		token,
		_id: user._id,
		username: user.username,
		email: user.email
	});
});

module.exports = router;
