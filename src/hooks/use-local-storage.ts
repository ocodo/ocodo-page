import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue != undefined) {
        return JSON.parse(storedValue)
      } else {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue
      }

    } catch (error) {
      console.error(error);
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const saveToLocalStorage = (newValue: any) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, saveToLocalStorage];
};

export { useLocalStorage }
