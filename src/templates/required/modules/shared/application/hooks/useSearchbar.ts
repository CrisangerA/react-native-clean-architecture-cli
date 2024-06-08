import React from 'react';

interface Params<T> {
  arr: T[];
  key: string;
}

/**
 * La función `useSearchbar` permite filtrar un array
 * basado en una clave especificada y la entrada de texto de búsqueda.
 * @param - la función `useSearchbar` es un hook personalizado que toma
 * un array `arr` y una clave `key` como parámetros. La función devuelve un
 * objeto con tres propiedades:
 * @returns La función `useSearchbar` devuelve un objeto con tres propiedades:
 * 1. `text`: El valor actual de la entrada de texto de búsqueda.
 * 2. `setText`: Una función para actualizar el valor del texto de búsqueda.
 * 3. `result`: Un array de elementos de la entrada `arr` que coinciden con el texto de búsqueda
 * basado en la `key` especificada.
 */
export function useSearchbar<T = any>({ arr, key }: Params<T>) {
  const [text, setText] = React.useState('');

  const result = React.useMemo(() => {
    return arr.filter((a) =>
      (a as any)[key]?.toUpperCase().includes(text.toUpperCase()),
    );
  }, [arr, key, text]);

  return { text, setText, result };
}
