const express=require('express');
const router=express.Router();
const {getAllQuestionInClassRoom, createQuestion,searchForQuestionsByTitle, deleteQuestion, getAllQuestionsForATag}=require('../controllers/questionController');
const {authMiddleWare}= require('../middlewares/authMiddleware');
const answerRouter= require('./answerRouter')


router.get('/:classRoomId',authMiddleWare(),getAllQuestionInClassRoom);
router.post('/',authMiddleWare(),express.json(),createQuestion);
router.get('/',authMiddleWare(),express.json(),searchForQuestionsByTitle);
router.get('/:tag',authMiddleWare(),express.json(),getAllQuestionsForATag);
router.delete('/:questionid',authMiddleWare(),deleteQuestion);
router.use('/:questionId/answers',authMiddleWare(),answerRouter)

module.exports=router;

