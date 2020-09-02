module.exports = (sequelize, DataTypes) => {
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
        len: [9, 9]
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

  Apprentice.associate = (models) => {
    Apprentice.belongsTo(models.Instructor, {
      foreignKey: {
        allowNull: false
      }
    });
  } 

  return Apprentice;
}