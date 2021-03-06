import { loadGameData, buildTables, consolidateResults, mungeData } from './utils.js';
const resetButton = document.getElementById('new-button');
const clearDataButton = document.getElementById('clear-data');
const ctx = document.getElementById('chart').getContext('2d');

const allTimeResults = loadGameData();



const consolidatedResults = consolidateResults(allTimeResults);
buildTables(consolidatedResults);
const names = mungeData(consolidatedResults, 'pokemon');
const catchData = mungeData(consolidatedResults, 'caught');
const encounterData = mungeData(consolidatedResults, 'encounters');
const colorData_1 = mungeData(consolidatedResults, 'color_1');
const colorData_2 = mungeData(consolidatedResults, 'color_2');

resetButton.addEventListener('click', ()=> {
    window.location = 'index.html';
});

clearDataButton.addEventListener('click', ()=> {
    if (confirm('Are you sure you want to clear all previous game data and start a new game?')) {
        localStorage.removeItem('POKEMON');
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