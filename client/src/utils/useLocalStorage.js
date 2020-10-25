import { useState, useEffect } from 'react';

function getSavedValue(key, initialVaue) {
  const savedValue = JSON.parse(localStorage.getItem(key));

  if (savedValue) return savedValue;

  if (initialVaue instanceof Function) return initialVaue();

  if (initialVaue instanceof Object) return { initialVaue };
  return initialVaue;
}

export default function useLocalStorage(key, initialVaue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialVaue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
