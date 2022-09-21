const axios = require('axios');
const { Pokemon, Type } = require('../../db');

const getAllPokemonsFromApi = async function(){
    let allPokemons = await axios.get('https://pokeapi.co/api/v2/pokemon');
    let allPokemonsArray = allPokemons.data.results; // Pokemon = name + url
    let aux = await axios.get(allPokemons.data.next);
    let allPokemonsArrayNext = aux.data.results;
    let concatPokemons = [...allPokemonsArray, ...allPokemonsArrayNext];
    let asd = await Promise.all(concatPokemons.map(p=>axios.get(p.url))) // Resuelvo todos los axios al mismo tiempo. La URL tiene el detalle de los pokemon
    .then(d=>{
        let pokemonsArray = d.map(d=>d.data);
        let everyPokemonArray = pokemonsArray.map(e=>{
            return {
                id: e.id, 
                name: e.name[0].toUpperCase()+e.name.slice(1), 
                types: e.types.map(t=>t.type.name[0].toUpperCase()+t.type.name.slice(1)), 
                hp: e.stats[0].base_stat, 
                attack: e.stats[1].base_stat, 
                defense: e.stats[2].base_stat, 
                speed: e.stats[5].base_stat, 
                height: e.height, 
                weight: e.weight, 
                image: e.sprites.front_default,
            };
        });
        return everyPokemonArray;
    })
    return asd; // cambiar el nombre de esto
};

const getAllPokemonsFromDb = async function(){
    let allPokemons = await Pokemon.findAll({
        include: {
            model: Type,
            as: 'types',
            attributes: ['name'],
            through: {
                attributes: []
            },
        },
    });
    let dbPokemons = allPokemons.map(d=>{
        return {
            id: d.id,
            name: d.name,
            types: d.types.map(t=>t.name),
            hp: d.hp,
            attack: d.attack,
            defense: d.defense,
            speed: d.speed,
            height: d.height,
            weight: d.weight,
            image: d.image
    }});
    return dbPokemons;
};

const getNamePokemonFromApi = async function(name){
    try {
        let thisPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let dataPokemon = thisPokemon.data;
        return {
            id: dataPokemon.id,
            name: dataPokemon.name[0].toUpperCase()+dataPokemon.name.slice(1), 
            types: dataPokemon.types.map(t=>t.type.name[0].toUpperCase()+t.type.name.slice(1)), 
            hp: dataPokemon.stats[0].base_stat, 
            attack: dataPokemon.stats[1].base_stat, 
            defense: dataPokemon.stats[2].base_stat, 
            speed: dataPokemon.stats[5].base_stat, 
            height: dataPokemon.height, 
            weight: dataPokemon.weight, 
            image: dataPokemon.sprites.front_default
        }
    } catch (error) { // --------> Si no lo encuentra en la api tira un error 404
        console.log(error);
    }
};

const getNamePokemonFromDb = async function(name){
    let thisPokemonDb = await Pokemon.findAll({
        where: {
            name
        },
        include: {
            model: Type,
            as: 'types',
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    });
    let thisIsIt = thisPokemonDb.map(d=>{
        return {
            id: d.id,
            name: d.name,
            types: d.types.map(t=>t.name),
            hp: d.hp,
            attack: d.attack,
            defense: d.defense,
            speed: d.speed,
            height: d.height,
            weight: d.weight,
            image: d.image
    }});
    return thisIsIt[0];
};

const getIdPokemonFromApi = async function (id){
    let thisPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let dataPokemon = thisPokemon.data;
    return {
        id: dataPokemon.id,
        name: dataPokemon.name[0].toUpperCase()+dataPokemon.name.slice(1), 
        types: dataPokemon.types.map(t=>t.type.name[0].toUpperCase()+t.type.name.slice(1)), 
        hp: dataPokemon.stats[0].base_stat, 
        attack: dataPokemon.stats[1].base_stat, 
        defense: dataPokemon.stats[2].base_stat, 
        speed: dataPokemon.stats[5].base_stat, 
        height: dataPokemon.height, 
        weight: dataPokemon.weight, 
        image: dataPokemon.sprites.front_default
    }
};

const getIdPokemonFromDb = async function(id){ // -----------> ver por que no trae el type
    let thisPokemonDb = await Pokemon.findByPk(id, {
        include: {
            model: Type,
            as: 'types',
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    });
    let thisIsIt = {
        id: thisPokemonDb.id,
        name: thisPokemonDb.name,
        types: thisPokemonDb.types.map(t=>t.name),
        hp: thisPokemonDb.hp,
        attack: thisPokemonDb.attack,
        defense: thisPokemonDb.defense,
        speed: thisPokemonDb.speed,
        height: thisPokemonDb.height,
        weight: thisPokemonDb.weight,
        image: thisPokemonDb.image
    };
    return thisIsIt;
};

module.exports = {
    getAllPokemonsFromApi,
    getAllPokemonsFromDb,
    getNamePokemonFromApi,
    getNamePokemonFromDb,
    getIdPokemonFromApi,
    getIdPokemonFromDb
}