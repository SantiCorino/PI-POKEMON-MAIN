const axios = require('axios');
const { Pokemon, Type } = require('../../db');


const createNewPokemon = async function(name, hp, attack, defense, speed, height, weight, image='https://images-na.ssl-images-amazon.com/images/I/71WkWKFRSWL.png'){
    let newPokemon = await Pokemon.create({
        name, 
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image
    });
    // console.log('Esto es types:', types)
    // let newPokemonType = await Type.findAll({
    //     where: {
    //         name: types
    //     }
    // });
    // console.log('Esto es newPokemonType:', newPokemonType);
    // await newPokemon.addType(newPokemonType);
    return newPokemon;
};

module.exports = { createNewPokemon }