import React, { useEffect, useState } from 'react';
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

    const [showDiagram, setShowDiagram] = useState(false);

    const [temperature, setTemperature] = useState(null);
    const [temperatureGround, setTemperatureGround] = useState(null);
    const [moisture, setMoisture] = useState(null);
    const [watering, setWatering] = useState(null);

    useEffect(() => {
        if(connected && device !== null) {
            // for some reason startNotification and stopNotification does not work when called synchronously, therefor i
            // switched to polling with read instead, since it works as expected
            const readData = () => {
                window.ble.read(device.id, SERVICE_UUID, CHARACTERISTIC_TEMP, (data) => {
                    console.log('setTemperature', getValueFromNotificationData(data));
                    setTemperature(getValueFromNotificationData(data));
                }, () => { });
    
                window.ble.read(device.id, SERVICE_UUID, CHARACTERISTIC_TEMP_GROUND, (data) => {
                    console.log('setTemperatureGround', getValueFromNotificationData(data));
                    setTemperatureGround(getValueFromNotificationData(data));
                }, () => { });
    
                window.ble.read(device.id, SERVICE_UUID, CHARACTERISTIC_MOISTURE, (data) => {
                    console.log('setMoisture', getValueFromNotificationData(data));
                    setMoisture(getValueFromNotificationData(data));
                }, () => { });
    
                window.ble.read(device.id, SERVICE_UUID, CHARACTERISTIC_VALVE, (data) => {
                    console.log('setWatering', getValueFromNotificationData(data));
                    setWatering(getValueFromNotificationData(data));
                }, () => { });
            }
            readData();
            const interval = setInterval(readData, 3000);
            

            // clean up on unmount
            return () => {
                clearInterval(interval);
                /*console.log('useEffect home goodbye');
                window.ble.stopNotification(device.id, SERVICE_UUID, CHARACTERISTIC_TEMP, () => {
                    console.log('stopNotification');
                }, (error) => {
                    console.log('stopNotification', error);
                });

                setTimeout(() => {
                    window.ble.stopNotification(device.id, SERVICE_UUID, CHARACTERISTIC_TEMP_GROUND, () => {
                        console.log('stopNotification');
                    }, (error) => {
                        console.log('stopNotification', error);
                    });
                }, 300);

                setTimeout(() => {
                    window.ble.stopNotification(device.id, SERVICE_UUID, CHARACTERISTIC_MOISTURE, () => {
                        console.log('stopNotification');
                    }, (error) => {
                        console.log('stopNotification', error);
                    });
                }, 600);
                
                setTimeout(() => {
                    window.ble.stopNotification(device.id, SERVICE_UUID, CHARACTERISTIC_VALVE, () => {
                        console.log('stopNotification');
                    }, (error) => {
                        console.log('stopNotification', error);
                    });
                }, 900);*/
            };
        }
    }, [connected, device]);

    return (
        <>
                { connected && !showDiagram && <>
                    <Dashboard temperature={temperature} temperatureGround={temperatureGround} moisture={moisture} watering={watering} setShowDiagram={setShowDiagram} />
                    <MonthlyGarden />
                </>}
                { connected && showDiagram && <DiagramContainer temperature={temperature} temperatureGround={temperatureGround} moisture={moisture} watering={watering} /> }
        </>
    );
}

export default HomeContainer;
