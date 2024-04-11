import React from 'react'
import PropTypes from 'prop-types';


function BillInput ({ bill, onBill }) {
    return (
        <div>
            <span>How much was the bill?</span>
            <input
                type="number"
                value={bill}
                onChange={(e) => onBill(Number(e.target.value))}
            />
        </div>
    )
}

BillInput.propTypes = {
    bill: PropTypes.number.isRequired,
    onBill: PropTypes.func.isRequired,
};

export default BillInput