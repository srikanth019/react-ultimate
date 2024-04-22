import React from 'react'
import PropTypes from "prop-types"

function StartPage ({ numQuestions, dispatch }) {
    return (
        <div className='start'>
            <h2>Welcome to the React quiz!!</h2>
            <h3>{numQuestions} questions to test your react mastery</h3>
            <button className='btn btn-ui' onClick={() => dispatch({ type: "start" })}>Let's Start</button>
        </div>
    )
}

StartPage.propTypes = {
    numQuestions: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default StartPage