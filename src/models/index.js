"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const DataCollection = require("./collection");
const usersModel = require("./users");

const School = require("./school.model");
const Teacher = require("./teacher.model");
const Student = require("./student.model");

const DB_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DB_URL, sequelizeOptions);

const users = usersModel(sequelize, DataTypes);
const SchoolModel = School(sequelize, DataTypes);
const TeacherModel = Teacher(sequelize, DataTypes);
const StudentModel = Student(sequelize, DataTypes);

SchoolModel.hasMany(TeacherModel);
SchoolModel.hasMany(StudentModel);
TeacherModel.belongsTo(SchoolModel);
TeacherModel.hasMany(StudentModel);
StudentModel.belongsTo(SchoolModel);
StudentModel.belongsToMany(TeacherModel, { through: "TeacherStudent" });
TeacherModel.belongsToMany(StudentModel, { through: "TeacherStudent" });

module.exports = {
  db: sequelize,
  users: new DataCollection(users),
  school: new DataCollection(SchoolModel),
  teacher: new DataCollection(TeacherModel),
  student: new DataCollection(StudentModel),
};
