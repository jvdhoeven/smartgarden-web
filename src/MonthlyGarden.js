import React from 'react';

function MonthlyGarden() {
    return (
        <div className="uk-section uk-section-small uk-section-muted">
            <div className="uk-container">
                <h2 className="uk-heading-line uk-text-center"><span>Gartenmonat</span></h2>
                <div className="uk-position-relative uk-visible-toggle uk-dark" tabIndex="-1" uk-slider="center: true">

                    <ul className="uk-slider-items uk-grid">
                        <li className="uk-width-3-4">
                            <div className="uk-card uk-card-default">
                                <div className="uk-card-media-top">
                                    <img src="images/photo.jpg" alt="" />
                                </div>
                                <div className="uk-card-body">
                                    <h3 className="uk-card-title">April</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt.</p>
                                </div>
                            </div>
                        </li>
                        <li className="uk-width-3-4">
                            <div className="uk-card uk-card-default">
                                <div className="uk-card-media-top">
                                    <img src="images/photo.jpg" alt="" />
                                </div>
                                <div className="uk-card-body">
                                    <h3 className="uk-card-title">Mai</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt.</p>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <button className="uk-position-center-left uk-position-small uk-hidden-hover" href="#prev" uk-slidenav-previous="true"
                        uk-slider-item="previous">&nbsp;</button>
                    <button className="uk-position-center-right uk-position-small uk-hidden-hover" href="#next" uk-slidenav-next="true"
                        uk-slider-item="next">&nbsp;</button>

                </div>
            </div>
        </div>
    );
}

export default MonthlyGarden;
