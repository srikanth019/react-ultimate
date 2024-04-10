import React, { useState } from 'react'
import { Logo } from './components/Logo'
import { Form } from './components/Form'
import { Stats } from './components/Stats'
import { PackingList } from './components/PackingList'
// Initial static VAlues
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Shoes", quantity: 12, packed: true },
//   { id: 4, description: "Cloths", quantity: 12, packed: true },
// ];

function App () {
  const [items, setItems] = useState([])
  function AddItems (item) {
    setItems((prevItems) => [...prevItems, item])
  }

  function removeItem (id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  function toggleItem (id) {
    setItems((prevItems) => prevItems.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed }
      }
      return item
    }))
  }

  function clearItems () {
    const confirmed = window.confirm('Are you sure you want to delete all items.!!')
    if (confirmed) setItems([])
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={AddItems} />
      <PackingList
        items={items}
        OnDeleteItem={removeItem}
        onToggleItem={toggleItem}
        onClearItems={clearItems}
      />
      <Stats items={items} />
    </div>
  )
}


export default App