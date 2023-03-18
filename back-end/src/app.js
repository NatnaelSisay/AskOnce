const express = require("express");
const cors = require("cors");
const ResponseError = require("./errors/ResponseError");
const { connectDb } = require("./dbConnect");
const UserRouter = require("./routers/userRouter");
const questionRouter = require("./routers/questionRouter");

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", UserRouter);
app.use("/classRoom", questionRouter);
app.use("/:classroomId/questions", questionRouter);
app.use("*", (err, req, res, next) => {
  if (err instanceof ResponseError) {
    res.statusCode = err.statusCode;
    res.json(err.body);
  } else {
    res.statusCode = 500;
    res.json(err);
  }
});

app.listen(3000, () => {
  console.info("App is running on port 3000");
});
