import { writable } from 'svelte/store';

function persist(key, value) {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
  
      if (storedValue) {
        value = JSON.parse(storedValue);
      }
    }
  
    const store = writable(value);
  
    store.subscribe(($value) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify($value));
      }
    });
  
    return store;
  }

export const active = persist('active', 'code');
export const showSubcategories = persist('showSubcategories', false);
export const isFixed = persist('isFixed', false);