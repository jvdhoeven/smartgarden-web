import React from 'react';

function StartContainer(props) {
    const { devices, selectDevice } = props;

    return (
        <div className="uk-section uk-section-small">
            <div className="uk-container">
                <h2 className="uk-heading-line uk-text-center"><span>Geräteauswahl</span></h2>
                { devices.length > 0 &&  <div>
                    { devices.map(element => <div key={element.name} onClick={() => { selectDevice(element); }}>
                        <h3>{ element.name }</h3>
                        <p>{ element.id } { element.rssi }</p>
                    </div>) }
                </div> }
            </div>
        </div>
    );
}

export default StartContainer;
