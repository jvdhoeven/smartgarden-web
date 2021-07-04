import React from 'react';
import Start from './start/index'

function StartContainer(props) {
    const { isScanning, scan, devices, selectDevice } = props;

    return (
        <div className="uk-section uk-section-small">
            <div className="uk-container">
                <Start isScanning={isScanning} scan={scan} devices={devices} selectDevice={selectDevice} />
            </div>
        </div>
    );
}

export default StartContainer;
