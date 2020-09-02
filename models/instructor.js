module.exports = (sequelize, DataTypes) => {
  // # here we define an Instructor model, which will generate/sync up with the Instructors (note the plural) table in our database
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

  // # associations are necessary to run SQL joins via Sequelize
  Instructor.associate = models => {
    Instructor.hasMany(models.Apprentice, {
      onDelete: "CASCADE"
    });
  }

  // ! CRUCIAL - we must always return the completed model to the Sequelize "brain"
  return Instructor;
}