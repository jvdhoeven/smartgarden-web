import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import "./App.scss";
import { SERVICE_UUID } from "./constants";
import HomeContainer from "./containers/home/index";
import SettingsContainer from "./containers/settings/index";
import StartContainer from "./containers/start/index";
import WateringContainer from "./containers/watering/index";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "@fortawesome/fontawesome-free/js/all";

function App() {
  const history = useHistory();
  const location = useLocation();
  const sessionDevice = JSON.parse(localStorage.getItem("deviceId"));
  const SCAN_SECONDS = 10;

  // App state
  const [isScanning, setIsScanning] = useState(true);
  const [connected, setConnected] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(sessionDevice);
  const [devices, setDevices] = useState([]);

  const selectDevice = (device) => {
    setSelectedDevice(device);
  };

  const scan = () => {
    setIsScanning(true);
    setDevices([]);
    // ble.startScan calls success callback everytime it finds a device that provides the service
    window.ble.scan(
      [SERVICE_UUID],
      SCAN_SECONDS,
      (device) => {
        setDevices((devices) => [...devices, device]);
      },
      () => {}
    );

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
        case "/home":
          title = "Dashboard";
          item = "dashboard";
          window.smartgarden.showBottomBar(
            "title",
            () => {},
            () => {}
          );
          break;
        case "/watering":
          title = "Bewässerung";
          item = "watering";
          break;
        case "/settings":
          title = "Einstellungen";
          item = "settings";
          break;
        default:
          title = "Geräteauswahl";
          item = "select";
          break;
      }
      window.smartgarden.changeTitle(
        title,
        () => {},
        () => {}
      );
      window.smartgarden.setBottomBarItem(
        item,
        () => {},
        () => {}
      );
    }
  }, [location]);

  // If no device is stored in localStorage but user navigated to a route that needs device information, we redirect to device selection page
  useEffect(() => {
    if (!selectedDevice && location.pathname !== "/") {
      history.replace("/");
    }
  }, [history, selectedDevice, location]);

  // if there is no selectedDevice yet, we initialize the scan for devices
  useEffect(() => {
    scan();
  }, []);

  // if device was selected from the list, setup the connection to the device
  useEffect(() => {
    if (selectedDevice) {
      setIsScanning(false);
      // connect to the selected device
      setTimeout(() => {
        window.ble.connect(
          selectedDevice.id,
          () => {
            setConnected(true);
            history.replace("/home");
          },
          (blib) => {
            if (connected) {
              setConnected(false);
              //setSelectedDevice(null);
              history.replace("/");
              alert("Das Gerät hat die Verbindung beendet.");
              window.smartgarden.hideBottomBar();
              window.ble.disconnect(selectedDevice.id);
              scan();
            }
          }
        );
      }, 100);
    }
  }, [selectedDevice, history, connected]);

  return (
    <Switch>
      <Route exact path="/watering">
        <WateringContainer device={selectedDevice} />
      </Route>
      <Route exact path="/settings">
        <SettingsContainer device={selectedDevice} />
      </Route>
      <Route exact path="/home">
        <HomeContainer device={selectedDevice} connected={connected} />
      </Route>
      <Route exact path="/">
        <StartContainer
          selectDevice={selectDevice}
          isScanning={isScanning}
          scan={scan}
          devices={devices}
        />
      </Route>
    </Switch>
  );
}

export default App;
