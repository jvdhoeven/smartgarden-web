import React, { useState } from 'react';
import DeviceItem from './components/device-item';
import DeviceConnecting from './components/device-connecting';
import DeviceLoading from './components/device-loading';

import './styles.scss';
import DeviceNotFound from './components/device-not-found';

function StartContainer(props) {
    const { isScanning, scan, devices, selectDevice } = props;
    const [ connecting, setConnecting] = useState(false);

    const handleDeviceClick = (device) => {
        const save = window.confirm("Möchtest Du Dich beim nächsten mal direkt mit diesem Gerät verbinden?");
        if (save) {
            localStorage.setItem('deviceId', JSON.stringify(device));
        }
        setConnecting(true);
        selectDevice(device);
    }

    return (
        <div className="uk-section uk-section-small">
            <div className="uk-container">
            { connecting && <DeviceConnecting /> }
            { isScanning && <DeviceLoading /> }
            { !isScanning && devices.length === 0 && <DeviceNotFound /> }
            { devices.length > 0 &&  <div>
                { devices.map(device => <DeviceItem device={device} key={device.name} onClick={() => { handleDeviceClick(device); }}/> ) }
            </div> }
            { !isScanning && <button className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" onClick={() => { scan(); }}>
                <span><i className="fas fa-redo"></i> Erneut suchen</span>
            </button> }
            </div>
        </div>
    );
}

export default StartContainer;
