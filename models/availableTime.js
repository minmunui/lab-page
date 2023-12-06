const { Model, DataTypes } = require("sequelize");

class AvailableTime extends Model {
  static initiate(sequelize) {
    AvailableTime.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        dayOfWeek: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        startTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "AvailableTime",
        tableName: "available_times",
        paranoid: false,
      },
    );
  }

  static associate(db) {
    AvailableTime.belongsTo(db.User, { foreignKey: "userId" });
    AvailableTime.belongsTo(db.Group, { foreignKey: "groupId" });
  }
}

module.exports = AvailableTime;
