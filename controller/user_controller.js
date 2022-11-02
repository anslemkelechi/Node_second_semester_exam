const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const User = require("../models/user_schema");

exports.signUp = async (req, res) => {
  //  const {firstname, lastname, email, password} = req.body;
  // console.log(email)
  // if(!firstname && lastname && email && password ){
  //     res.status(400).send("Input all values")
  // }
  // try{
  //     const newUser = await UserSchema.create({
  //       firstname,
  //       lastname,
  //       email: email.toLowerCase(),
  //       password,
  //       timestamps: moment().toDate(),
  //     });
  //     console.log(newUser);
  //     return res.status(201).json({ message: "signUp succesfully", newUser });
  // }catch(err){
  //   console.log(err)
  //     return err
  // }
  const user = await User.findOne({ username: req.user.username });

  user.firstname = req.body.firstName;
  user.lastname = req.body.lastName;

  await user.save();

  delete user.password;
  res.status(201).json({
    message: "signUp succesfully",
    user: user,
  });
};

exports.login = (req, res, { err, user, info }) => {
  if (!user) {
    return res.json({ message: "Email or password is incorrect" });
  }

  // req.login is provided by passport
  req.login(user, { session: false }, async (error) => {
    if (error) return res.status(400).json(error);

    const body = { _id: user._id, email: user.email };
    //You store the id and username in the payload of the JWT.
    // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
    // DO NOT STORE PASSWORDS IN THE JWT!
    const token = jwt.sign(
      { user: body },
      process.env.JWT_SECRET || "something_secret"
    );

    return res.status(200).json({ token });
  });
};
// exports.login = (req, res, next) => {
//   console.log("I loggedIn");
//   return res.status(200).json({ message: "I loged in" });
//   try {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       const error = new Error("Username or password is incorrect");
//       return next(error);
//     }

//     req.login(user, { session: false }, async (error) => {
//       if (error) return next(error);

//       const body = { _id: user._id, email: user.email };
//       //You store the id and email in the payload of the JWT.
//       // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
//       // DO NOT STORE PASSWORDS IN THE JWT!
//       const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

//       return res.json({ token });
//     });
//   } catch (error) {
//     return next(error);
//   }
// };
