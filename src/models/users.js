"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET = process.env.SECRET || "secert";

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull:false, unique: true },
    password: { type: DataTypes.STRING, allowNull:false},
    role: {
      type: DataTypes.ENUM("student", "teacher", "supervisor", "manager"),
      allowNull:false,
      defaultValue: "student",
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          student: ["read"],
          teacher: ["read", "create"],
          supervisor: ["read", "create", "update"],
          manager: ["read", "create", "update", "delete"],
        };
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error("Invalid User");
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userModel;
