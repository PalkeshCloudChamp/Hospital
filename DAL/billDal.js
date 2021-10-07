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



const BillModel = require(path.join(__dirname , "../models/bill"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

class BillDal{
    async getBill(req,res){
        await SequelizeObj.sync({force : false})
        let users = await BillModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }

    async addBill(req,res){
        await SequelizeObj.sync({force : false})
        const data = req.body;
        let result = await BillModel.create(data);
        if(result)
        {return res.status(200).send({value : result , message : "Bill added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async deleteBill(req,res){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            BillModel.destroy({
                where : {
                    billNo : id
                }
            }).then(data=>{
                res.status(200).send({message : `User at ${id} is successfully deleted`, data : data})
            }).catch(err=>{res.status(500).send({message : err})})
        })
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async updateBill(req,res){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            BillModel.update({
                "patientId" : req.body.patientId, 
                "patientType" : req.body.patientType,
                "docId"  : req.body.docId,
                "docCharge" : req.body.docCharge,
                "roomNo" : req.body.roomNo,
                "canteenCharge" : req.body.canteenCharge,
                "medAmo" : req.body.medAmo,
                "labCharge" : req.body.labCharge,
                "totalAmount" : req.body.totalAmount
            },{where : {billNo : id}})
        }).then(data=>{
            res.status(200).send({message : "Bill Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
}

module.exports = BillDal;