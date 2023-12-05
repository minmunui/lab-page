const Sequelize = require("sequelize");

class Member extends Sequelize.Model {
  static initiate(sequelize) {
    Member.init(
      {
        name: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        position: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        field: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Member",
        tableName: "members",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }

  static associate(db) {
    db.Member.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
  }
}

module.exports = Member;
