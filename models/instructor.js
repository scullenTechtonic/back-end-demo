module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define("Instructor", {
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    specialty: {
      type: DataTypes.STRING
    },
    yearsExperience: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      validate: {
        isNumeric: true,
        min: 1,
        max: 20
      }
    }
  });

  Instructor.associate = (models) => {
    Instructor.hasMany(models.Apprentice, {
      onDelete: "CASCADE"
    });
  }

  return Instructor;
}