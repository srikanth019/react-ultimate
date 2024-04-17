import React from 'react'
import Options from './Options'
import PropTypes from 'prop-types'

function Question ({ question, dispatch, answer }) {
    console.log(question);
    return (
        <div style={{ width: "800px" }}>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    )
}

Question.propTypes = {
    question: PropTypes.shape({
        question: PropTypes.string.isRequired,
        correctOption: PropTypes.number.isRequired,
        options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    answer: PropTypes.number,
}

export default Question