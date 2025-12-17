import { DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  userPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  registerMethod: {
    type: DataTypes.ENUM("googleAuth", "writtenAuth"),
    defaultValue: "writtenAuth",
  },

  tokenStored: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});



export default User;
