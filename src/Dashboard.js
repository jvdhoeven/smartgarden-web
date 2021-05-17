import React from 'react';
import { Link } from "react-router-dom";

function Dashboard(props) {
    const { peripheral, temperature, temperatureGround, moisture, watering } = props;
    return (
        <div className="uk-section uk-section-small">
            <div className="uk-container">
                <h2 className="uk-heading-line uk-text-center"><span>Dashboard</span></h2>
                { peripheral && <div className="uk-child-width-1-2 uk-grid-small uk-grid-match uk-text-center" uk-grid="true">
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">
                            <span className="uk-display-block uk-text-large"><i className="fas fa-temperature-high"></i></span>
                            <span className="uk-h4">{temperature} °C</span>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">
                            <span className="uk-display-block uk-text-large"><i className="fas fa-temperature-high"></i></span>
                            <span className="uk-h4">{temperatureGround} °C</span>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">
                            <span className="uk-display-block uk-text-large"><i className="fas fa-water"></i></span>
                            <span className="uk-h4">{moisture} %</span>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">
                            <span className="uk-display-block uk-text-large"><i className="fas fa-power-off"></i></span>
                            <span className="uk-h4">{watering}</span>
                        </div>
                    </div>
                </div>}
                { !peripheral && <div className="uk-text-center">
                    <span uk-spinner="ratio: 4.5"></span>
                </div>}
            </div>
            <div className="uk-container uk-margin-top">
                <Link className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" to="/details" uk-toggle="true">
                    { peripheral && <span><i className="fas fa-chart-area"></i> Details</span> }
                    { !peripheral && <span uk-spinner="ratio: 0.5"></span> }
                </Link>
            </div>
            <div className="uk-container">
                <Link className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom" to="/watering"><i
                    className="fas fa-hand-holding-water"></i> Bewässerung</Link>
            </div>
        </div>
    );
}

export default Dashboard;
