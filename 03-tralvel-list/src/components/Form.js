import React, { useState } from 'react';
import PropTypes from 'prop-types';


export function Form ({ onAddItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit (e) {
        e.preventDefault();
        if (!description) return;
        const newItem = { description, quantity, packed: false, id: Date.now() };
        onAddItem(newItem);
        setDescription("");
        setQuantity(1);
    }

    return (
        <form className='add-form' onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from(Array(20).keys(), x => x + 1).map(number => (
                    <option value={number} key={number}>
                        {number}
                    </option>
                ))}
            </select>
            <input
                placeholder='Item ...'
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            <button type='submit'>Add</button>
        </form>
    );
}

Form.propTypes = {
    onAddItem: PropTypes.func.isRequired,
}