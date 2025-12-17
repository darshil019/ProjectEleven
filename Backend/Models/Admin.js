import { DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

const Admin = sequelize.define("Admin" , {
    adminId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    } , 

     adminName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    
    adminEmail : {
        type : DataTypes.STRING,
        unique : true,
        allowNull: false,
        validate : {
            isEmail : true
        }
    },

    adminPassword : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

export default Admin