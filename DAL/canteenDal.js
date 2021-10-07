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



const CanteenModel = require(path.join(__dirname , "../models/canteen"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

class CanteenDal{
    async getItem(req,res){
        await SequelizeObj.sync({force : false})
        let users = await CanteenModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }

    async addItem(req,res){
        await SequelizeObj.sync({force : false})
        const data = req.body;
        let result = await CanteenModel.create(data);
        if(result)
        {return res.status(200).send({value : result , message : "Canteen added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async deleteItem(req,res){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            CanteenModel.destroy({
                where : {
                    prodId : id
                }
            }).then(data=>{
                res.status(200).send({message : `User at ${id} is successfully deleted`, data : data})
            }).catch(err=>{res.status(500).send({message : err})})
        })
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async updateItem(req,res){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            CanteenModel.update({
                "prodType" : req.body.prodType, 
                "prodName" : req.body.prodName,
                "prodPrice"  : req.body.prodPrice
            },{where : {prodId : id}})
        }).then(data=>{
            res.status(200).send({message : "Canteen Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
}

module.exports = CanteenDal;