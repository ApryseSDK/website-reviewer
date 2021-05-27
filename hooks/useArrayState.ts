import { useCallback } from 'react';
import { useState, useMemo } from 'react';

export default function useArrayState<T>() {

  const [items, setItems] = useState<T[]>([]);

  const push = useCallback((item: T) => {
    setItems((old) => {
      const clone = [...old];
      clone.push(item);
      return clone;
    })
  }, []);

  const replaceItem = useCallback((find: (item: T) => boolean, replaceWith: T) => {
    setItems((old) => {
      const clone = [...old];
      const index = clone.findIndex(find);
      if (index > -1) {
        clone[index] = replaceWith;
      } else {
        clone.push(replaceWith)
      }
      return clone;
    })
  }, [])

  const sort = useCallback((fn: (item1: T, item2: T) => number) => {
    setItems((old) => {
      const clone = [...old];
      clone.sort(fn)
      return clone;
    })
  }, [])

  return useMemo(() => ({
    items,
    push,
    setItems,
    replaceItem,
    sort
  }), [items, push])

}