import React, { useEffect, useState } from 'react';
import { CHARACTERISTIC_FLOW_RATE, CHARACTERISTIC_LOCATION, SERVICE_UUID } from '../../constants';
import { CHARACTERISTIC_DATE_TIME } from '../../constants.js';
import { bytesToString, stringToBytes } from '../../helpers/utils';

function SettingsContainer(props) {
    const { device } = props;
    const [ dateTime, setDateTime ] = useState(null);
    const [ location, setLocation ] = useState(null);
    const [ flowRate, setFlowRate ] = useState(null);

    const [inputs, setInputs] = useState({
        dateTime: dateTime | '',
        location: location | '',
        flowRate: flowRate | ''
    });

    const handleInputChange = (event) => { setInputs(inputs => ({...inputs, [event.target.name]: event.target.value})); }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        window.ble.write(device.id, SERVICE_UUID, CHARACTERISTIC_LOCATION, stringToBytes(inputs.location), (data) => {});
        window.ble.write(device.id, SERVICE_UUID, CHARACTERISTIC_FLOW_RATE, stringToBytes(inputs.flowRate), (data) => {});
    };

    const handleLocation = () => {
        navigator.geolocation.getCurrentPosition((success) => {
            setLocation(`${success.coords.latitude};${success.coords.longitude}`);
        }, (error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if(device) {
            window.ble.read(device.id, SERVICE_UUID, CHARACTERISTIC_DATE_TIME, (data) => {
                console.log('setDateTime', bytesToString(data));
                setDateTime(bytesToString(data));
            }, (error) => {
                console.log(error);
            });
    
            window.ble.read(device.id, SERVICE_UUID, CHARACTERISTIC_LOCATION, (data) => {
                console.log('setLocation', bytesToString(data));
                setLocation(bytesToString(data));
            }, (error) => {
                console.log(error);
            });
    
            window.ble.read(device.id, SERVICE_UUID, CHARACTERISTIC_FLOW_RATE, (data) => {
                console.log('setFlowRate', bytesToString(data));
                setFlowRate(bytesToString(data));
            }, (error) => {
                console.log(error);
            });
        }
    }, [device]);

    useEffect(() => {
        if (dateTime) {
            setInputs((inputs) => ({ ...inputs, dateTime }));
        }
        if (location) {
            setInputs((inputs) => ({ ...inputs, location }));
        }
        if (flowRate) {
            setInputs((inputs) => ({ ...inputs, flowRate }));
        }
    }, [dateTime, location, flowRate]);

    return (
        <div className="uk-section uk-section-small">
            <div className="uk-container">
                <form className="uk-form-stacked" onSubmit={handleSubmit}>
                    <div className="uk-margin">
                        <div className="uk-card uk-card-default uk-card-small uk-card-body">
                            <label className="uk-form-label uk-text-bold">Datum und Uhrzeit</label>
                            <div className="uk-form-controls uk-margin-small-top">
                                <input className="uk-input" type="date-time" name="dateTime" disabled="true" value={inputs.dateTime} />
                            </div>
                        </div>
                    </div>

                    <div className="uk-margin">
                        <div className="uk-card uk-card-default uk-card-small uk-card-body">
                            <label className="uk-form-label uk-text-bold">Standort des Geräts</label>
                            <div className="uk-form-controls uk-margin-small-top">
                                <div className="uk-inline uk-width-1-1">
                                    <button type="button" className="uk-form-icon uk-form-icon-flip" uk-icon="icon: location" onClick={handleLocation}></button>
                                    <input className="uk-input" type="text" name="location" value={inputs.location} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="uk-margin">
                        <div className="uk-card uk-card-default uk-card-small uk-card-body">
                            <label className="uk-form-label uk-text-bold">Flussrate in Liter/Minute</label>
                            <div className="uk-form-controls uk-margin-small-top">
                                <input className="uk-input" type="text" name="flowRate" value={inputs.flowRate} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary uk-width-1-1" type="submit">Speichern</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SettingsContainer;
