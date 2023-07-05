const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const existUsername = await User.findOne({ username: req.body.username });
    if (existUsername) {
      res.status(500).json({ message: "Username is already taken" });
    } else {
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json("All fields are mandatory!");
  }
  const user = await User.findOne({ username: username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } else {
    return res.status(400).json("Wrong credentials!");
  }
});
/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateAuthRegister'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAuthRegisterResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateAuthLogin'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAuthLoginResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 */

module.exports = router;
