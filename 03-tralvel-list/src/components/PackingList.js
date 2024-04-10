import React, { useState } from 'react';
import { Item } from './Item';
import PropTypes from 'prop-types';


export function PackingList ({ items, OnDeleteItem, onToggleItem, onClearItems }) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems;

    if (sortBy === "input") sortedItems = items;

    if (sortBy === "description") {
        sortedItems = items.slice().sort((a, b) => {
            return a.description.localeCompare(b.description);
        });
    }

    if (sortBy === "packed") {
        sortedItems = items.slice().sort((a, b) => {
            return Number(a.packed) - Number(b.packed);
        });
    }

    return <div className='list'>
        <ul>
            {sortedItems.map((item) => (
                <Item item={item} OnDeleteItem={OnDeleteItem} onToggleItem={onToggleItem} key={item.id} />
            ))}
        </ul>
        <div className='actions'>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="input">Sort by Input Order</option>
                <option value="description"> Sort by description</option>
                <option value="packed">Sort by packed status</option>
            </select>
            <button onClick={() => onClearItems()}>Clear Items</button>
        </div>
    </div>;
}


PackingList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        packed: PropTypes.bool.isRequired,
    })).isRequired,
    OnDeleteItem: PropTypes.func.isRequired,
    onToggleItem: PropTypes.func.isRequired,
    onClearItems: PropTypes.func.isRequired,
}