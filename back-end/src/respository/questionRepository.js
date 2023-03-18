const questionsModel= require('../models/questionModel');

module.exports.findAllQuestions= async(classroomId)=>{
    const result=await questionsModel.find({classroomId});
    return result;


}
module.exports.findQuestionsByTags= async(tag)=>{
    const result= await questionsModel.find({tags:{$in:[tag]}});
    console.log(result);
    return result;

}
module.exports.createQuestion= async(data)=>{
    const newQuestion= new questionsModel({
        question:data.question,
        tags:data.tags,
        description:data?.description,
        
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
