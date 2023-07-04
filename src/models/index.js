"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const books = require("./books.model");
const classmodel = require("./class.model");
const food = require("./food.model");
const DataCollection = require("./collection");
const usersModel = require("./users");

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

const booksModel = books(sequelize, DataTypes);
const classModel = classmodel(sequelize, DataTypes);
const foodModel = food(sequelize, DataTypes);
const users = usersModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  book: new DataCollection(booksModel),
  class: new DataCollection(classModel),
  food: new DataCollection(foodModel),
  users: new DataCollection(users),
};
