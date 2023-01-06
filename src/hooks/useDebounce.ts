import * as React from 'react';

export default function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebounceValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}
