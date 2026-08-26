import sequelize from "../config/database.ts";
import { DataTypes, Model } from "sequelize"

/**
 * diseño entidad usuario
 */
export interface UserAttributes {
  id: number,
  name: string,
  password: string
}

class User extends Model<UserAttributes> {

  public id!: number;

  public name!: string;

  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,      
      field: "name",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    }
  }, 
  {
    sequelize,
    modelName: "User"
  }
)

export default User;