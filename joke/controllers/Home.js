const db = require('../models/index');
const { Op } = require('sequelize');

const Joke = db.jokes;
const Vote = db.votes;

class HomeController{
    index = async (req, res) => {
        let listJoke = req.cookies.listJoke;
        if(listJoke==null){
            var joke = await Joke.findOne({});
            listJoke = '0';
            
        }
        else{
            try {
                let arr = listJoke.split(',').map(Number);
                var joke = await Joke.findOne({
                    where: {
                        id: {
                            [Op.notIn]: arr
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        try {
            let jokeObject = joke.get({ plain: true });
            listJoke = listJoke + ',' + jokeObject.id;
            res.cookie('listJoke', listJoke);
            res.render('home',{jokes:jokeObject});
        } catch (error) {
            let jokes;
            jokes = {
                content : "That's all the jokes for today! Come back another day!"
            }
            res.render('home',{jokes})
        }
    }
    getAllJokes = async (req, res) => {
        let joke = await Joke.findAll({})
        res.status(200).send(joke)
    }

    getAllVotes = async(req,res)=>{
        let vote = await Vote.findAll({})
        res.status(200).send(vote)
    }
    addJoke = async (req, res) => {
        let info = {
            content: req.body.content
        }
        const product = await Joke.create(info)
        res.status(200).send(product)
        console.log(product)
    
    }
    vote = async (req,res) => {
        let info = {
            react: req.body.react,
            joke_id: req.body.joke_id
        }
        try {
            var vote = await Vote.create(info)
            
        } catch (error) {
            res.status(200).send('Khong ton tai joke nay');
        }
        res.status(200).send(vote);
    }
    getJoke = async (req,res) => {
        let listJoke = req.body.listJoke;
        let arr = listJoke.split(',').map(Number);
        console.log(arr);
        var joke = await Joke.findOne({
            where: {
                id: {
                    [Op.notIn]: arr
                }
            }
        });
        res.status(200).send(joke);
    }
}

module.exports = new HomeController;
