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
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter(animal => ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return animals.find(x => x.name === animal).residents.every(y => y.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const firstEmployee = data.employees.find(element => element.firstName === employeeName);
  const secondEmployee = data.employees.find(element => element.lastName === employeeName);
  return (firstEmployee || secondEmployee);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employ => id === employ.managers.find(item => item === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const Obj = {};
  animals.forEach(animal => (Obj[animal.name] = animal.residents.length));
  return species ? animals.find(animal => animal.name === species).residents.length : Obj;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  const { Adult, Child, Senior } = entrants;
  const totalValue = (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
  return totalValue;
}

function animalMap(options = {}) {
  // seu código aqui
}

function schedule(dayName) {
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
  const animId = employees.filter(({ id: identity }) => identity === id)[0].responsibleFor[0];
  const result = animals.filter(({ id: identity }) => identity === animId)[0]
  .residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(result);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    prices[key] *= (percentage / 100) + 1;
    prices[key] = (Math.floor(Number((prices[key]) * 100) + 1) / 100).toFixed(2);
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui
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
