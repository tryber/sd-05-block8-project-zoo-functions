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

function animalsByIds(...parametro) {
  if (parametro.length === 0) return [];
  return animals.filter(e => parametro.includes(e.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const findSpecies = animals.find(e => e.name === animal);
  return findSpecies.residents.every(el => el.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(e => employeeName === e.firstName || employeeName === e.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  return employees.some(e => e.managers.find(ids => ids === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(employee);
  return employee;
}

function animalCount(species) {
  // seu código aqui
  const allAnimals = {};
  if (species === undefined) {
    for (let n = 0; n < animals.length; n += 1) {
      allAnimals[animals[n].name] = animals[n].residents.length;
    }
    return allAnimals;
  }
  const resultado = animals.find(encontrar => encontrar.name === species).residents.length;
  return resultado;
}

function entryCalculator(...entrants) {
  // seu código aqui
  if (entrants.length === 0) return 0;

  if (Object.keys(entrants[0]).length === 0) return 0;

  const { Adult = 0, Child = 0, Senior = 0 } = entrants[0];
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const allDays = Object.keys(hours);
  const thisDay = {};
  allDays.forEach((day) => {
    if (day !== 'Monday') {
      thisDay[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      thisDay[day] = 'CLOSED';
    }
  });
  if (dayName === undefined) {
    return thisDay;
  }
  return ({ [dayName]: thisDay[dayName] });
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const emp = employees.find(employ => employ.id === id);
  const idAnimal = animals.find(animal => animal.id === emp.responsibleFor[0]);
  const findOlder = (older, animal) => (animal.age > older ? animal.age : older);
  const old = idAnimal.residents.reduce(findOlder, 0);
  const resultado = idAnimal.residents.find(oldest => oldest.age === old);
  return [resultado.name, resultado.sex, resultado.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const result = prices;
  const { Adult, Senior, Child } = result;
  result.Adult = Math.round(Adult * (1 + (percentage / 100)) * 100) / 100;
  result.Senior = Math.round(Senior * (1 + (percentage / 100)) * 100) / 100;
  result.Child = Math.round(Child * (1 + (percentage / 100)) * 100) / 100;
  return result;
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
