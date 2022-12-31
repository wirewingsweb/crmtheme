const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyJwt = async ( req,res,next)=>{
    try {
        const authorization = req.headers.authorization || req.headers.Authorization || req?.headers?.cookie;
        // console.log(res.headers.Set-Cookie)
        console.log(req?.headers?.cookie)
        if (!authorization){
            return res.json({message:"Request is Unathorized"})
        }
        const accessToken = authorization.split("=")[1]  || authorization.split(" ")[1]
        console.log(accessToken)
        jwt.verify(
            accessToken,
            process.env.SECRET_KEY,
            (err, decoded)=>{
                console.log(err?.message)
                if (err) return res.status(403).json(err)
                req.name = decoded.userInfo.name;
                req.roles = decoded.userInfo.roles
                console.log(req.name,decoded.userInfo.name, decoded.userInfo.roles);
                next()
            }
        )

    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {verifyJwt};