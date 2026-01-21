import { useState, useEffect } from 'react';

/**
 * A hook that persists state to localStorage.
 * @param {string} key - The localStorage key.
 * @param {any} initialValue - The initial value to use if no value is found in localStorage.
 */
const useLocalStorage = (key, initialValue) => {
    // 1. Get from local storage then parse stored json or return initialValue
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // 2. Return a wrapped version of useState's setter function that persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
