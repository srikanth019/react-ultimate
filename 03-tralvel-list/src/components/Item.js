import React from 'react';
import PropTypes from 'prop-types';

export function Item ({ item, OnDeleteItem, onToggleItem }) {
    return (
        <li>
            <input
                type="checkbox"
                name="checkbox"
                checked={item.packed}
                onChange={() => onToggleItem(item.id)} />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}
            </span>
            <button onClick={() => OnDeleteItem(item.id)}>❌</button>
        </li>
    );
}

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        packed: PropTypes.bool.isRequired,
    }).isRequired,
    OnDeleteItem: PropTypes.func.isRequired,
    onToggleItem: PropTypes.func.isRequired,
};
