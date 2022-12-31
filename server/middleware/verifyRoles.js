const verifyRoles = (...allowedRoles)=>{
    return (req, res, next )=>{
        console.log(`inside verifyRoles ${allowedRoles}`)
        console.log(req.roles)
        if (!req?.roles) return res.status(401)
        const rolesArray = [...allowedRoles];
        console.log(rolesArray)
        const roles = [req.roles]
        console.log([req.roles])
        const result = roles.map(role => rolesArray.includes(role)).find(val => val === true);
        console.log(result )
        if (!result) return res.status(401);
        next()
    }
}
module.exports = {verifyRoles};