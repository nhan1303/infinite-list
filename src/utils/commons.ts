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
