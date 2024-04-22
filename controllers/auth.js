const User = require("../models/user");
const { createJWTToken } = require("../utils/jwt");

const {
  badResponse,
  goodResponse,
  goodResponseDoc,
} = require("../utils/response");

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirm_password } =
      req.body;
    if (!first_name) badResponse(res, "first_name is required");
    if (!last_name) badResponse(res, "last_name is required");
    if (!email) badResponse(res, "email is required");
    if (!password) {
      return badResponse(res, "Password is required");
    } else if (password.length < 8) {
      return badResponse(res, "Password should be at least 8 characters long");
    }
    if (!confirm_password) {
      return badResponse(res, "confirm password");
    } else if (password !== confirm_password) {
      return badResponse(res, "Passwords dont match");
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    });

    const token = createJWTToken(user._id);
    req.user = user;

    return goodResponseDoc(res, "User created successfully", 201, { user, token });
  } catch (error) {
    if (error.code === 11000) {
      return badResponse(res, "This email has been used");
    }
    return badResponse(res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return badResponse(res, "Provide Email");
    if (!password) return badResponse(res, "Provide Password");

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return badResponse(res, "Incorrect credentials");
    }
    const token = createJWTToken(user._id);
    req.user = user;

    goodResponseDoc(res, "User created successfully", 201, { user, token });
  } catch (error) {
    console.log(error);
    badResponse(res, "Something went wrong");
  }
};

exports.logout = async (req, res) => {
    try{
        req.user = undefined;
        goodResponse(res, "Logged out successfully")
    } catch(error){
        badResponse('Something went wrong')
    }
}