import { loadGameData, buildTables, consolidateResults } from './utils.js';
const resetButton = document.getElementById('new-button');
const clearDataButton = document.getElementById('clear-data');


const allTimeResults = loadGameData();
let consolidatedResults;

if (allTimeResults) {
    consolidatedResults = consolidateResults(allTimeResults);
    buildTables(consolidatedResults);
} 





resetButton.addEventListener('click', ()=> {
    window.location = 'index.html';
});

clearDataButton.addEventListener('click', ()=> {
    if (confirm('Are you sure you want to clear all previous game data and start a new game?')) {
        localStorage.clear();
        window.location = 'index.html';
    }
    
});