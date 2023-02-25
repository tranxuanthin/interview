module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define("vote", {
      react: {
          type: DataTypes.BOOLEAN
      }
  })
  return Vote

}