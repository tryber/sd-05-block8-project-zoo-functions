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
// forEach, map, reduce, filter, every, some, sort, find
// spread operator, rest param, destructuring, default param, abbreviation

const data = require('./data');

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const selectedAnimal = animals.find(element => element.name === animal);
  const { residents } = selectedAnimal;
  return residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(employee =>
  employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    const allAnimals = {};
    animals.forEach((animal) => {
      allAnimals[animal.name] = animal.residents.length;
    });
    return allAnimals;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;

  const pricesArray = Object.entries(prices);

  return pricesArray.reduce(
    (sum, ageGroup) => sum + (ageGroup[1] * entrants[ageGroup[0]]),
    0);
}

function animalMap(options) {}

function schedule(dayName) {
  const cronograma = Object.entries(hours).reduce((obj, day) => {
    if (day[1].open === day[1].close) {
      obj[day[0]] = 'CLOSED';
    } else {
      obj[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    }
    return obj;
  }, {});

  if (!dayName) return cronograma;

  const singleDay = {};
  singleDay[dayName] = cronograma[dayName];

  return singleDay;
}

function oldestFromFirstSpecies(id) {
  const employeeByID = employees.find(employee => employee.id === id);
  const responsibleFor = employeeByID.responsibleFor[0];
  const species = animals.find(animal => animal.id === responsibleFor);
  const residents = species.residents;
  residents.sort((a, b) => (a.age > b.age ? -1 : 1));
  return Object.values(residents[0]);
}

function increasePrices(percentage) {
  return Object.keys(prices).forEach((key) => {
    prices[key] =
      Math.round(((prices[key] + (prices[key] * (percentage / 100))) * 100)) / 100;
  });
}

function employeeCoverage(idOrName) {
  const responsibleFor = employees.reduce((obj, employee) => {
    obj[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map(animalID => animals.find(animal => animal.id === animalID).name,
    );
    return obj;
  }, {});

  if (!idOrName) return responsibleFor;

  const responsibleEmployee = employees.find(employee => employee.id === idOrName
  || employee.firstName === idOrName || employee.lastName === idOrName);
  return { [`${responsibleEmployee.firstName} ${responsibleEmployee.lastName}`]:
  responsibleFor[`${responsibleEmployee.firstName} ${responsibleEmployee.lastName}`] };
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
