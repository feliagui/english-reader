import { useState } from 'react';

let favorites = [];

export function useFavorites() {
  const [list, setList] = useState(favorites);

  const addFavorite = (item) => {
    favorites.push(item);
    setList([...favorites]);
  };

  return { favorites: list, addFavorite };
}
