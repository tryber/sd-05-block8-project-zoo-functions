/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  const result = [];
  if (ids.length === 0) return result;
  const { animals } = data;
  animals.forEach((animal) => {
    ids.forEach((id) => {
      if (id === animal.id) result.push(animal);
    });
  });
  return result;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.filter(({ name }) => name === animal)[0]
  .residents
  .every(({ age: idade }) => idade >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const { employees } = data;
  return employees.filter(({ firstName, lastName }) => (
    firstName === employeeName || lastName === employeeName
  ))[0];
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.indexOf(id) !== -1);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const { animals } = data;
  const result = {};
  if (species) return animals.find(({ name }) => name === species).residents.length;
  animals.map(({ name, residents }) => [name, residents.length])
  .forEach(({ 0: name, 1: length }) => {
    result[name] = length;
  });
  return result;
}

function entryCalculator(entrants = {}) {
  if (Object.entries(entrants).length === 0) return 0;
  const { prices } = data;
  let total = 0;
  Object.entries(prices).forEach(({ 0: key, 1: price }) => {
    total += entrants[key] * price;
  });
  return total;
}

function animalMap(options = {}) {
  const { animals } = data;
  const result = {};
  if (Object.prototype.hasOwnProperty.call(options, 'sex') && options.includeNames) {
    animals.forEach(({ residents }, i) => {
      animals[i].residents = residents.filter(({ sex }) => sex === options.sex);
    });
  }
  animals.forEach(({ location, name, residents }) => {
    if (Object.prototype.hasOwnProperty.call(options, 'includeNames') && options.includeNames) {
      const animal = {};
      animal[name] = residents.map(({ name: nome }) => nome);

      if (!Array.isArray(result[location])) result[location] = [];
      result[location].push(animal);

      if (Object.prototype.hasOwnProperty.call(options, 'sorted') && options.sorted) {
        result[location].forEach((anim) => {
          if (anim[name]) anim[name] = anim[name].sort();
        });
      }
    } else {
      if (!Array.isArray(result[location])) result[location] = [];
      result[location].push(name);
    }
  });
  return result;
}

function schedule(dayName) {
  const { hours } = data;
  const result = {};

  Object.entries(hours).forEach(({ 0: key, 1: value }) => {
    const { open, close } = value;
    if ((dayName && dayName === key) || !dayName) {
      result[key] = (open === 0 && close === 0) ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`;
    }
  });
  return result;
}

function oldestFromFirstSpecies(id) {
  const { employees } = data;
  const { animals } = data;

  const animId = employees.filter(({ id: ident }) => ident === id)[0]
  .responsibleFor[0];

  const result = animals.filter(({ id: ident }) => ident === animId)[0]
  .residents
  .sort((a, b) => b.age - a.age)[0];

  return Object.values(result);
}

function increasePrices(percentage) {
  const { prices } = data;
  Object.keys(prices).forEach((key) => {
    prices[key] *= (percentage / 100) + 1;
    prices[key] = (Math.floor(Number((prices[key]) * 100) + 1) / 100).toFixed(2);
  });
}

function employeeCoverage(idOrName) {
  let { employees } = data;
  const { animals } = data;
  const result = {};

  if (idOrName) {
    employees = employees.filter(({ id, firstName, lastName }) => (
      id === idOrName || firstName === idOrName || lastName === idOrName
    ));
  }

  employees.forEach(({ firstName, lastName, responsibleFor }) => (
    result[`${firstName} ${lastName}`] = responsibleFor.map(id => (
      animals.filter(({ id: animId }) => (animId === id))[0].name
    ))
  ));
  return result;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
