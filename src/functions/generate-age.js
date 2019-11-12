export const getAgeWord = age => {
  const str = String(age);
  if (age < 10 || age > 20) {
    switch (str.slice(-1)) {
      case "1":
        return "год";

      case "2":
      case "3":
      case "4":
        return "года";

      default:
        return "лет";
    }
  }
  return "лет";
};

export const getAgesOptions = (from = 1, to = 10, initialOptions = []) => {
  return [...Array(to)].reduce((acc, _, i) => {
    const age = i + 1;
    return age < from
      ? acc
      : [...acc, { id: age, value: age, text: `${age} ${getAgeWord(age)}` }];
  }, initialOptions);
};
