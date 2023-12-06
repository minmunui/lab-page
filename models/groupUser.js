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
