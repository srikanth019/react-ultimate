import React, { useEffect } from 'react'
import PropTypes from "prop-types"


function Timer ({ secondsRemaining, dispatch }) {

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: "timer" })
        }, 1000); // Run the interval every second (1000 milliseconds)

        return () => clearInterval(interval); // Cleanup function to clear interval on unmount
    }, [dispatch]);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const remainingSeconds = secondsRemaining % 60;

    // Format hours, minutes, and seconds with leading zeros if necessary
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return (
        <div className='timer'>Timer: {formattedHours}:{formattedMinutes}:{formattedSeconds}</div>
    )
}

Timer.propTypes = {
    secondsRemaining: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default Timer