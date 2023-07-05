

const School = (sequelize, DataTypes) => sequelize.define('School', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  principal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = School;