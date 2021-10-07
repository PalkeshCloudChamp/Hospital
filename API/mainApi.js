const Express = require('express')
const cors = require('cors');
const PatientDal = require('./../DAL/patientDal');
const DoctorDal = require('./../DAL/doctorDal');
const staffDal = require('./../DAL/staffDal');
const WardDal = require('./../DAL/wardDal')
const NurseDal = require("./../DAL/nurseDal")
const CanteenDal = require("./../DAL/canteenDal")
const WardboyDal = require("./../DAL/wardboyDal")
const MedicineDal = require('./../DAL/medicineDal')
const Specializations = require('./../DAL/specializationDal')
const DocspeDal = require("./../DAL/docspeDal");
const RoomDal = require('../DAL/roomDal');
const BillDal = require('../DAL/billDal');
const app = Express()


app.use(Express.urlencoded({extended:false}))
app.use(cors({
    origin : "*",
    allowedHeaders : "*",
    methods : "*"
}))
app.use(Express.json())



// Patient table api's
const MainPatientDal = new PatientDal()
app.get('/api/showPatient',MainPatientDal.getPatient)
app.post('/api/addPatient',MainPatientDal.addPatient)
app.delete('/api/deletePatient/:id',MainPatientDal.deletePatient)
app.put('/api/updatePatient/:id',MainPatientDal.updatePatient)


// Doctor API's 
const doctorDal = new DoctorDal()
app.get('/api/showDoctor',doctorDal.getDoctor)
app.post('/api/addDoctor',doctorDal.addDoctor)
app.delete('/api/deleteDoctor/:id',doctorDal.deleteDoctor)
app.put('/api/updateDoctor/:id',doctorDal.updateDoctor)


// Doctor Specializations API's 
const docspeDal = new DocspeDal()
app.get('/api/showDocspe',docspeDal.getDocspe)
app.post('/api/addDocspe',docspeDal.addDocspe)
app.delete('/api/deleteDocspe/:id',docspeDal.deleteDocspe)
app.put('/api/updateDocspe/:id',docspeDal.updateDocspe)


// Nurse API's 
const nurseDal = new NurseDal()
app.get('/api/showNurse',nurseDal.getNurse)
app.post('/api/addNurse',nurseDal.addNurse)
app.delete('/api/deleteNurse/:id',nurseDal.deleteNurse)
app.put('/api/updateNurse/:id',nurseDal.updateNurse)



// Ward Boy API's

const wardboyDal = new WardboyDal()
app.get('/api/showWardboy',wardboyDal.getWardboy)
app.post('/api/addWardboy',wardboyDal.addWardboy)
app.delete('/api/deleteWardboy/:id',wardboyDal.deleteWardboy)
app.put('/api/updateWardboy/:id',wardboyDal.updateWardboy)



// Ward API's 
const wardDal = new WardDal()
app.get('/api/showWard',wardDal.getWard)
app.post('/api/addWard',wardDal.addWard)
app.delete('/api/deleteWard/:id',wardDal.deleteWard)
app.put('/api/updateWard/:id',wardDal.updateWard)



// Room API's
const roomDal = new RoomDal()
app.get('/api/showRoom',roomDal.getRoom)
app.post('/api/addRoom',roomDal.addRoom)
app.delete('/api/deleteRoom/:id',roomDal.deleteRoom)
app.put('/api/updateRoom/:id',roomDal.updateRoom)



// Canteen API's 
const canteenDal = new CanteenDal()
app.get('/api/showItem',canteenDal.getItem)
app.post('/api/addItem',canteenDal.addItem)
app.delete('/api/deleteItem/:id',canteenDal.deleteItem)
app.put('/api/updateItem/:id',canteenDal.updateItem)



// Medicine API's 
const medicineDal = new MedicineDal()
app.get('/api/showMedicine',medicineDal.getMedicine)
app.post('/api/addMedicine',medicineDal.addMedicine)
app.delete('/api/deleteMedicine/:id',medicineDal.deleteMedicine)
app.put('/api/updateMedicine/:id',medicineDal.updateMedicine)



// Specializations API's
const specializationDal = new Specializations()
app.get('/api/showSpecialization',specializationDal.getSpecializations)
app.post('/api/addSpecialization',specializationDal.addSpecializations)
app.delete('/api/deleteSpecialization/:id',specializationDal.deleteSpecializations)
app.put('/api/updateSpecialization/:id',specializationDal.updateSpecializations)



// Staff table api's
const Staffdal = new staffDal()
app.get('/api/showStaff',Staffdal.getStaff)
app.post('/api/addStaff',Staffdal.addStaff)
app.delete('/api/deleteStaff/:id',Staffdal.deleteStaffMem)
app.put('/api/updateStaff/:id',Staffdal.updateStaffMem)
app.post('/api/authUser',Staffdal.userType)
app.post('/api/email',Staffdal.getUserDetailByEmail)



// Bill table API's
const Billdal = new BillDal()
app.get('/api/showBill',Billdal.getBill)
app.post('/api/addBill',Billdal.addBill)
app.delete('/api/deleteBill/:id',Billdal.deleteBill)
app.put('/api/updateBill/:id',Billdal.updateBill)


// Port Opening at Port 1000 using 
app.listen(9080 , ()=>{console.log("Listening at 9080")})