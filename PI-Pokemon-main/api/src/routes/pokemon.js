const { Router } = require('express');
const router = Router();
const { Type } = require('../db');
const { getAllPokemonsFromApi, getAllPokemonsFromDb, getNamePokemonFromApi, getNamePokemonFromDb, getIdPokemonFromApi, getIdPokemonFromDb } = require('./utils/getsPokemons')
const { createNewPokemon } = require('./utils/postPokemons');
const { getAllTypes } = require('./utils/getTypes');

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    await getAllTypes();
    try {
        if(name){
            const nameAux = name.toLowerCase();
            try {
                let namePokemonFromApi = await getNamePokemonFromApi(nameAux);
                if (!namePokemonFromApi) {
                    let namePokemonFromDb = await getNamePokemonFromDb(nameAux);
                    if (!namePokemonFromDb) {
                        res.send( `No hay pokemons con el nombre ${name}` )
                    } else {
                        return res.json(namePokemonFromDb)
                    }
                } else {
                    res.json(namePokemonFromApi);
                }
            } catch (error) {
                console.log(error);
                res.send( `No hay pokemons con el nombre ${name}` )
            }
        } else {
            let allPokemonsFromApi = await getAllPokemonsFromApi();
            let allPokemonsFromDb = await getAllPokemonsFromDb();
            let details = [...allPokemonsFromApi, ...allPokemonsFromDb];
            res.send(details);
        }
    } catch (error) {
        next(error);
    }
});


router.get('/:idPokemon', async (req, res, next) => {
    const { idPokemon } = req.params;
    await getAllTypes();
    try {
        if(idPokemon.length<36) { // 36 caracteres tiene el UUID
            let idPokemonFromApi = await getIdPokemonFromApi(idPokemon);
            return res.json(idPokemonFromApi); }
        else { 
            let idPokemonFromDb = await getIdPokemonFromDb(idPokemon);
            return res.json(idPokemonFromDb); };
    } catch (error) {
        res.status(405).json({ msg: `No se encuentran pokemons con el id ${idPokemon}` })
    }
});


router.post('/', async (req, res, next) => {
    const { name, types, hp, attack, defense, speed, height, weight, image } = req.body;
    await getAllTypes();
    try {
        if(!name) { return res.status(400).json({ msg: 'Es necesario ingresar un nombre' }) };
        
        let newPokemon = await createNewPokemon(name, hp, attack, defense, speed, height, weight, image);
        
        if(types) { 
            
            const newPokemonType = await Type.findAll({
                where: { name: types }
            })            
            
            await newPokemon.addType(newPokemonType);

        } 
        else return res.status(400).json({ msg: 'Es necesario ingresar un tipo' });
        
        res.json({ msg: "Pokémon creado con éxito" });
    } catch (error) {
        next(error);
    }
});


module.exports = router;