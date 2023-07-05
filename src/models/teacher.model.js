const Teacher = (sequelize, DataTypes) => {
  const TeacherModel = sequelize.define("Teacher", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schoolID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  TeacherModel.associate = (models) => {
    TeacherModel.belongsToMany(models.Student, { through: "TeacherStudent" });
    TeacherModel.belongsTo(models.School);
  };

  return TeacherModel;
};

module.exports = Teacher;
