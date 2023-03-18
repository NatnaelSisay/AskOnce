const questionsModel= require('../models/questionModel');

module.exports.findAllQuestions= async()=>{
    const result=await questionsModel.find({deletedAt:{$exists:false}});
    return result;


}
module.exports.findQuestionsByTags= async(tag)=>{
    const result= await questionsModel.find({deletedAt:{$exists:false},tags:{$in:[tag]}});
    console.log(result);
    return result;

}
module.exports.createQuestion= async(data)=>{
    
    const newQuestion= new questionsModel({
        question:data.question,
        tags:data.tags,
        description:data?.description,
        // classroomId:classroomId,
        answers:[],
        askedBy:data.askedBy
        
    })
    console.log(newQuestion);
    const result= await newQuestion.save();
    
    return result.toObject();
}
module.exports.findAquestionsByTitle=async(title)=>{
    
    const result= await questionsModel.find({deletedAt:{$exists:false},$text:{$search:title}});
    console.log(result);
    return result;

}
module.exports.deleteAquestion=async(id) =>{
    // const result= await questionsModel.findByIdAndDelete(id);
    const result=await questionsModel.updateOne({_id:id},{$set:{deletedAt:Date.now()}})
    return result;
}
module.exports.findAllAnswers= async(questionId)=>{
    const result=await questionsModel.find({deletedAt:{$exists:false},_id:questionId}, 
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
