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



const WardModel = require(path.join(__dirname , "../models/ward"))(
    SequelizeObj , 
    Sequelize.DataTypes
)

class WardDal{
    async getWard(req,res){
        await SequelizeObj.sync({force : false})
        let users = await WardModel.findAll();
        if(users)
        {return res.status(200).send({value : users});}
        return res.status(500).send({message: "Some internal error"})
    }

    async addWard(req,res){
        const token = req.headers.authorization;
        console.log(token);
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
        await SequelizeObj.sync({force : false})
        const data = req.body;
        let result = await WardModel.create(data);
        if(result)
        {return res.status(200).send({value : result , message : "Ward added Successfully"});}
        return res.status(500).send({message: "Some internal error"})
    }
    res.status(500).send({message : "User Not Authorized to Perform this action."})
})
}

    async deleteWard(req,res){
        const token = req.headers.authorization;
        console.log(token);
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
        const id = req.params.id;
        await SequelizeObj.sync({force : false}).then(()=>{
            WardModel.destroy({
                where : {
                    wardNo : id
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


    async updateWard(req,res){
        const token = req.headers.authorization;
        console.log(token);
        await jwt.verify(token,jwtSecret.jwtKey , async (error,decode)=>{
            if(error){return res.status(401).send({message : "Token Not Verified."})}
            req.decode = decode;
            let desi = decode.authVal.dataValues.stPDesi;
            if(desi == "Admin"){
        const id = parseInt(req.params.id);
        await SequelizeObj.sync({force:false}).then(()=>{
            WardModel.update({
                "wardType" : req.body.wardType, 
                "containAc" : req.body.containAc,
                "doubleBed"  : req.body.doubleBed
            },{where : {wardNo : id}})
        }).then(data=>{
            res.status(200).send({message : "Ward Data Updated" , data : data})
        }).catch(err=>{res.status(500).send({message : "User data cannot be updated. Try again later."})})
    }
    res.status(500).send({message : "User Not Authorized to Perform this action."})
})
}

}

module.exports = WardDal;