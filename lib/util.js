capitalizeFirstCharacter = (answer) => {
  str = answer.trim();
  let firstChar = answer.charAt(0).toUpperCase();
  let otherChar = answer.slice(1, str.length).toLowerCase();
  answer = `${firstChar}${otherChar}`;
  return answer;
};

lowerCase = (answer) => {
  return answer.trim().toLowerCase();
};

isNumber = (answer) => {
  if (!isNaN(answer)) {
    return true;
  }
  return "Please provide a number (with no letters, commas, periods).";
};

isEmail = (answer) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(answer)) {
    return "Please provide a valid email address!";
  }
  return true;
};

isBlank = (answer, name) => {
  if (!answer || answer.trim() === "") {
    return `Please, provide a ${name}.`;
  }
  return true;
};

module.exports = {
  capitalizeFirstCharacter,
  lowerCase,
  isNumber,
  isEmail,
  isBlank,
};
