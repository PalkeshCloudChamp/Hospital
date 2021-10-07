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



const PatientModel = require(path.join(__dirname , "../models/patient"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

class PatientDal{
    async getPatient(req,res){
        await SequelizeObj.sync({force : false})
        let users = await PatientModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }

    async addPatient(req,res){
        await SequelizeObj.sync({force : false})
        const data = req.body;
        let result = await PatientModel.create(data);
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async deletePatient(req,res){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            PatientModel.destroy({
                where : {
                    patId : id
                }
            }).then(data=>{
                res.status(200).send({message : `User at ${id} is successfully deleted`, data : data})
            }).catch(err=>{res.status(500).send({message : err})})
        })
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async updatePatient(req,res){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            PatientModel.update({
                "patName": req.body.patName,
                "gender": req.body.gender,
                "patNo": req.body.patNo,
                "patEmail": req.body.patEmail,
                "patDOB": req.body.patDOB,
                "docAssi": req.body.docAssi
            },{where : {patId : id}})
        }).then(data=>{
            res.status(200).send({message : "Staff Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
}

module.exports = PatientDal;