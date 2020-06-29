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
  const list = [];
  ids.forEach(loop => list.push(...animals.filter(animalID => animalID.id === loop)));
  return list;
}

function animalsOlderThan(animal, age) {
  const filterSpecies = animals.find(element => element.name === animal);
  const ageVerify = filterSpecies.residents.every(element => element.age >= age);
  return ageVerify;
}


function employeeByName(employeeName) {
  const output = {};
  if (!employeeName) return output;
  return employees.filter(element =>
    element.firstName === employeeName ||
    element.lastName === employeeName)[0];
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const names = animals.map(element => element.name);
  const counter = animals.map(element => element.residents.length);
  const obj = {};
  names.forEach((name, i) => (obj[`${name}`] = counter[i]));
  if (!species) return obj;
  return (animals.filter(element => element.name === species)
    .map(element => element.residents.length))[0];
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  if (Object.entries(entrants).length === 0) return 0;
  const output = Object.keys(prices);
  return output.reduce((base, age) => base + (entrants[age] * prices[age]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const allDays = Object.keys(hours);
  const verifyCronogram = {};
  allDays.forEach((day) => {
    if (day !== 'Monday') {
      verifyCronogram[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      verifyCronogram[day] = 'CLOSED';
    }
  });
  if (!dayName) return verifyCronogram;
  return { [dayName]: verifyCronogram[dayName] };
}

function oldestFromFirstSpecies(id) {
  const idResponsibleFor = employees.find(element => element.id === id).responsibleFor[0];
  const findAnimals = animals.find(element => element.id === idResponsibleFor).residents;
  const ageSort = Object.values(findAnimals).map(element => element.age).sort((a, b) => b - a)[0];
  const output = findAnimals.filter(element => element.age === ageSort);
  return Object.values(output[0]);
}

function increasePrices(percentage) {
  const names = Object.keys(prices);
  names.forEach((element) => {
    prices[element] =
      Math.round((prices[element] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
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
