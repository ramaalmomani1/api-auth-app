'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define('class', {
 name: {
    type: DataTypes.STRING
 },
 numOfStudents:{
    type: DataTypes.INTEGER
 }
}
)