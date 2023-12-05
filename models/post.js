const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static initialize(sequelize) {
        Post.init({
            author: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.Post.belongsTo(db.Member, { foreignKey: 'author', targetKey: 'id'});
    }
}

module.exports = Post;