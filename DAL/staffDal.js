const {Sequelize} = require('sequelize')
const path = require('path')
const jwt =  require('jsonwebtoken')
const {decode}  = require('punycode')
const SequelizeObj = new Sequelize(
    'palkeshassignment' , 'root' , 'Blaze@12345',{
        host : 'localhost',
        dialect : 'mysql',
        pool :  { 
            min : 0,
            max : 1,
            idle : 100
        }
        ,
        define : {
            timestamps : false
        }
    }
)



const StaffModel = require(path.join(__dirname , "./../models/staff"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

const jwtSecret = {
    jwtKey : "blazeclannalcezalb"
}


class staffDal{
    async getStaff(req,res){
        const token = req.headers.authorization;
        console.log(token);
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
                await SequelizeObj.sync({force : false})
                let users = await StaffModel.findAll();
                if(users){return res.status(200).send({value : users})}
                return res.status(401).send({message: "Nothing"})
            }
            res.status(500).send({message : "User Not Authorized to Perform this action."})
        })
        // await SequelizeObj.sync({force : false})
        // let users = await StaffModel.findAll();
        // if(users)
        // {return res.status(200).send({value : users});}
        // return res.status(500).send({message: "Some internal error"})
    }

    async addStaff(req,res){
        const token = req.headers.authorization;
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
                await SequelizeObj.sync({force : false})
                const data = req.body;
                let result = await StaffModel.create(data);
                if(result)
                {return res.status(200).send({value : result , message : "User added Successfully"});}
                return res.status(500).send({message: "Some internal error"})
            }
            return res.status(402).send({message: "User Not Authorized."})
        })
        // await SequelizeObj.sync({force : false})
        // const data = req.body;
        // let result = await StaffModel.create(data);
        // if(result)
        // {return res.status(200).send({value : result , message : "User added Successfully"});}
        // return res.status(500).send({message: "Some internal error"})
    }

    async deleteStaffMem(req,res){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            StaffModel.destroy({
                where : {
                    staffId : id
                }
            }).then(data=>{
                res.status(200).send({message : `User at ${id} is successfully deleted`, data : data})
            }).catch(err=>{res.status(500).send({message : err})})
        })
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async updateStaffMem(req,res){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            StaffModel.update({
                "stPName": req.body.stPName,
                "stPDesi": req.body.stPDesi,
                "gender": req.body.gender,
                "stPNo": req.body.stPNo,
                "stPEmail": req.body.stPEmail,
                "stPDOB": req.body.stPDOB,
                "stPAdd": req.body.stPAdd,
                "stPSal": req.body.stPSal,
                "stPass" : req.body.stPass
            },{where : {staffId : id}})
        }).then(data=>{
            res.status(200).send({message : "Staff Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }


    async userType(req,res){
        const authValue = req.body;
        await SequelizeObj.sync({force : false})
        let users = await StaffModel.findOne({where : {
            "stPEmail" : authValue.email,
            'stPass' : authValue.password
        }});
        console.log(users['stPDesi']);
        if(users)
        {
            let authVal = {...users, stPass : ""};
            console.log("Auth Value:-",(users));
            // let stPDesi = users['stPDesi']
            const token = jwt.sign({ authVal } , jwtSecret.jwtKey , {
                expiresIn : 3600
            });
            return res.status(200).send({value : users,token : token, Desi : users['stPDesi']});
        }
        return res.status(500).send({message: "No such user found"})
    }

    async getUserDetailByEmail(req,res){
        const stPEmail = req.body.email;
        const token = req.headers.authorization;
        console.log("Token Value:- ",token);
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            console.log("Decode Value:- ",decode);
            if(error) {return res.status(401).send({response : "Token Not Verified."})}
            req.decode = decode
            // console.log(decode);
            console.log("Decode authValue:- ",decode.authVal.dataValues.stPEmail)
            let desi = decode.authVal.dataValues.stPDesi
            if(desi == "Admin"){
            await SequelizeObj.sync({force : false})
            let users = await StaffModel.findOne({where : {stPEmail : stPEmail }});
            if(users)
            {
                console.log(users);
                return res.status(200).send({value : users});
            }
            return res.status(401).send({message: "User with the required email donot exist"})
        }
            return res.status(500).send({message: "User Not Authorized to see information."})
        })
    }
}

module.exports = staffDal;