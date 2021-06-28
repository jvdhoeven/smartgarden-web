import React, { useEffect, useState } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import DiagramContainer from '../Containers/Diagram';
import Dashboard from '../Dashboard';
import MonthlyGarden from '../MonthlyGarden';
import {
    SERVICE_UUID,
    CHARACTERISTIC_MOISTURE,
    CHARACTERISTIC_TEMP,
    CHARACTERISTIC_TEMP_GROUND,
    CHARACTERISTIC_VALVE
} from '../constants';


const getValueFromNotificationData = (data) => {
    return String.fromCharCode.apply(null, new Uint8Array(data));
};

function HomeContainer(props) {
    const { connected, device } = props;

    const [temperature, setTemperature] = useState(null);
    const [temperatureGround, setTemperatureGround] = useState(null);
    const [moisture, setMoisture] = useState(null);
    const [watering, setWatering] = useState(null);

    useEffect(() => {
        if(connected && device !== null) {
            window.ble.startNotification(device.id, SERVICE_UUID, CHARACTERISTIC_TEMP, (data) => {
                setTemperature(getValueFromNotificationData(data));
            }, () => { });

            window.ble.startNotification(device.id, SERVICE_UUID, CHARACTERISTIC_TEMP_GROUND, (data) => {
                setTemperatureGround(getValueFromNotificationData(data));
            }, () => { });

            window.ble.startNotification(device.id, SERVICE_UUID, CHARACTERISTIC_MOISTURE, (data) => {
                setMoisture(getValueFromNotificationData(data));
            }, () => { });

            window.ble.startNotification(device.id, SERVICE_UUID, CHARACTERISTIC_VALVE, (data) => {
                setWatering(getValueFromNotificationData(data));
            }, () => { });

            // clean up on unmount
            return () => {
                window.ble.stopNotification(device.id, SERVICE_UUID, CHARACTERISTIC_TEMP, () => {}, () => { });
                window.ble.stopNotification(device.id, SERVICE_UUID, CHARACTERISTIC_TEMP_GROUND, () => {}, () => { });
                window.ble.stopNotification(device.id, SERVICE_UUID, CHARACTERISTIC_MOISTURE, () => {}, () => { });
                window.ble.stopNotification(device.id, SERVICE_UUID, CHARACTERISTIC_VALVE, () => {}, () => { });
            };
        }
    }, [connected, device]);

    return (
        <Switch>
            <Route exact path="/home">
                { connected && <Dashboard temperature={temperature} temperatureGround={temperatureGround} moisture={moisture} watering={watering} />}
                <MonthlyGarden />
            </Route>
            <Route path="/home/details">
                { connected && <DiagramContainer temperature={temperature} temperatureGround={temperatureGround} moisture={moisture} watering={watering} /> }
            </Route>
        </Switch>
    );
}

export default HomeContainer;
