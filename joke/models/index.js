const dbConfig = require('../config/mysql');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.jokes = require('./joke')(sequelize, DataTypes)
db.votes = require('./vote')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})


db.jokes.hasMany(db.votes, {
    foreignKey: 'joke_id',
    as: 'vote'
})

db.votes.belongsTo(db.jokes, {
    foreignKey: 'joke_id',
    as: 'joke'
})

module.exports = db