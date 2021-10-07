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



const WardboyModel = require(path.join(__dirname , "../models/wardboy"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

class WardboyDal{
    async getWardboy(req,res){
        await SequelizeObj.sync({force : false})
        let users = await WardboyModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }

    async addWardboy(req,res){
        await SequelizeObj.sync({force : false})
        const data = req.body;
        let result = await WardboyModel.create(data);
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async deleteWardboy(req,res){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            WardboyModel.destroy({
                where : {
                    wbId : id
                }
            }).then(data=>{
                res.status(200).send({message : `User at ${id} is successfully deleted`, data : data})
            }).catch(err=>{res.status(500).send({message : err})})
        })
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async updateWardboy(req,res){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            WardboyModel.update({
                "wbName": req.body.wbName,
                "gender": req.body.gender,
                "wbNo": req.body.wbNo,
                "wbEmail": req.body.wbEmail,
                "wardAssi" : req.body.wardAssi, 
                "wbDOB": req.body.wbDOB,
                "salary": req.body.salary
            },{where : {wbId : id}})
        }).then(data=>{
            res.status(200).send({message : "Wardboy Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
}

module.exports = WardboyDal;