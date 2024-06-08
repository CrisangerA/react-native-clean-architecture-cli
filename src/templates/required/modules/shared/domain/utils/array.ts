export function groupBy<T>(list: T[], keyGetter: (v: T) => string) {
  const map = new Map<string, T[]>();
  list.forEach((item) => {
    const _key = keyGetter(item);
    const collection = map.get(_key);
    if (!collection) {
      map.set(_key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function sortBy<T>(
  key: keyof T,
  arr: T[],
  sort: 'asc' | 'desc' = 'asc',
) {
  return arr.sort((a, b) =>
    a[key as keyof T] < b[key as keyof T]
      ? sort === 'asc'
        ? -1
        : 1
      : a[key as keyof T] > b[key as keyof T]
        ? sort === 'asc'
          ? 1
          : -1
        : 0,
  );
}

/**
 * The function "aggregate" takes an array and an item, and returns a new array
 * with the item appended to the end.
 * @param {T[]} arr - An array of type T, which is the type of elements in the
 * array.
 * @param {T} item - The `item` parameter is of type `T`, which means it can be any
 * type. It represents the item that you want to add to the array.
 * @returns a new array that includes all the elements from the original array
 * `arr` and the `item` that is passed as an argument.
 */
export function aggregate<T>(arr: T[], item: T) {
  return [...arr, item];
}

/**
 * The `update` function takes an array and an item, and returns a new array with
 * the item replaced wherever it occurs in the original array.
 * @param {T[]} arr - An array of elements of type T.
 * @param {T} item - The `item` parameter is the element that you want to update in
 * the array.
 * @returns a new array where the item passed as an argument is replaced with the
 * same item.
 */
export function update<T>(arr: T[], key: any, item: T) {
  return arr.map((i) =>
    i[key as keyof T] === item[key as keyof T] ? item : i,
  );
}

/**
 * The `remove` function filters an array of objects based on a specified key-value
 * pair.
 * @param {T[]} array - The `array` parameter is an array of elements of type `T`.
 * @param {any} key - The `key` parameter is the property name of the objects in
 * the array that you want to check for a specific value.
 * @param {any} value - The `value` parameter is the value that you want to remove
 * from the array.
 * @returns The `remove` function returns a new array that contains all the
 * elements from the original array except for the elements that have a specific
 * value for a specific key.
 */
export function remove<T>(array: T[], key: any, value: any) {
  return array.filter((i) => i[key as keyof T] !== value);
}