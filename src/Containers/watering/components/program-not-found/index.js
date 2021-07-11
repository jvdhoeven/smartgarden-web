import React from 'react';
import './styles.scss';

function ProgramNotFound() {
    return (
        <div className="s-program-not-found">
            <span className="s-program-not-found__icon"></span>
            <span className="s-program-not-found__text">Noch keine Programme gespeichert</span>
        </div>
    );
}

export default ProgramNotFound;
