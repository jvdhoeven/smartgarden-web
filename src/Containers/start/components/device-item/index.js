import React from "react";
import "./styles.scss";

function DeviceItem(props) {
  const { device, onClick } = props;

  return (
    <div className="s-device" onClick={onClick}>
      <h2 className="s-device__name">{device.name}</h2>
      <p className="s-device__info">
        id: {device.id} RSSI: {device.rssi}
      </p>
      <span className="s-device__icon"></span>
      <span className="s-device__arrow"></span>
    </div>
  );
}

export default DeviceItem;
