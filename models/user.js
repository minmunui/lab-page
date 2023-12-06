const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        authority: {
          type: Sequelize.ENUM("SUPER", "ADMIN", "USER"),
          allowNull: false,
          defaultValue: "USER",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }

  static associate(db) {
    User.hasMany(db.AvailableTime, { foreignKey: "userId" });
    User.belongsToMany(db.Group, {
      through: "GroupUser",
      foreignKey: "userId",
    });
  }
}

module.exports = User;
