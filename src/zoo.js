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
  // seu código aqui
  const enimal = [];
  ids.forEach(identidade =>
    enimal.push(...animals.filter(animal => animal.id === identidade)));
  return enimal;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const especies = animals.find(enimal => enimal.name === animal);
  const ageless = especies.residents.every(todos => todos.age >= age);
  return ageless;
}
// console.log(animalsOlderThan('lions', 5));
function employeeByName(employeeName) {
  // seu código aqui
  const funcionarios = employees.find(ser => ser.firstName === employeeName ||
    ser.lastName === employeeName);
  return funcionarios || {};
}
// console.log(employeeByName('Nelson'));
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}
// console.log(createEmployee('asdas', 'asdasd'));
function isManager(id) {
  // seu código aqui
  const gerente = employees.some(cargo => cargo.managers.find(ids => ids === id));
  return gerente;
}
// console.log(isManager('9e7d4524-363c-416a-8759-8aa7e50c0992'));
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({
    id, firstName, lastName, managers, responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  const noParam = {};
  if (species === undefined) {
    animals.forEach((spec) => {
      const nome = spec.name;
      const value = spec.residents.length;
      noParam[nome] = value;
    });
    return noParam;
  }
  return animals.find(spec => spec.name === species).residents.length;
}
// console.log(animalCount());
function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.entries(entrants).length === 0) return 0;

  const money = Object.keys(prices);
  const total = (price, ticket) => price + (prices[ticket] * entrants[ticket]);

  return money.reduce(total, 0);
}
// console.log(entryCalculator());
function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  let obj = {};
  Object.entries(hours).forEach((day) => {
    if (day[1].open === day[1].close) {
      obj[day[0]] = 'CLOSED';
    } else {
      obj[day[0]] = `Open from ${day[1].open}am until ${(((day[1].close + 11) % 12) + 1)}pm`;
    }
  });
  if (dayName) {
    const diaSelecionado = Object.entries(obj).find(e => e[0] === dayName);
    obj = {};
    obj[diaSelecionado[0]] = diaSelecionado[1];
  }
  return obj;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const funcionario = employees.find(employ => employ.id === id);
  const enimal = animals.find(animal => animal.id === funcionario.responsibleFor[0]);
  const maisVelho = (older, animal) => (animal.age > older ? animal.age : older);
  const idoso = enimal.residents.reduce(maisVelho, 0);
  const oldestAnimal = enimal.residents.find(oldest => oldest.age === idoso);
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const { Adult: adulto, Senior: idoso, Child: pentelho } = prices;

  const aumento = {
    Adult: Math.round((adulto * 100) * (1 + (percentage / 100))).toFixed(2) / 100,
    Senior: Math.round((idoso * 100) * (1 + (percentage / 100))).toFixed(2) / 100,
    Child: Math.round((pentelho * 100) * (1 + (percentage / 100))).toFixed(2) / 100,
  };

  return Object.assign(prices, aumento);
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
