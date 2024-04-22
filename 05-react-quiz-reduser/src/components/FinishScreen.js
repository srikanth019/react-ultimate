import React from 'react'
import PropTypes from 'prop-types'

function FinishScreen ({ points, maxPossiblePoints, highScore, dispatch }) {
    const percentage = Math.ceil((points / maxPossiblePoints) * 100);

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️"


    return (
        <>
            <p className='result'><span>{emoji}</span>You scored <strong>{points}</strong> out of {maxPossiblePoints}
                {" "}({percentage}%)
            </p>
            <p className='highscore'>(Highscore: {highScore} points)</p>
            <button className='btn btn-ui' onClick={() => dispatch({ type: "restart" })}>Restart Quiz</button>
        </>
    )
}

FinishScreen.propTypes = {
    points: PropTypes.number.isRequired,
    maxPossiblePoints: PropTypes.number.isRequired,
    highScore: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default FinishScreen