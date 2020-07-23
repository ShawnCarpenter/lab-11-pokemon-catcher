import { loadGameData, buildTables, consolidateResults, mungeData } from './utils.js';
const resetButton = document.getElementById('new-button');
const clearDataButton = document.getElementById('clear-data');
const ctx = document.getElementById('chart').getContext('2d');

const allTimeResults = loadGameData();

let names;
let catchData;
let encounterData;
let colorData_1;
let colorData_2;
if (allTimeResults) {
    const consolidatedResults = consolidateResults(allTimeResults);
    buildTables(consolidatedResults);
    names = mungeData(consolidatedResults, 'pokemon');
    catchData = mungeData(consolidatedResults, 'caught');
    encounterData = mungeData(consolidatedResults, 'encounters');
    colorData_1 = mungeData(consolidatedResults, 'color_1');
    colorData_2 = mungeData(consolidatedResults, 'color_2');
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