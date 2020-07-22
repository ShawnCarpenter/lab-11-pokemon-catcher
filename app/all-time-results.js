import { loadGameData, buildTables, findById } from './utils.js';
import pokedex from '../data/pokemon.js';

const allTimeResults = loadGameData();
const consolidatedResults = consolidateResults(allTimeResults);
// const caughtTable = document.createElement('table');
// const encounteredTable = document.createElement('table');

buildTables(consolidatedResults);

function consolidateResults(allResults) {
    const returnResults = [];
    allResults.forEach(gameResult => {
        gameResult.forEach(pokemon => {
            const thisPokemon = findById(pokemon._id, returnResults);
            if (thisPokemon){
                thisPokemon.encounters += pokemon.encounters;
                thisPokemon.caught += pokemon.caught; 
            } else {
                returnResults.push(pokemon);
            }
        });
    });
    return returnResults;
}