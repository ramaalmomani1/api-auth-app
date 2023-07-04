'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define('books', {
 name: {
    type: DataTypes.STRING
 },
 numOfPages:{
    type: DataTypes.INTEGER
 }
}
)