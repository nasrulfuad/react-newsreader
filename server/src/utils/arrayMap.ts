export const arrayMap = (array: any[]) => {
  return array.reduce((current, data) => {
    return current.concat(data);
  }, []);
};
