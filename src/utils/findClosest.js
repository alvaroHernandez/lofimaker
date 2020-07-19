export const findClosest = function findClosest(values, value) {
  let result, lastDelta;
  values.some(function (item) {
    const delta = Math.abs(value - item);

    if (delta >= lastDelta) {
      return true;
    }

    result = item;
    lastDelta = delta;
  });
  return result;
};
