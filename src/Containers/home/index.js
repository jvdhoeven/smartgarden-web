import React, { useEffect, useState } from "react";
import Diagram from "./components/diagram";
import Dashboard from "./components/dashboard";
import { bytesToString, stringToBytes } from "../../helpers/utils";
import {
  SERVICE_UUID,
  CHARACTERISTIC_MOISTURE,
  CHARACTERISTIC_TEMP,
  CHARACTERISTIC_TEMP_GROUND,
  CHARACTERISTIC_VALVE,
} from "../../constants";

function HomeContainer(props) {
  const { connected, device } = props;

  const [showDiagram, setShowDiagram] = useState(false);

  const [temperature, setTemperature] = useState("0");
  const [temperatureGround, setTemperatureGround] = useState("0");
  const [moisture, setMoisture] = useState("0");
  const [watering, setWatering] = useState("0");
  const [temperatures, setTemperatures] = useState([]);
  const [temperaturesGround, setTemperaturesGround] = useState([]);
  const [moistures, setMoistures] = useState([]);

  const handleValveClick = () => {
    if (watering === "1") {
      window.ble.write(
        device.id,
        SERVICE_UUID,
        CHARACTERISTIC_VALVE,
        stringToBytes("0"),
        (data) => {
          setWatering("0");
        }
      );
    } else {
      window.ble.write(
        device.id,
        SERVICE_UUID,
        CHARACTERISTIC_VALVE,
        stringToBytes("1"),
        (data) => {
          setWatering("1");
        }
      );
    }
  };

  useEffect(() => {
    if (connected && device !== null) {
      // for some reason startNotification and stopNotification does not work when called synchronously, therefor i
      // switched to polling with read instead, since it works as expected
      const readData = () => {
        window.ble.read(
          device.id,
          SERVICE_UUID,
          CHARACTERISTIC_TEMP,
          (data) => {
            setTemperature(bytesToString(data));
            setTemperatures((temperatures) => [
              ...temperatures,
              bytesToString(data),
            ]);
          },
          () => {}
        );

        window.ble.read(
          device.id,
          SERVICE_UUID,
          CHARACTERISTIC_TEMP_GROUND,
          (data) => {
            setTemperatureGround(bytesToString(data));
            setTemperaturesGround((temperaturesGround) => [
              ...temperaturesGround,
              bytesToString(data),
            ]);
          },
          () => {}
        );

        window.ble.read(
          device.id,
          SERVICE_UUID,
          CHARACTERISTIC_MOISTURE,
          (data) => {
            setMoisture(bytesToString(data));
            setMoistures((moistures) => [...moistures, bytesToString(data)]);
          },
          () => {}
        );

        window.ble.read(
          device.id,
          SERVICE_UUID,
          CHARACTERISTIC_VALVE,
          (data) => {
            setWatering(bytesToString(data));
          },
          () => {}
        );
      };
      readData();
      const interval = setInterval(readData, 3000);

      // clean up on unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [connected, device]);

  return (
    <>
      {connected && !showDiagram && (
        <Dashboard
          temperature={temperature}
          temperatureGround={temperatureGround}
          moisture={moisture}
          watering={watering}
          setShowDiagram={setShowDiagram}
          handleValveClick={handleValveClick}
        />
      )}
      {connected && showDiagram && (
        <Diagram
          temperatures={temperatures}
          temperaturesGround={temperaturesGround}
          moistures={moistures}
          onCancel={() => {
            setShowDiagram(false);
          }}
        />
      )}
    </>
  );
}

export default HomeContainer;
