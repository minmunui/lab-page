const { Model, DataTypes } = require("sequelize");
class GroupUser extends Model {
  static initiate(sequelize) {
    GroupUser.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        groupId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userColor: {
          type: DataTypes.STRING(7),
          allowNull: false,
          defaultValue: "#000000",
        },
        role: {
          type: DataTypes.STRING(10),
          allowNull: false,
          defaultValue: "member",
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "GroupUser",
        tableName: "group_users",
        paranoid: false,
      },
    );
  }
}

module.exports = GroupUser;
