'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      userName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      registerMethod: {
        type: Sequelize.ENUM('googleAuth', 'writtenAuth'),
        defaultValue: 'writtenAuth',
      },

      tokenStored: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // IMPORTANT: drop ENUM first (Postgres requirement)
    await queryInterface.dropTable('Users');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_registerMethod";'
    );
  },
};
