import React from 'react';

export function Stats ({ items }) {
    if (!items.length) {
        return <footer className='stats'>
            <em>Start adding items to your packing list 🚀</em>
        </footer>;
    }
    const numItems = items.length;
    const packedItems = items.reduce((acc, curr) => acc + (curr.packed ? 1 : 0), 0);
    const packedPercent = Math.round((packedItems / numItems) * 100);
    console.log(packedPercent);
    return (
        <footer
            className='stats'
            style={packedPercent === 100 ?
                { backgroundColor: "#88f21d" } :
                { backgroundColor: "#5ae8c0" }}
        >
            <em>
                {packedPercent === 100 ? "You got everything! Ready to go 🛫" :
                    `You have ${numItems} items on your list. And you already packed ${packedItems} (${packedPercent}%)`}
            </em>
        </footer>
    );
}
