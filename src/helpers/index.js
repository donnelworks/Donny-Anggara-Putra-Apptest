const initial = str => {
  const first = str.charAt(0).toUpperCase();
  const second = str.charAt(1).toUpperCase();
  return first + second;
};

export {initial};
