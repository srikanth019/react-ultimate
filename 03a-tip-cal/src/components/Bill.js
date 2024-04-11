import React from 'react'
import PropTypes from 'prop-types';


function Bill ({ bill, tip1, tip2 }) {
    return (
        <h3>You pay ${bill} + (${tip1} + ${tip2} tip)</h3>
    )
}

Bill.propTypes = {
    bill: PropTypes.number.isRequired,
    tip1: PropTypes.number.isRequired,
    tip2: PropTypes.number.isRequired,
}

export default Bill