module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastLogin: DataTypes.DATE
  });

  User.associate = models => {
    User.hasMany(models.Question, {
      onDelete: "cascade"
    });
    User.hasMany(models.Answer, {
      onDelete: "cascade"
    });
    User.hasMany(models.QuestionLikes, {
      onDelete: "cascade"
    });
  };

  return User;
};
