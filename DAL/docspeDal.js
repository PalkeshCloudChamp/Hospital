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



const StaffModel = require(path.join(__dirname , "./../models/docspetable"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

class DocspeDal{
    async getDocspe(req,res){
        await SequelizeObj.sync({force : false})
        let users = await StaffModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }

    async addDocspe(req,res){
        await SequelizeObj.sync({force : false})
        const data = req.body;
        let result = await StaffModel.create(data);
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async deleteDocspe(req,res){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            StaffModel.destroy({
                where : {
                    dsId : id
                }
            }).then(data=>{
                res.status(200).send({message : `User at ${id} is successfully deleted`, data : data})
            }).catch(err=>{res.status(500).send({message : err})})
        })
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async updateDocspe(req,res){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            StaffModel.update({
                "drId": req.body.drId,
                "speId": req.body.speId,
                "fees": req.body.fees,
            },{where : {dsId : id}})
        }).then(data=>{
            res.status(200).send({message : "Staff Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
}

module.exports = DocspeDal;