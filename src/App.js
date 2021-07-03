import React, { useEffect, useState } from 'react';
import {
    Switch,
    Route,
    useHistory,
    useLocation
} from "react-router-dom";
import './App.scss';
import { SERVICE_UUID } from './constants';
import HomeContainer from './Containers/Home';
import SettingsContainer from './Containers/Settings';
import StartContainer from './Containers/Start';
import WateringContainer from './Containers/Watering';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

function App() {
    const history = useHistory();
    const location = useLocation();
    const sessionDevice = JSON.parse(sessionStorage.getItem('deviceId'));

    // App state
    const [isScanning, setIsScanning] = useState(false);
    const [connected, setConnected] = useState(false);
    const [device, setDevice] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(sessionDevice);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        UIkit.use(Icons);
    });

    // If a device is stored in localStorage, we can directly navigate to home page
    useEffect(() => {
        if (connected) {
            sessionStorage.setItem('deviceId', JSON.stringify(selectedDevice));
            if(location.pathname === '/') {
                history.push('/home');
            }
        }
    }, [connected, selectedDevice, history, location])

    // If no device is stored in localStorage but user navigated to a route that needs device information, we redirect to device selection page
    useEffect(() => {
        if (!selectedDevice && location.pathname !== '/') {
            history.push('/');
        }
    }, [history, selectedDevice, location]);

    // if device was selected, stop scanning
    useEffect(() => {
        if (selectedDevice && isScanning) {
            window.ble.stopScan(() => { }, () => { });
        }
    }, [selectedDevice, isScanning]);

    // if device was selected from the list, setup the connection to the device
    useEffect(() => {
        if (selectedDevice) {
            setIsScanning(false);
            // connect to the selected device
            window.ble.connect(selectedDevice.id, () => {
                setConnected(true);
            });
        }
    }, [selectedDevice]);

    // if there is no selectedDevice yet, we initialize the scan for devices
    useEffect(() => {
        if (!selectedDevice) {
            setIsScanning(true);
            // ble.startScan calls success callback everytime it finds a device that provides the service
            window.ble.startScan([SERVICE_UUID], (device) => {
                setDevice(device);
            }, () => { });
        }
    }, [selectedDevice]);

    // append scanned device to device list
    useEffect(() => {
        if (device) {
            setDevices((devices) => [...devices, device]);
        }
    }, [device]);

    return (
        <Switch>
            <Route exact path="/watering">
                <WateringContainer />
            </Route>
            <Route exact path="/settings">
                <SettingsContainer device={selectedDevice} />
            </Route>
            <Route exact path="/home">
                <HomeContainer connected={connected} device={selectedDevice} />
            </Route>
            <Route exact path="/">
                <StartContainer devices={devices} selectDevice={setSelectedDevice} />
            </Route>
        </Switch>
    );
}

export default App;
