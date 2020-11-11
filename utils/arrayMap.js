export const arrayMap = array => {
  return array.reduce((current, data) => {
    return current.concat(data);
  }, []);
};
