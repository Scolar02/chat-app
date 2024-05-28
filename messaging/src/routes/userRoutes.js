const userRoutes = require('express').Router();
const { registerMember, loginUser, getDets} = require('../cont/userController');


userRoutes.post('/register', registerMember);
userRoutes.post('/login', loginUser);

userRoutes.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "Member logged out successfully" });
});

userRoutes.post('/getDets', getDets);

userRoutes.get('/getCurrentUser', (req, res) => {
  const userId = req.session.member_id;
  res.json({ userId });
});

module.exports = userRoutes;