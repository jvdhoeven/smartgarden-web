import React, { Fragment, useState } from 'react';

function WateringContainer() {
    const [selectedProfile, setProfile] = useState(0);

    const [inputs, setInputs] = useState({
        startTime: '12:00',
        duration: 360,
        interval: 0,
        smart: false
    });

    function handleSelectChange(event) {
        setProfile(event.target.value);
    }

    const handleInputChange = (event) => { setInputs(inputs => ({...inputs, [event.target.name]: event.target.value})); }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(inputs);
    };

    return (
        <Fragment>
            <div className="uk-section uk-section-small">
                <div className="uk-container">
                    <h2 className="uk-heading-line uk-text-center"><span>Bewässerung</span></h2>
                    <form className="uk-form-stacked">
                        <div>
                            <label className="uk-form-label">Profile</label>
                            <div className="uk-form-controls">
                                <select value={selectedProfile} onChange={handleSelectChange} name="profile" className="uk-select">
                                    <option value="0">Bitte wählen</option>
                                    <option value="1">Profil 1</option>
                                    <option value="2">Profil 2</option>
                                    <option value="3">Profil 3</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            { selectedProfile > 0 && <div className="uk-section uk-section-small">
                <div className="uk-container">
                    <h3 className="uk-heading-line uk-text-center"><span>Profil {selectedProfile}</span></h3>
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
                            <button className="uk-button uk-button-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>}
        </Fragment>
    );
}

export default WateringContainer;
