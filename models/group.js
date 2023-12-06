const { Model, DataTypes } = require("sequelize");

class Group extends Model {
  static initiate(sequelize) {
    Group.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },

      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Group",
        tableName: "groups",
        paranoid: false,
      },
    );
  }

  static associate(db) {
    Group.belongsToMany(db.User, {
      through: "GroupUser",
      foreignKey: "groupId",
    });
    Group.hasMany(db.AvailableTime, { foreignKey: "groupId" });
  }
}

module.exports = Group;
