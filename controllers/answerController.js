const db = require("../models");
let answerController = module.exports;

answerController.postAnswer = (req, res) => {
  if (req.user) {
    req.body.QuestionId = req.params.questionId;
    req.body.UserId = req.user.id;
    db.Answer.create(req.body).then(dbAnswer => {
      res.json(dbAnswer);
    });
  } else {
    res.redirect("/signin");
  }
};

answerController.getAnswers = (req, res) => {
  db.Answer.findAll({
    where: {
      QuestionId: req.params.questionId
    },
    include: [db.User, db.Question]
  }).then(dbAnswer => {
    res.json(dbAnswer);
  });
};