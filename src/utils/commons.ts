export const debounce = (
  fn: (...args: any[]) => void,
  delay: number
): ((...args: any[]) => void) => {
  let timerId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export const throttle = (
  fn: (...args: any[]) => void,
  delay: number
): ((...args: any[]) => void) => {
  let timerId: NodeJS.Timeout | undefined;
  return (...args: any[]) => {
    if (timerId) return;

    timerId = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timerId);
      timerId = undefined;
    }, delay);
  };
};

export const setupSumHeight = (
  heights: Record<number, number>,
  defaultItemHeight?: number
) => {
  const caches: Record<number, number> = {};

  const sumHeightThunk = (index: number): number => {
    if (Object.values(heights).length === 0) {
      return (index + 1) * (defaultItemHeight || 0);
    }

    if (index < 0) return 0;
    if (index in caches) return caches[index];

    const currentHeight = (heights[index as keyof typeof heights] ||
      0) as number;

    return (caches[index] = currentHeight + sumHeightThunk(index - 1));
  };

  return sumHeightThunk;
};

export const flushPromises = () => {
  return new Promise(setImmediate);
};

export const getTypeOf = (value: any): string =>
  Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
