import React from "react";
import "./styles.scss";

function DeviceConnecting() {
  return (
    <div className="s-loading">
      <span className="s-loading__circle"></span>
      <span className="s-loading__icon"></span>
      <span className="s-loading__text">Verbinde...</span>
    </div>
  );
}

export default DeviceConnecting;
