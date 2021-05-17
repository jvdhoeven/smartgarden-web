import React from 'react';

import Diagram from '../Diagram';

function DiagramContainer(props) {
    const { temperature, temperatureGround, moisture, watering } = props;

    return (
        <div>
            <Diagram temperature={temperature} temperatureGround={temperatureGround} moisture={moisture} watering={watering} />
        </div>
    );
}

export default DiagramContainer;
