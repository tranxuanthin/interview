module.exports = (sequelize, DataTypes) => {

  const Joke = sequelize.define("joke", {
      content: {
          type: DataTypes.TEXT
      }
  })

  return Joke

}
