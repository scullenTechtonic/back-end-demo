module.exports = (sequelize, DataTypes) => {
  // # here we define an Apprentice model, which will generate/sync up with the Apprentices (note the plural) table in our database
  const Apprentice = sequelize.define("Apprentice", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: [10, 10]
      }
    },
    groupNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isIn: [[1, 2, 3, 4, 5]]
      }
    }
  });

  // # associations are necessary to run SQL joins via Sequelize
  Apprentice.associate = models => {
    Apprentice.belongsTo(models.Instructor, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  // ! CRUCIAL - we must always return the completed model to the Sequelize "brain"
  return Apprentice;
}