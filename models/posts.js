module.exports = (sequelize, DataTypes) => (
  sequelize.define('post', {
    subject : {
      type : DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    content : {
      type : DataTypes.STRING(500),
      allowNull: true
    },
    img : {
      type : DataTypes.STRING(200),
      allowNull : true
    }
  }, {
    timestamps: true,
    paranoid : true
  })
);
