const User = require("../model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { compare } = require("bcrypt");
const verify = require('../middleware/verifyJwt')
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password))
      return res.status(401).json({ message: "all field are mandatory" });

    const userLogin = await User.findOne({ email });
    const userAuth = await compare(password, userLogin.password);
    if (!userAuth) {
      return res.status(400).json({ message: "user Password wrong" });
    }
    const userDetailForFront = {
      name: userLogin.name,
      id: userLogin._id,
      email: userLogin.email,
      phone: userLogin.phone,
      parentId: userLogin.parentId,
      userId: userLogin.userId,
      roles: userLogin.roles
    };
    console.log(userDetailForFront);
    // console.log(process.env.SECRET_KEY)
    // console.log(userLogin)
    if (userLogin) {
      console.log(userLogin);
      const accessToken = jwt.sign(
        {
          userInfo: {
            name: userLogin.name,
            roles: userLogin.roles
          },
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "10m",
        }
      );
      const refreshToken = jwt.sign(
        {
          userInfo: {
            name: userLogin.name,
          },
        },
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
      userLogin.refreshToken = refreshToken;
      const result = await userLogin.save();

      // console.log(result);
      res.cookie("userjwt", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({ accessToken, userDetailForFront });
    }
  } catch (error) {
    res.send(error.message);
  }
};


module.exports = {login}