import React from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";

function ProgramForm(props) {
  const { title, inputs, location, onInputChange, onSubmit, onCancel, onDelete } = props;

  const durationSelectOptions = [];
  for (let i = 1; i <= 60; i++) {
    durationSelectOptions.push(
      <option value={i} key={i}>
        {i} {i !== 1 ? "Minuten" : "Minute"}
      </option>
    );
  }

  const coords = location.split(";");
  const latitude = coords[0];
  const longitude = coords[1];

  const sunrise = new Date(getSunrise(latitude, longitude));
  const sunset = new Date(getSunset(latitude, longitude));
  return (
    <div className="uk-section uk-section-small">
      <div className="uk-container">
        <h3 className="uk-heading-line uk-text-center">{title}</h3>
        <form onSubmit={onSubmit}>
          <div className="uk-margin">
            <div className="uk-card uk-card-default uk-card-small uk-card-body">
              <div className="uk-margin">
                <label className="uk-form-label uk-text-bold">Startzeit</label>
                <div className="uk-form-controls uk-margin-small-top">
                  <input
                    className="uk-radio"
                    name="mode"
                    checked={inputs.mode === "1"}
                    value="1"
                    onChange={onInputChange}
                    type="radio"
                  />{" "}
                  Sonnenaufgang ({sunrise.getHours()}:{sunrise.getMinutes()}{" "}
                  Uhr)
                </div>
                <div className="uk-form-controls uk-margin-small-top">
                  <input
                    className="uk-radio"
                    name="mode"
                    checked={inputs.mode === "2"}
                    value="2"
                    onChange={onInputChange}
                    type="radio"
                  />{" "}
                  Sonnenuntergang ({sunset.getHours()}:{sunset.getMinutes()}{" "}
                  Uhr)
                </div>
                <div className="uk-form-controls uk-margin-small-top">
                  <input
                    className="uk-radio"
                    name="mode"
                    checked={inputs.mode === "0"}
                    value="0"
                    onChange={onInputChange}
                    type="radio"
                  />{" "}
                  Manuell
                  <div className="uk-form-controls uk-margin-small-top">
                    <input
                      className="uk-input"
                      type="time"
                      name="startTime"
                      disabled={inputs.mode !== "0"}
                      value={inputs.startTime}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-margin">
            <div className="uk-card uk-card-default uk-card-small uk-card-body">
              <label className="uk-form-label uk-text-bold">Dauer</label>
              <div className="uk-form-controls uk-margin-small-top">
                <select
                  className="uk-select"
                  name="duration"
                  value={inputs.duration}
                  onChange={onInputChange}
                >
                  {durationSelectOptions}
                </select>
              </div>
            </div>
          </div>
          <div className="uk-margin">
            <div className="uk-card uk-card-default uk-card-small uk-card-body">
              <label className="uk-form-label uk-text-bold">Interval</label>
              <div className="uk-form-controls uk-margin-small-top">
                <select
                  className="uk-select"
                  name="interval"
                  disabled={inputs.mode !== "0"}
                  value={inputs.interval}
                  onChange={onInputChange}
                >
                  <option value="0">3 mal täglich</option>
                  <option value="1">2 mal täglich</option>
                  <option value="2">1 mal täglich</option>
                  <option value="3">Alle zwei Tage</option>
                  <option value="4">Alle drei Tage</option>
                  <option value="5">Einmal die Woche</option>
                </select>
              </div>
            </div>
          </div>
          <div className="uk-margin">
            <div className="uk-card uk-card-default uk-card-small uk-card-body">
              <label className="uk-form-label uk-text-bold">
                Smarte Bewässerung
              </label>
              <div className="uk-form-controls uk-margin-small-top">
                <input
                  className="uk-checkbox"
                  name="smart"
                  checked={inputs.smart}
                  onChange={onInputChange}
                  type="checkbox"
                />{" "}
                Sensoren verwenden
              </div>
            </div>
          </div>
          <div className="uk-margin-small">
            <button
              className="uk-button uk-button-primary uk-width-1-1"
              type="submit"
            >
              Speichern
            </button>
          </div>
          <div className="uk-margin-small">
            <button
              className="uk-button uk-button-default uk-width-1-1"
              type="button"
              onClick={onCancel}
            >
              Zurück
            </button>
          </div>
          <div className="uk-margin-small">
            <button
              className="uk-button uk-button-default uk-width-1-1"
              type="button"
              onClick={onDelete}
            >
              Löschen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProgramForm;
