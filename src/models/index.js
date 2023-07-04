'use strict'
const {Sequelize, Datatypes} = require('sequelize');
const books = require('./books.model')
const classmodel = require('./class.model')
const food = require('./food.model')
const DataCollection = require('./collection')

const DB_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;


let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  } : {}
  
const sequelize = new Sequelize (DB_URL, sequelizeOptions )

const booksModel = books(sequelize,Datatypes)
const classModel = classmodel(sequelize,Datatypes)
const foodModel = food(sequelize,Datatypes)


module.exports = {
    db: sequelize,
    booksCollection: new DataCollection(booksModel),
    booksCollection: new DataCollection(classModel),
    booksCollection: new DataCollection(foodModel),
}