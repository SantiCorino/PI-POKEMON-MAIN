const axios = require('axios');
const { Type } = require('../../db');

const getAllTypes = async function(){
    let getTypes = await axios.get('https://pokeapi.co/api/v2/type');
    let getTypesResults = getTypes.data.results;
    let allTypesArr = getTypesResults.map(t=>t.name);
    let promises = allTypesArr.map(t=>Type.findOrCreate({ where: { name: t } }));
    await Promise.all(promises);
};

module.exports = { getAllTypes };