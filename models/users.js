const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initialize(sequelize) {
        User.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            authority: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'user',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.User.hasMany(db.Member, { foreignKey: 'user_id', sourceKey: 'id'})
        db.User.hasMany(db.Post, { foreignKey: 'author', sourceKey: 'id'})
    }
}

module.exports = User;