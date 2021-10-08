const {Sequelize} = require('sequelize')
const path = require('path')

const jwt =  require('jsonwebtoken')
const {decode}  = require('punycode')
const jwtSecret = {
    jwtKey : "blazeclannalcezalb"
}
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



const NurseModel = require(path.join(__dirname , "../models/nurse"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

class NurseDal{
    async getNurse(req,res){
        const token = req.headers.authorization;
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin" || desi == "Doctor"){
        await SequelizeObj.sync({force : false})
        let users = await NurseModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }
    res.status(500).send({message : "User Not Authorized to Perform this action."})
})
}

    async addNurse(req,res){
        const token = req.headers.authorization;
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
        await SequelizeObj.sync({force : false})
        const data = req.body;
        let result = await NurseModel.create(data);
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }
    res.status(500).send({message : "User Not Authorized to Perform this action."})
})
}

    async deleteNurse(req,res){
        const token = req.headers.authorization;
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            NurseModel.destroy({
                where : {
                    nrsId : id
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

    async updateNurse(req,res){
        const token = req.headers.authorization;
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            NurseModel.update({
                "nrsName": req.body.nrsName,
                "gender": req.body.gender,
                "nrsNo": req.body.nrsNo,
                "nrsEmail": req.body.nrsEmail,
                "wardAssi" : req.body.wardAssi, 
                "nrsDOB": req.body.nrsDOB,
                "salary": req.body.salary
            },{where : {nrsId : id}})
        }).then(data=>{
            res.status(200).send({message : "Nurse Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
    res.status(500).send({message : "User Not Authorized to Perform this action."})
})
}
}

module.exports = NurseDal;