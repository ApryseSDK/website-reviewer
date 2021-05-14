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
  }, [])

  return useMemo(() => ({
    items,
    push,
    setItems
  }), [items, push])

}