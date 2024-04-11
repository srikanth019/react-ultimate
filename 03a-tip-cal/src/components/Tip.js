import React from 'react'
import PropTypes from 'prop-types';

function Tip ({ tip, onTip, children }) {
    return (
        <div>
            {/* <span>{text}</span> */}
            <span>{children}</span>
            <select
                value={tip}
                onChange={(e) => onTip(e.target.value)}
            >
                <option value={0}>Dissatisfied (0%)</option>
                <option value={5}>It was Ok (5%)</option>
                <option value={10}>It was good (10%)</option>
                <option value={20}>Amazing (20%)</option>
            </select>
        </div>
    )
}

Tip.propTypes = {
    tip: PropTypes.number.isRequired,
    onTip: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
}

export default Tip