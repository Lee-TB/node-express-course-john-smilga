// check username, password in port(login) request
// if exist create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dashboard
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // use username and password to get user info from DB
  const id = new Date().getDate(); // this just for demo
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET);

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
