const Sequelize = require('sequelize');

class Member extends Sequelize.Model {
    static initialize(sequelize) {
        Member.init({
            user_id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            contact: { // 연락처
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            image: { // 프로필 이미지 경로
                type: Sequelize.STRING(100),
                allowNull: true,
                defaultValue: 'none',
            },
            identity: { // 신분 - 석사, 박사, 교수, 기타
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'user',
            },
            field : { // 연구 분야
                type: Sequelize.STRING(100),
                allowNull: true,
                defaultValue: 'none',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            info: { // 자기소개
                type: Sequelize.JSON,
                allowNull: true,
                defaultValue: {
                    'BA': 'Pusan National University',
                }
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Member',
            tableName: 'members',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }

    static associate(db) {
        db.Member.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'});
    }
}

module.exports = Member;