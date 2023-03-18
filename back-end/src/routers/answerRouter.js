const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/all/", getAllQuestionInClassRoom);
router.post("/addnew", express.json(), createQuestion);
router.get("/", express.json(), searchForQuestionsByTitle);
router.get("/bytag", express.json(), getAllQuestionsForATag);
router.delete("/:questionid", deleteQuestion);
router.use("/:questionId/answers", answerRouter);

module.exports = router;
