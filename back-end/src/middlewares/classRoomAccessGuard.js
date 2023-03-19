const { getClassRoomsForUser } = require("../controllers/classRoomController");
const ResponseError = require("../errors/ResponseError");
const { verifyJwt } = require("../jwtUtil");
const classRoomModel = require("../models/classRoomModel");
const { getClassRoomById } = require("../respository/classRoomRepository");

module.exports.ClassRoomaccessGuard=async (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verifyJwt(token);
    const {classroomId}= req.params;
    await classRoomModel.find({
        $and:[
          {
            $or: [{ "professor._id": decodedToken._id }, { "students._id": decodedToken._id }],
          },
          { deletedAt: null },
          { _id: classroomId}
        ]}).then((result)=>{
            if(result.length>0){
                next();
            }
            else{
                next(new ResponseError)
            }
        })
    
    
    }