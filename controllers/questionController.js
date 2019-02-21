const db = require("../models");
let questionController = module.exports;

questionController.postQuestion = (req, res) => {
  if (req.user) {
    req.body.UserId = req.user.id;
    db.Question.create(req.body).then(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/signin");
  }
};

questionController.getAll = (req, res) => {
  db.Question.findAll({
    include: [db.User, db.Answer],
    order: [["createdAt", "DESC"]]
  }).then(dbQuestion => {
    res.json(dbQuestion);
  });
};

questionController.getById = (req, res) => {
  db.Question.findOne({
    where: {
      id: req.params.id
    },
    include: [db.User]
  }).then(dbQuestion => {
    res.json(dbQuestion);
  });
};

questionController.getByTopic = (req, res) => {
  db.Question.findAll({
    where: {
      topic: req.params.topic
    },
    include: [db.User],
    order: [["createdAt", "DESC"]]
  }).then(dbQuestion => {
    res.json(dbQuestion);
  });
};

questionController.deleteQuestion = (req, res) => {
  if (req.user) {
    db.Question.destroy({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    }).then(dbQuestion => {
      res.json(dbQuestion);
    });
  } else {
    res.redirect("/signin");
  }
};
