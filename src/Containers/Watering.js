import React, { Fragment, useState } from 'react';

function WateringContainer() {
    const [profile, setProfile] = useState(0);

    function handleSelectChange(event) {
        setProfile(event.target.value);
    }

    return (
        <Fragment>
            <div className="uk-section uk-section-small">
                <div className="uk-container">
                    <h2 className="uk-heading-line uk-text-center"><span>Bewässerung</span></h2>
                    <form className="uk-form-stacked">
                        <div>
                            <label className="uk-form-label">Profile</label>
                            <div className="uk-form-controls">
                                <select value={profile} onChange={handleSelectChange} name="profile" className="uk-select">
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
            { profile > 0 && <div className="uk-section uk-section-small">
                <div className="uk-container">
                    <h3 className="uk-heading-line uk-text-center"><span>Profil {profile}</span></h3>
                    <form className="uk-form-stacked">
                        <div className="uk-margin">
                            <label className="uk-form-label">Startzeit</label>
                            <div className="uk-form-controls">
                                <input className="uk-input" type="time" placeholder="Input" />
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label">Dauer</label>
                            <div className="uk-form-controls">
                                <input className="uk-input" type="text" placeholder="Input" />
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label">Interval</label>
                            <div className="uk-form-controls">
                                <select name="interval" className="uk-select">
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
                                <input className="uk-checkbox" type="checkbox" /> Sensoren verwenden
                            </div>
                        </div>
                    </form>
                </div>
            </div>}
        </Fragment>
    );
}

export default WateringContainer;
