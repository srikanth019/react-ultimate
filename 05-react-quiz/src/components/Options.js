import React from 'react'
import PropTypes from 'prop-types'

function Options ({ question, dispatch, answer }) {
    const isAnswered = answer !== null;
    function getOptionClass (index) {
        if (index === question.correctOption) {
            return 'correct'
        } else {
            return 'wrong'
        }
    }
    return (
        <div className='options'>
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${isAnswered ? getOptionClass(index) : ""}`}
                    key={option}
                    disabled={isAnswered}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                >{option}</button>
            ))
            }
        </div >
    )
}

Options.propTypes = {
    question: PropTypes.shape({
        correctOption: PropTypes.number.isRequired,
        options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    answer: PropTypes.number,
}

export default Options