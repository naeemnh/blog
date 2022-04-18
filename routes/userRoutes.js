const requireSiteAdmin = require("../middleware/requireSiteAdmin");

const router = require("express").Router();
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require("../controllers/user");

// Get all Users
router.get("/", getUsers);

// Get User
router.get("/:id", getUser);

// Create User
router.post("/", createUser);

// Update User details
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", requireSiteAdmin, deleteUser);

module.exports = router;
