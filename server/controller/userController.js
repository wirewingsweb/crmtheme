const User = require('../model/User');
const bcrypt = require("bcrypt");
const Role_List = require("../config/Role_LIst");
const createNewUser = async (req, res) => {
  try {
    // console.log(req.body)
    const {name, email,phone, parentId, roles, password } = req.body;
    const roleId = Role_List[roles];
    console.log(roleId, roles);
    
    if ((!name, !email, !phone, !password, !roles)) {
      return res.status(400).send("All fields are mandatory !");
    }

    
    const duplicate = await User.findOne({ name, phone, email });
    if (duplicate) return res.status(409).json({ message: "Duplicate User" });
    
    // const totalUser = await User.find({ roles: "SalesPerson" });
    //authorization
    let jwt=req?.headers?.cookie ;
    jwt = jwt.split("=")[1]
    console.log(req?.Cookies)
    console.log(req?.headers?.cookie , jwt)
    const foundUser = await User.findOne({refreshToken:jwt||req?.Cookies})
    console.log(foundUser)
    const reqId= foundUser.roles
    console.log(reqId)
    if (reqId != 100){
      return console.log("user Not allowed for this request")
    }
    // console.log(totalUser.length);
    // const startNum = 9999 + totalUser.length + 1;
    // const nickName = name.slice(0, 4) + startNum;
    // console.log(nickName);

    const hashedPwd = await bcrypt.hash(password, 10);
    console.log(typeof(email),password,typeof(hashedPwd))

    if (roleId == 400 || roleId == 1000) {
      const dispositionCount = {
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
      };
      const userCreated = await User.create({
        name,
        email,
        phone,
        parentId,
        roles:roleId, 
        dispositionCount,
        password: hashedPwd,
      });
      console.log(userCreated)
      res.send(userCreated);
    } else {
      const userCreated = await User.create({
        name,
        email,
        phone,
        parentId,
        roles:roleId, 
        password: hashedPwd,
      });
      console.log(userCreated +"created")
      res.send(userCreated);
    }
    
  } catch (error) {
    console.log(error.message)
  }
};



module.exports = { createNewUser }