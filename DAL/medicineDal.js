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



const MedicineModel = require(path.join(__dirname , "../models/medicine"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

class MedicineDal{
    async getMedicine(req,res){
        await SequelizeObj.sync({force : false})
        let users = await MedicineModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }

    async addMedicine(req,res){
        await SequelizeObj.sync({force : false})
        const data = req.body;
        let result = await MedicineModel.create(data);
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async deleteMedicine(req,res){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            MedicineModel.destroy({
                where : {
                    medicineId : id
                }
            }).then(data=>{
                res.status(200).send({message : `User at ${id} is successfully deleted`, data : data})
            }).catch(err=>{res.status(500).send({message : err})})
        })
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async updateMedicine(req,res){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            MedicineModel.update({
                "medName": req.body.medName,
                "medType": req.body.medType,
                "manuDate": req.body.manuDate,
                "expDate": req.body.expDate,
                "manufacturer" : req.body.manufacturer, 
                "purDate": req.body.purDate,
                "price": req.body.price
            },{where : {medicineId : id}})
        }).then(data=>{
            res.status(200).send({message : "Medicine Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
}

module.exports = MedicineDal;