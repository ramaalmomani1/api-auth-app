


const Student = (sequelize, DataTypes) => sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  schoolID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});


module.exports = Student;
