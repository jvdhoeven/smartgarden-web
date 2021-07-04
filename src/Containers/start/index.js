import React, { createRef, useState } from 'react';
import DeviceItem from './components/device-item';
import DeviceLoading from './components/device-loading';

import './styles.scss';

function Start(props) {
    const { isScanning, scan, devices, selectDevice } = props;
    const [ selectedDevice, setSelectedDevice ] = useState(null);
    const modal = createRef();

    const handleDeviceClick = (device) => {
        setSelectedDevice(device);
    }

    const confirmModal = (save) => {
        selectDevice(selectedDevice, save);
    }

    return (
        <>
            { isScanning && <DeviceLoading /> }
            { !isScanning && devices.length === 0 && <div className="s-not-found">
                <span className="s-not-found__icon"></span>
                <span className="s-not-found__text">Keine Geräte gefunden</span>
            </div> }
            { devices.length > 0 &&  <div>
                { devices.map(device => <DeviceItem device={device} key={device.name} onClick={() => { handleDeviceClick(device); }}/> ) }
            </div> }
            { !isScanning && <button className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" onClick={() => { scan(); }}>
                <span><i className="fas fa-redo"></i> Erneut suchen</span>
            </button> }

            { selectedDevice && <div ref={modal} uk-modal="true" className="uk-open" style={{display: 'block'}}>
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Gerät</h2>
                    <p>Möchtest Du Dich beim nächsten mal direkt mit diesem Gerät verbinden?</p>
                    <p className="uk-text-right">
                        <button className="uk-button uk-button-default" type="button" onClick={function () { confirmModal(false); }}>Nein</button>
                        <button className="uk-button uk-button-primary" type="button" onClick={function () { confirmModal(true); }}>Ja</button>
                    </p>
                </div>
            </div>}
        </>
    );
}

export default Start;
