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

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  const filteredAnimals = [];
  ids.forEach(id => filteredAnimals.push(...animals.filter(animal => animal.id === id)));
  return filteredAnimals;
}

function animalsOlderThan(animal, idade) {
  const { residents } = data.animals.find(({ name }) => name === animal);
  return residents.every(({ age }) => age > idade);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.find(item => item === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    const output = {};
    data.animals.forEach(function (el) {
      if (!output[el.name]) output[el.name] = el.residents.length;
    });
    return output;
  }
  const countSpecie = data.animals.find(animal => animal.name === species);
  return countSpecie.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  if (entrants.length === 0) return 0;
  return Object.keys(entrants).reduce((acc, cur) => acc + (entrants[cur] * data.prices[cur]), 0);
}

function animalMap(options) {

}

function schedule(dayName) {
  const scheduleHours = Object.assign({}, hours);
  Object.keys(scheduleHours).forEach((day) => {
    const open = scheduleHours[day].open;
    const close = scheduleHours[day].close;

    if (open === 0 || close === 0) scheduleHours[day] = 'CLOSED';
    else scheduleHours[day] = `Open from ${open}am until ${close - 12}pm`;
  });
  if (!dayName) return scheduleHours;
  return {
    [dayName]: scheduleHours[dayName],
  };
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(item => item.id === id);
  const firstSpecie = data.animals.find(item => item.id === employee.responsibleFor[0]);
  const animalsAges = firstSpecie.residents.map(({ age }) => age).sort((a, b) => a - b);
  const oldestInfo = firstSpecie.residents
    .filter(item => item.age === animalsAges[animalsAges.length - 1]);
  const oldestInfoArray = Object.values(oldestInfo[0]);
  return oldestInfoArray;
}

function increasePrices(percentage) {
  const chavesPrices = Object.keys(prices);
  chavesPrices.forEach((key) => {
    prices[key] = Math.round((prices[key] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
  });
  return prices;
}

function employeeCoverage(idOrName) {

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
