const express = require('express');
const passport = require('passport')
const UserController = require('../controller/user_controller')
const userRouter = express.Router();



userRouter.post('/signup', passport.authenticate('signup', { session: false }), UserController.signUp)

userRouter.post("/login", async (req, res, next) =>
  passport.authenticate("login", (err, user, info) => {
    UserController.login(req, res, { err, user, info });
  })(req, res, next)
);


module.exports = userRouter;