const uuid = function() {
  return new Date().getTime();
};

const pluralize = function(count, word) {
  return count < 2 ? word : `${word}s`;
};

const store = function(namespace, data) {
  if (arguments.length > 1) {
    return localStorage.setItem(namespace, JSON.stringify(data));
  } else {
    const store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
  }
};

export { uuid, pluralize, store };
