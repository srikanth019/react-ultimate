import { useEffect, useState } from 'react'

export function useLocalStorageState (initialState, key) {
    const [value, setValue] = useState(() => {
        const data = JSON.parse(localStorage.getItem(key))
        return data || initialState
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    },
        [value, key]
    )
    return [value, setValue]
}
