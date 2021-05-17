import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import 'uikit/dist/js/uikit.min.js';
import './App.scss';
import DiagramContainer from './Containers/Diagram';
import HomeContainer from './Containers/Home';
import WateringContainer from './Containers/Watering';

function App() {
    const [devices, setDevices] = useState([]);
    const [peripheral, setPeripheral] = useState(null);
    const [notificationOn, setNotificationOn] = useState(false);
    const [temperature, setTemperature] = useState(null);
    const [temperatureGround, setTemperatureGround] = useState(null);
    const [moisture, setMoisture] = useState(null);
    const [watering, setWatering] = useState(null);

    useEffect(() => {
        window.ble.startScan(["4fafc201-1fb5-459e-8fcc-c5c9c331914b"], (device) => {
            console.log('found devices', device)
            setDevices([device]);
            window.ble.stopScan(() => { }, () => { });

            window.ble.connect(device.id, (peripheral) => {
                console.log('connected', peripheral)
                setPeripheral(peripheral);

                window.ble.startNotification(device.id, "4fafc201-1fb5-459e-8fcc-c5c9c331914b", "beb5483e-36e1-4688-b7f5-ea07361b26a8", (data) => {
                    setNotificationOn(true);
                    const value = String.fromCharCode.apply(null, new Uint8Array(data));

                    setTemperature(value);
                }, () => { })

                window.ble.startNotification(device.id, "4fafc201-1fb5-459e-8fcc-c5c9c331914b", "a10b02a4-3b1c-45b5-a617-5648120f8e4c", (data) => {
                    setNotificationOn(true);
                    const value = String.fromCharCode.apply(null, new Uint8Array(data));

                    setTemperatureGround(value);
                }, () => { })

                window.ble.startNotification(device.id, "4fafc201-1fb5-459e-8fcc-c5c9c331914b", "9a0c0611-a48f-4dbc-bde2-31582e606ee5", (data) => {
                    setNotificationOn(true);
                    const value = String.fromCharCode.apply(null, new Uint8Array(data));

                    setMoisture(value);
                }, () => { })

                window.ble.startNotification(device.id, "4fafc201-1fb5-459e-8fcc-c5c9c331914b", "c3134125-b92d-479f-a437-2de8cea412e7", (data) => {
                    setNotificationOn(true);
                    const value = String.fromCharCode.apply(null, new Uint8Array(data));

                    setWatering(value);
                }, () => { })
            }, () => { });
        }, () => { });
    }, []);

    return (
        <Router>
            <Switch>
                <Route path="/details">
                    <DiagramContainer temperature={temperature} temperatureGround={temperatureGround} moisture={moisture} watering={watering} />
                </Route>
                <Route path="/watering">
                    <WateringContainer />
                </Route>
                <Route path="/">
                    <HomeContainer peripheral={peripheral} temperature={temperature} temperatureGround={temperatureGround} moisture={moisture} watering={watering} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
