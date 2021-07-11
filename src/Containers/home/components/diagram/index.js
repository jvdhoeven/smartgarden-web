import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/dist/chart';
import UIkit from 'uikit';

let chart = null;

function Diagram(props) {
    const { temperatures, temperaturesGround, moistures, onCancel } = props;
    const chartRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        window.smartgarden.changeTitle("Details");

        const options = {
            animation: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: -20,
                    max: 40,
                    ticks: {
                        callback: function (value, index, values) {
                            return `${value} °C`;
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: function (value, index, values) {
                            return `${value} %`;
                        }
                    },
                    // grid line settings
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    }
                }
            }
        };

        chart = new Chart(chartRef.current.getContext('2d'), {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Luft',
                    yAxisID: 'y',
                    backgroundColor: 'rgba(255, 0, 0, 0.3)',
                    borderColor: 'rgba(255, 0, 0, 0.4)',
                }, {
                    label: 'Boden',
                    yAxisID: 'y',
                    backgroundColor: 'rgba(0, 255, 0, 0.3)',
                    borderColor: 'rgba(0, 255, 0, 0.4)',
                }, {
                    label: 'Feuchtigkeit',
                    yAxisID: 'y1',
                    backgroundColor: 'rgba(0, 0, 255, 0.3)',
                    borderColor: 'rgba(0, 0, 255, 0.4)',
                    fill: true
                }]
            },
            options: options
        });
        
        UIkit.modal(modalRef.current).show();
    }, []);

    useEffect(() => {
        chart.data.labels = temperatures.slice(Math.max(temperatures.length - 20, 0)).map((label, i) => i);
        chart.data.datasets[0].data = temperatures.slice(Math.max(temperatures.length - 20, 0));
        chart.data.datasets[1].data = temperaturesGround.slice(Math.max(temperaturesGround.length - 20, 0));
        chart.data.datasets[2].data = moistures.slice(Math.max(moistures.length - 20, 0));
        chart.update();
    }, [moistures, temperatures, temperaturesGround]);

    return (
        <div className="uk-section uk-section-small">
            <div className="uk-container">
                <canvas style={{height: '60vh'}} ref={chartRef}></canvas>
                <div className="uk-margin">
                    <button className="uk-button uk-button-default uk-width-1-1" type="button" onClick={onCancel}>Zurück</button>
                </div>
            </div>
        </div>
    );
}

export default Diagram;
