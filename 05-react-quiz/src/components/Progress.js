import React from 'react'
import PropTypes from 'prop-types'

function Progress ({ index, numQuestions, points, maxPossiblePoints, answer }) {
    return (
        <header className='progress'>
            <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong> / {maxPossiblePoints}</p>
        </header>
    )
}

Progress.propTypes = {
    index: PropTypes.number.isRequired,
    numQuestions: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    maxPossiblePoints: PropTypes.number.isRequired,
    answer: PropTypes.number,
}

export default Progress