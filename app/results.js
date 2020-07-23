import { loadGameData, buildTables, mungeData } from './utils.js';

const allTimeResults = loadGameData();
const results = allTimeResults[allTimeResults.length - 1];
const resetButton = document.getElementById('reset-button');
const historyButton = document.getElementById('history-button');
const ctx = document.getElementById('chart').getContext('2d');
const names = mungeData(results, 'pokemon');
const catchData = mungeData(results, 'caught');
const encounterData = mungeData(results, 'encounters');
const colorData_1 = mungeData(results, 'color_1');
const colorData_2 = mungeData(results, 'color_2');



buildTables(results);



resetButton.addEventListener('click', ()=> {
    window.location = 'index.html';
});

historyButton.addEventListener('click', ()=> {
    window.location = 'all-time-results.html';
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
                left: 50,
                right: 50,
                top: 50,
                bottom: 50
            }
        }
    }
});

