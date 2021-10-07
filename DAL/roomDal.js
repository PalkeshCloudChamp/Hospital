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



const RoomModel = require(path.join(__dirname , "../models/room"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

class RoomDal{
    async getRoom(req,res){
        await SequelizeObj.sync({force : false})
        let users = await RoomModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }

    async addRoom(req,res){
        await SequelizeObj.sync({force : false})
        const data = req.body;
        let result = await RoomModel.create(data);
        if(result)
        {return res.status(200).send({value : result , message : "Room added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async deleteRoom(req,res){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            RoomModel.destroy({
                where : {
                    roomNo : id
                }
            }).then(data=>{
                res.status(200).send({message : `User at ${id} is successfully deleted`, data : data})
            }).catch(err=>{res.status(500).send({message : err})})
        })
        if(result)
        {return res.status(200).send({value : result , message : "User added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }

    async updateRoom(req,res){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            RoomModel.update({
                "wardNo" : req.body.wardNo, 
                "roomType" : req.body.roomType,
                "occupied"  : req.body.occupied,
                "oneDayCharge" : req.body.oneDayCharge
            },{where : {roomNo : id}})
        }).then(data=>{
            res.status(200).send({message : "Room Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
}

module.exports = RoomDal;