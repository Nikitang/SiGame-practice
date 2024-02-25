function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  function capitalize(str) {
    const reStr = str.toLowerCase();
    return reStr[0].toUpperCase() + reStr.slice(1);
};

export { randomInteger, capitalize };