const { verifyJwt } = require("../jwtUtil");
const {
  findAllQuestions,
  createQuestion,
  findQuestionsByTags,
  deleteAquestion,
  findAquestionsByTitle,
  getAllTags,
  addLikes,
  removeLikes,
} = require("../respository/questionRepository");

module.exports.getAllQuestionInClassRoom = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    const result = await findAllQuestions(classroomId);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.createQuestion = async (req, res, next) => {
  try {
    console.log("here");
    const { classroomId } = req.params;
    const data = req.body;

    const result = await createQuestion(classroomId, data);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.searchForQuestionsByTitle = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    const { title } = req.query;

    const result = await findAquestionsByTitle(classroomId, title);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteQuestion = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    const { questionId } = req.params;

    const result = await deleteAquestion(classroomId, questionId);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getAllQuestionsForATag = async (req, res, next) => {
  try {
    console.log(req.body.tags);
    const  tag  = req.body.tags;
    const { classroomId } = req.params;

    const result = await findQuestionsByTags(classroomId, tag);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getAllTagsForClass = async (req, res, next) => {
  const { classroomId } = req.params;
  const result = await getAllTags(classroomId);
  res.json({
    success:true,
    data:result
  })
};
module.exports.addlikes= async (req,res,next)=>{
  try{
    
    const likedBy = verifyJwt(req.headers.authorization.split(" ")[1]);
    const userId= likedBy._id

    
      
    const {classroomId, questionId}=req.params;
 
    const result= await addLikes(classroomId,questionId,userId);
    res.json({
      success:true,
      data:result
    })
  }catch(err){
    next(err);
  }
}
module.exports.removelikes= async (req,res,next)=>{
  try{
    const likedBy = verifyJwt(req.headers.authorization.split(" ")[1]);
    const userId= likedBy._id
      
    const {classroomId, questionId}=req.params;
   
    const result= await removeLikes(classroomId,questionId,userId);
    res.json({
      success:true,
      data:result
    })
  }catch(err){
    next(err);
  }
}
