import { useEffect } from 'react'

export function useKey (key, action) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === key) {
                action();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        // Cleanup function to remove event listener when component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    },
        [key, action]
    );

}
