"use strict";

const booksModel = (sequelize, DataTypes) =>
  sequelize.define("books", {
    name: {
      type: DataTypes.STRING,
    },
    numOfPages: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = booksModel;
