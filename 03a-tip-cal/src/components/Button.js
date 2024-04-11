import React from 'react'

function Button ({ clearBill, clearTip }) {
    function clearInput () {
        clearBill()
        clearTip()
    }
    return (
        <button onClick={() => clearInput()}>Reset</button>
    )
}

export default Button