const questionsModel= require('../models/questionModel');

module.exports.findAllQuestions= async(classroomId)=>{
    const result=await questionsModel.find({classroomId});
    return result;


}
module.exports.findQuestionsByTags= async(classroomId,tag)=>{
    const result= await questionsModel.find({classroomId,tags:{$in:[tag]}});
    console.log(result);
    return result;

}
module.exports.createQuestion= async(classroomId,data)=>{
    const newQuestion= new questionsModel({
        question:data.question,
        tags:data.tags,
        description:data?.description,
        classroomId:classroomId,
        answers:[]
        
    })
    
    const result= await newQuestion.save();
    
    return result.toObject();
}
module.exports.findAquestionsByTitle=async(title)=>{
    const result= new questionsModel.find({$text:{$search:title}});
}
module.exports.deleteAquestion=async(id) =>{
    const result= await questionsModel.findByIdAndDelete(id);
    return result;
}
module.exports.getAllAnswers= async(classroomId, questionId)=>{
    const result=await questionsModel.find({_id:questionId,classroomId}, 
        {answers:1, _id:0});
    return result;


}
module.exports.pushAnswer= async(classroomId,questionId, answer)=>{
    const result=await questionsModel.updateOne({classroomId,_id:questionId},{$push:{answers:answer}});
    return result;
}
module.exports.pullAnswer= async(classroomId,questionId, answerId)=>{

    const result= await questionsModel.updateOne({classroomId,_id:questionId},{$pull:{answers:{_id:answerId}}});
    return result;
}
