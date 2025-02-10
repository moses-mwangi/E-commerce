import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/config/pg_database"; // Setup your Sequelize connection
import bcrypt from "bcryptjs";

class User extends Model {
  public id!: number;
  public email!: string;
  public passwordHash?: string;
  public googleId?: string;
  public facebookId?: string;
  public name!: string;

  // Instance methods
  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash || "");
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
    },
    facebookId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);

// Hook to hash password before saving
User.beforeSave(async (user) => {
  if (user.passwordHash) {
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
  }
});

// const user = new User();
// user.comparePassword("");

export default User;
