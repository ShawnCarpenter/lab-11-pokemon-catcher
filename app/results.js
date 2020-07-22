import { loadGameData, findById, mungeData } from './utils.js';
import pokedex from '../data/pokemon.js';
const allTimeResults = loadGameData();
const results = allTimeResults[allTimeResults.length - 1];
const resetButton = document.getElementById('reset-button');
const ctx = document.getElementById('chart').getContext('2d');
const names = mungeData(results, 'name');
const catchData = mungeData(results, 'caught');
const encounterData = mungeData(results, 'encounters');
const colorData_1 = mungeData(results, 'color_1');
const colorData_2 = mungeData(results, 'color_2');


function buildTables() {
    const caughtTable = document.getElementById('caught');
    const encounteredTable = document.getElementById('encountered');
    results.forEach(pokemon => {
        const name = findById(pokemon._id, pokedex).pokemon;
        const timesCaught = pokemon.caught;
        const timesEncountered = pokemon.encounters;
        const rowEl = document.createElement('tr');
        const nameEl = document.createElement('td');
        const encounteredEl = document.createElement('td');
        
        nameEl.textContent = name;
        encounteredEl.textContent = timesEncountered;

        rowEl.append(nameEl, encounteredEl);
        if (timesCaught > 0) {
            const caughtEl = document.createElement('td');
            caughtEl.textContent = timesCaught;
            rowEl.append(caughtEl);
            caughtTable.append(rowEl);
        } else {
            encounteredTable.append(rowEl);
        }
    });
}

buildTables();



resetButton.addEventListener('click', ()=> {
    window.location = 'index.html';
});

Chart.defaults.global.defaultFontSize = 18;
const myChart = new Chart(ctx, { //eslint-disable-line
    type: 'bar',
    data: {
        labels: names,
        datasets: [
            {
                label: 'Times Caught',
                data: catchData,
                backgroundColor: colorData_1
            },
            {
                label: 'Times Encountered',
                data: encounterData,
                backgroundColor: colorData_2
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
            display: false
        },
        layout: {
            padding: {
                left: 100,
                right: 100,
                top: 50,
                bottom: 50
            }
        }
    }
});