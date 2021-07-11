import React, { Fragment, useEffect, useState } from "react";
import ProgramForm from "./components/program-form";
import ProgramItem from "./components/program-item";
import ProgramNotFound from "./components/program-not-found";
import {
  CHARACTERISTIC_LOCATION,
  CHARACTERISTIC_PROGRAM,
  SERVICE_UUID,
} from "../../constants";
import { bytesToString, stringToBytes } from "../../helpers/utils";

function WateringContainer(props) {
  const { device } = props;
  const [programs, setPrograms] = useState(
    JSON.parse(localStorage.getItem(`programs_${device.id}`)) || []
  );
  const getActiveProgram = () => {
    let activeId = 0;
    programs.forEach((program, index) => {
      if (program.active === true) {
        activeId = index + 1;
      }
    });
    return activeId;
  };

  const [activeProgram, setActiveProgram] = useState(getActiveProgram());
  const [activeProgramChanged, setActiveProgramChanged] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(0);
  const [location, setLocation] = useState("");

  //const [editProgram, setEditProgram] = useState(false);
  const [addProgram, setAddProgram] = useState(false);

  const inputDefaults = {
    mode: "0",
    startTime: "12:00",
    duration: 6,
    interval: 0,
    smart: 0,
  };

  const [inputs, setInputs] = useState(inputDefaults);

  function onSelectProgramm(id) {
    setAddProgram(false);
    setSelectedProgram(id);
    setInputs(programs[id - 1]);
  }

  function onSetProgramActive(event, id) {
    event.stopPropagation();
    setActiveProgram(id);
    setActiveProgramChanged(true);
    const currentPrograms = [...programs];
    currentPrograms.forEach((program) => {
      program.active = false;
    });
    currentPrograms[id - 1].active = true;
  }

  const addNewProgram = () => {
    setAddProgram(true);
    setSelectedProgram(0);
    setInputs(inputDefaults);
  };

  const saveActiveProgram = () => {
    const program = programs[getActiveProgram() - 1];
    let start = program.startTime.replace(":", "");
    if (program.mode === "2") {start = "9999"};
    if (program.mode === "1") {start = "8888"};
    window.ble.write(
      device.id,
      SERVICE_UUID,
      CHARACTERISTIC_PROGRAM,
      stringToBytes(`${start};${program.duration * 60};${
        program.interval
      };${program.smart ? "1" : "0"}`),
      () => {},
      () => {}
    );
    localStorage.setItem(`programs_${device.id}`, JSON.stringify(programs));
    setActiveProgramChanged(false);
  };

  const onInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setInputs((inputs) => ({ ...inputs, [event.target.name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (addProgram) {
      setPrograms((programs) => [...programs, { ...inputs }]);
      localStorage.setItem(
        `programs_${device.id}`,
        JSON.stringify([...programs, { ...inputs }])
      );
    } else {
      const currentPrograms = [...programs];
      currentPrograms[selectedProgram - 1] = { ...inputs };
      setPrograms(currentPrograms);
      localStorage.setItem(
        `programs_${device.id}`,
        JSON.stringify(currentPrograms)
      );

      if (selectedProgram === activeProgram) {
        setActiveProgramChanged(true);
      }
    }

    setSelectedProgram(0);
    setAddProgram(false);
    setInputs(inputDefaults);
  };

  const onCancel = () => {
    setSelectedProgram(0);
    setAddProgram(false);
    setInputs(inputDefaults);
  };

  const onDelete = () => {
    const currentPrograms = [...programs];
    currentPrograms.splice(selectedProgram - 1, 1);
    setPrograms(currentPrograms);
    localStorage.setItem(
      `programs_${device.id}`,
      JSON.stringify(currentPrograms)
    );
    onCancel();
  }

  useEffect(() => {
    window.ble.read(
      device.id,
      SERVICE_UUID,
      CHARACTERISTIC_LOCATION,
      (data) => {
        setLocation(bytesToString(data));
      },
      () => {}
    );
  }, [device]);

  return (
    <Fragment>
      {!(addProgram || selectedProgram > 0) && (
        <div className="uk-section uk-section-small">
          <div className="uk-container">
            {programs.length > 0 && activeProgram === 0 && (
              <div uk-alert="true">Es ist noch kein Programm aktiv.</div>
            )}
            {activeProgramChanged && (
              <div className="uk-margin">
                <div uk-alert="true">
                  <p>
                    Aktives Programm wurde verändert. Die Änderung muss an das
                    Smartgarden Gerät übermittelt werden.
                  </p>
                  <button
                    className="uk-button uk-button-default uk-width-1-1"
                    type="button"
                    onClick={saveActiveProgram}
                  >
                    Änderung Speichern
                  </button>
                </div>
              </div>
            )}
            {programs.length === 0 && <ProgramNotFound />}
            {programs.length > 0 &&
              programs.map((program, i) => (
                <ProgramItem
                  key={i + 1}
                  program={program}
                  label={`Programm ${i + 1}`}
                  onSelectProgramm={() => {
                    onSelectProgramm(i + 1);
                  }}
                  active={i + 1 === activeProgram}
                  onSetProgramActive={(event) => {
                    onSetProgramActive(event, i + 1);
                  }}
                />
              ))}

            <button
              className="uk-button uk-button-primary uk-width-1-1 uk-padding-remove-horizontal"
              type="button"
              onClick={addNewProgram}
            >
              <span uk-icon="icon: plus"></span> Hinzufügen
            </button>
          </div>
        </div>
      )}
      {(addProgram || selectedProgram > 0) && (
        <ProgramForm
          title={addProgram ? "Neues Programm" : "Programm bearbeiten"}
          inputs={inputs}
          location={location}
          onInputChange={onInputChange}
          onCancel={onCancel}
          onDelete={onDelete}
          onSubmit={onSubmit}
        />
      )}
    </Fragment>
  );
}

/*
<form uk-grid="true">
                        <div className="uk-width-1-1">
                            <label className="uk-form-label">Aktives Programm</label>
                            <div className="uk-form-controls">
                                <select value={activeProgram} onChange={handleActiveProgramChange} name="activeProgram" className="uk-select">
                                    {!activeProgram && programs.length === 0 && <option value="0">Keine Programme</option>}
                                    {programs.length > 0 && <>
                                        <option value="0">Bitte wählen</option>
                                        {programs.map((program, index) => <option key={index + 1} value={index + 1}>Programm {index + 1}</option>)}
                                    </>}
                                </select>
                            </div>
                            {activeProgramChanged &&
                                <button className="uk-button uk-margin-top uk-button-primary uk-width-1-1" type="button" onClick={saveActiveProgram}>Änderung Speichern</button>}
                        </div>
                    </form>
                    */

export default WateringContainer;
