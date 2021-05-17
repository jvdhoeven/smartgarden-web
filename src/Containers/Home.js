import React from 'react';

import Dashboard from '../Dashboard';
import MonthlyGarden from '../MonthlyGarden';

function HomeContainer(props) {
    const { peripheral, temperature, temperatureGround, moisture, watering } = props;

    return (
        <div>
            <Dashboard peripheral={peripheral} temperature={temperature} temperatureGround={temperatureGround} moisture={moisture} watering={watering} />
            <MonthlyGarden />
        </div>
    );
}

export default HomeContainer;
