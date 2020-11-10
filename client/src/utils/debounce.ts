export const debounce = (
  func: () => void,
  wait: number,
  immediate = false,
  args: any = {}
) => {
  let timeout: number | undefined;
  return () => {
    const context = this;
    const callNow = immediate && !timeout;
    const later = () => {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};
