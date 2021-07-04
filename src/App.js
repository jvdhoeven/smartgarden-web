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
    const SCAN_SECONDS = 10;
    // App state
    const [isScanning, setIsScanning] = useState(true);
    const [connected, setConnected] = useState(false);
    const [redirected, setRedirected] = useState(false);
    const [device, setDevice] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(sessionDevice);
    const [saveDevice, setSaveDevice] = useState(false);
    const [devices, setDevices] = useState([]);

    const selectDevice = (device, save) => {
        setSaveDevice(save);
        setSelectedDevice(device);
    }

    const scan = () => {
        setIsScanning(true);
        // ble.startScan calls success callback everytime it finds a device that provides the service
        window.ble.scan([SERVICE_UUID], SCAN_SECONDS, (device) => {
            setDevice(device);
        }, () => { });

        setTimeout(() => {
            setIsScanning(false);
        }, SCAN_SECONDS * 1000);
    };

    useEffect(() => {
        UIkit.use(Icons);
    });

    useEffect(() => {
        if (location) {
            let title = "";
            let item = "";
            switch (location.pathname) {
                case '/home':
                    title = "Dashboard";
                    item = 'dashboard';
                    window.smartgarden.showBottomBar('title', () => {}, () => {});
                    break;
                case '/watering':
                    title = "Bewaesserung";
                    item = 'watering';
                    break;
                case '/settings':
                    title = "Einstellungen";
                    item = 'settings';
                    break;
                default:
                    title = "Geräteauswahl";
                    item = 'select';
                    break;
            }
            window.smartgarden.changeTitle(title, () => {}, () => {});
            window.smartgarden.setBottomBarItem(item, () => {}, () => {});
        }
    }, [location])

    // If a device is stored in localStorage, we can directly navigate to home page
    useEffect(() => {
        if (connected) {
            if (saveDevice) {
                console.log('save');
                sessionStorage.setItem('deviceId', JSON.stringify(selectedDevice));
            }
            if(!redirected && location.pathname === '/') {
                console.log('redirect');
                history.replace('/home');
                setRedirected(true);
            }
        }
    }, [connected, redirected, saveDevice, selectedDevice, history, location])

    // If no device is stored in localStorage but user navigated to a route that needs device information, we redirect to device selection page
    useEffect(() => {
        if (!selectedDevice && location.pathname !== '/') {
            history.replace('/');
        }
    }, [history, selectedDevice, location]);

    // if device was selected, stop scanning
    useEffect(() => {
        if (selectedDevice && isScanning) {
            //window.ble.stopScan(() => { }, () => { });
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

    // append scanned device to device list
    useEffect(() => {
        if (device) {
            setDevices((devices) => [...devices, device]);
        }
    }, [device]);

    // if there is no selectedDevice yet, we initialize the scan for devices
    useEffect(() => {
        if (!selectedDevice) {
            scan();
        }
    }, [selectedDevice]);



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
                <StartContainer isScanning={isScanning} scan={scan} devices={devices} selectDevice={selectDevice} />
            </Route>
        </Switch>
    );
}

export default App;
