import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/dist/chart';
import UIkit from 'uikit';

let chart;

function Diagram(props) {
    const { temperature, temperatureGround, moisture } = props;
    const chartRef = useRef(null);
    const modalRef = useRef(null);
    const [ temps, setTemps ] = useState([]);
    const [ tempsGround, setTempsGround ] = useState([]);
    const [ moist, setMoist ] = useState([]);

    useEffect(() => {
        const options = {
            animation: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
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
                    label: 'Temperature 1',
                    yAxisID: 'y',
                    backgroundColor: 'rgba(255, 0, 0, 0.3)',
                    borderColor: 'rgba(255, 0, 0, 0.4)',
                }, {
                    label: 'Temperature 2',
                    yAxisID: 'y',
                    backgroundColor: 'rgba(0, 255, 0, 0.3)',
                    borderColor: 'rgba(0, 255, 0, 0.4)',
                }, {
                    label: 'Moist',
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
        if(temperature && temperatureGround && moisture) {
            setTemps([...temps, temperature]);
            setTempsGround([...tempsGround, temperatureGround]);
            setMoist([...moist, moisture]);
            chart.data.labels = temps.slice(Math.max(temps.length - 20, 0)).map((label, i) => i);
            chart.data.datasets[0].data = temps.slice(Math.max(temps.length - 20, 0));
            chart.data.datasets[1].data = tempsGround.slice(Math.max(tempsGround.length - 20, 0));
            chart.data.datasets[2].data = moist.slice(Math.max(moist.length - 20, 0));
            chart.update();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [temperature]);

    return (
        <div className="uk-section uk-section-small">
            <div className="uk-container">
                <h2 className="uk-heading-line uk-text-center"><span>Details</span></h2>

                <canvas style={{height: '80vh'}} ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default Diagram;
