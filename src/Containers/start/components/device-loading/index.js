import React from 'react';
import './styles.scss';

function DeviceLoading(props) {
    return (
        <div className="s-loading">
            <span className="s-loading__circle"></span>
            <span className="s-loading__icon"></span>
            <span className="s-loading__text">Suche Geräte...</span>
        </div>
    );
}

export default DeviceLoading;
