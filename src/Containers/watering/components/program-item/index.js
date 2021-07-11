import React from 'react';
import './styles.scss';

function ProgramItem(props) {
    const { program, label, onSelectProgramm, onSetProgramActive} = props;

    const getIntervalLabel = (interval) => {
        const label = [
            '3 mal täglich',
            '2 mal täglich',
            '1 mal täglich',
            'Alle zwei Tage',
            'Alle drei Tage',
            'Einmal die Woche'
        ];
        return label[interval];
    }

    const getModeLabel = (mode, startTime) => {
        const label = [
            `${startTime} Uhr`,
            'Sonnenaufgang',
            'Sonnenuntergang',
        ];
        return label[mode];
    }

    return (
        <div className="s-program" onClick={onSelectProgramm}>
            <h2 className="s-program__name">{ label }</h2>
            <p className="s-program__info">{ getModeLabel(program.mode, program.startTime) } - { program.duration } Min. - { getIntervalLabel(program.interval) }</p>
            <span className={ program.active ? "s-program__active" : "s-program__inactive"} onClick={onSetProgramActive}></span>
            <span className="s-program__arrow"></span>
        </div>
    );
}

export default ProgramItem;
