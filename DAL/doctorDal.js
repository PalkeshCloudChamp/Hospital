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



const StaffModel = require(path.join(__dirname , "./../models/doctor"))(
    SequelizeObj , 
    Sequelize.DataTypes
)
const jwtSecret = {
    jwtKey : "blazeclannalcezalb"
}
class DoctorDal{
    async getDoctor(req,res){
        const token = req.headers.authorization;
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin" || desi == "Nurse"){
        await SequelizeObj.sync({force : false})
        let users = await StaffModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }
        res.status(500).send({message : "User Not Authorized to Perform this action."})
        })
    }

    async addDoctor(req,res){
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
    res.status(500).send({message : "User Not Authorized to Perform this action."})
})
    }

    async deleteDoctor(req,res){
        const token = req.headers.authorization;
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            StaffModel.destroy({
                where : {
                    docId : id
                }
            }).then(data=>{
                res.status(200).send({message : `User at ${id} is successfully deleted`, data : data})
            }).catch(err=>{res.status(500).send({message : err})})
        })
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }
    res.status(500).send({message : "User Not Authorized to Perform this action."})
})
    }

    async updateDoctor(req,res){
        const token = req.headers.authorization;
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            StaffModel.update({
                "docName": req.body.docName,
                "gender": req.body.gender,
                "docNo": req.body.docNo,
                "docEmail": req.body.docEmail,
                "docDOB": req.body.docDOB,
            },{where : {docId : id}})
        }).then(data=>{
            res.status(200).send({message : "Staff Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
    res.status(500).send({message : "User Not Authorized to Perform this action."})
})
    }
}

module.exports = DoctorDal;