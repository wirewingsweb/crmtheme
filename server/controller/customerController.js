
const Customer = require("../model/customer");
const User = require("../model/User");

const createNewCustomer = async (req, res) => {
    try {
        const { name, phone, salesAgent, project, comment } = req.body;
        console.log( phone, salesAgent, project, comment)
        // console.log(req.body.email)
        const user = await User.findOne({ name: salesAgent });
        console.log(user.name);
        const userName = user?.name;

        // const alredyPhone = Customer.find({phone:phone});
        // console.log(alredyPhone)
        // if(alredyPhone){
        //     res.send(`this phone no ${phone} is alredy availiable`)
        // }else{}
        if (!userName) {
            // alert("Agetn Not found !")
            return res.status(400).send("User Not Found !");
        }
        const createdCustomer = await Customer.create({
            name,
            phone,
            salesAgent,
            project,
            comment,
        });
        res.send(createdCustomer);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createNewCustomer
}