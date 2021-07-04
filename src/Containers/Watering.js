import React, { Fragment, useState } from 'react';

function WateringContainer() {
    const [activeProgram, setActiveProgram] = useState(0);
    const [activeProgramChanged, setActiveProgramChanged] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(0);
    const [programs, setPrograms] = useState([]);
    //const [editProgram, setEditProgram] = useState(false);
    const [addProgram, setAddProgram] = useState(false);

    const inputDefaults = {
        startTime: '12:00',
        duration: 360,
        interval: 0,
        smart: false
    };

    const [inputs, setInputs] = useState(inputDefaults);

    function handleActiveProgramChange(event) {
        setActiveProgram(event.target.value);
        setActiveProgramChanged(true);
    }

    function handleSelectedProgram(event) {
        setAddProgram(false);
        setSelectedProgram(event.target.value);
        setInputs(programs[event.target.value - 1]);
    }

    const addNewProgram = () => {
        setAddProgram(true);
        setSelectedProgram(0);
        setInputs(inputDefaults);
    }

    const saveActiveProgram = () => {
        console.log('should send active program to device', programs[activeProgram - 1]);
        setActiveProgramChanged(false);
    }

    const handleInputChange = (event) => { setInputs(inputs => ({...inputs, [event.target.name]: event.target.value})); }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(addProgram) {
            setPrograms((programs) => ([...programs, {...inputs}]));
        } else {
            const currentPrograms = [...programs];
            currentPrograms[selectedProgram - 1] = {...inputs};
            setPrograms(currentPrograms);

            if(selectedProgram === activeProgram) {
                setActiveProgramChanged(true);
            }
        }

        setSelectedProgram(0);
        setAddProgram(false);
        setInputs(inputDefaults);

        console.log(inputs);
    };

    return (
        <Fragment>
            <div className="uk-section uk-section-small">
                <div className="uk-container">
                    { !activeProgram && <div uk-alert="true">
                        Es ist noch kein Programm aktiv.
                    </div>}
                    <form uk-grid="true">
                        <div className="uk-width-1-1">
                            <label className="uk-form-label">Aktives Programm</label>
                            <div className="uk-form-controls">
                                <select value={activeProgram} onChange={handleActiveProgramChange} name="activeProgram" className="uk-select">
                                { !activeProgram && programs.length === 0 && <option value="0">Keine Programme</option>}
                                { programs.length > 0 && <>
                                    <option value="0">Bitte wählen</option>
                                    { programs.map((program, index) => <option key={index+1} value={index+1}>Programm {index+1}</option>) }
                                </>}
                                </select>
                            </div>
                            { activeProgramChanged &&
                                <button className="uk-button uk-margin-top uk-button-primary uk-width-1-1" type="button" onClick={saveActiveProgram}>Änderung Speichern</button> }
                        </div>
                        <div className="uk-width-3-4">
                            <label className="uk-form-label">Programm bearbeiten</label>
                            <div className="uk-inline uk-width-1-1">
                                <select value={selectedProgram} onChange={handleSelectedProgram} name="profile" className="uk-select">
                                { programs.length === 0 && <option value="0">Keine Programme</option>}
                                { programs.length > 0 && <>
                                    <option value="0">Bitte wählen</option>
                                    { programs.map((program, index) => <option key={index+1} value={index+1}>Programm {index+1}</option>) }
                                </>}
                                </select>
                            </div>
                        </div>
                        <div className="uk-width-1-4">
                            <label className="uk-form-label">&nbsp;</label>
                            <button className="uk-button uk-button-primary uk-width-1-1 uk-padding-remove-horizontal" type="button" onClick={addNewProgram}><span uk-icon="icon: plus"></span></button>
                        </div>
                    </form>
                </div>
            </div>
            { (addProgram || selectedProgram > 0) && <div className="uk-section uk-section-small">
                <div className="uk-container">
                    <h3 className="uk-heading-line uk-text-center">
                        { addProgram && <span>Neues Programm</span> }
                        { selectedProgram > 0 && <span>Programm bearbeiten</span> }
                    </h3>
                    <form className="uk-form-stacked" onSubmit={handleSubmit}>
                        <div className="uk-margin">
                            <label className="uk-form-label">Startzeit</label>
                            <div className="uk-form-controls">
                                <input className="uk-input" type="time" name="startTime" value={inputs.startTime} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label">Dauer</label>
                            <div className="uk-form-controls">
                                <input className="uk-input" type="text" name="duration" value={inputs.duration} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label">Interval</label>
                            <div className="uk-form-controls">
                                <select className="uk-select" name="interval" value={inputs.interval} onChange={handleInputChange}>
                                    <option value="0">3 mal täglich</option>
                                    <option value="1">2 mal täglich</option>
                                    <option value="2">1 mal täglich</option>
                                    <option value="3">Alle zwei Tage</option>
                                    <option value="4">Alle drei Tage</option>
                                    <option value="5">Einmal die Woche</option>
                                </select>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label">Smarte Bewässerung</label>
                            <div className="uk-form-controls">
                                <input className="uk-checkbox" name="smart" checked={inputs.smart} onChange={handleInputChange} type="checkbox" /> Sensoren verwenden
                            </div>
                        </div>
                        <div className="uk-margin">
                            <button className="uk-button uk-button-primary uk-width-1-1" type="submit">Speichern</button>
                        </div>
                    </form>
                </div>
            </div>}
        </Fragment>
    );
}

export default WateringContainer;
