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
const { employees, prices, animals } = require('./data');

function animalsByIds(...ids) {
  const newArr = [];
  ids.forEach(id => newArr.push(animals.find(animais => animais.id === id)));
  return newArr;
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animais => animais.name === animal)
    .residents.every(residents => residents.age > age);
}

function employeeByName(employeeName) {
  const nameVerify = employees.find(
    ({ firstName, lastName }) =>
      firstName === employeeName || lastName === employeeName,
  );
  return nameVerify || {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const pessoais = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return pessoais;
}

function isManager(id) {
  const verifyRole = data.employees.some(role => role.managers.includes(id));
  return verifyRole;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const name = {};
    animals.forEach(animal => (name[animal.name] = animal.residents.length));
    return name;
  }
  const tamanhoDaEspecie = animals.find(animal => animal.name === species)
    .residents.length;
  return tamanhoDaEspecie;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }

  const { Adult, Child, Senior } = entrants;
  const entradas =
    (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
  return entradas;
}

function animalMap(options) {
  // seu código aqui
}

const weekDays = data.hours;
Object.keys(weekDays).forEach((day) => {
  weekDays[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
});
weekDays.Monday = 'CLOSED';

function schedule(dayName) {
  if (dayName) return { [dayName]: weekDays[dayName] };
  return weekDays;
}

function oldestFromFirstSpecies(id) {
  // passado o id de um funcionário, encontra a primeira espécie de animal
  const funcionario = employees.find(empregado => empregado.id === id)
    .responsibleFor[0];
  // e retorna um array com nome, sexo e idade do animal mais velho dessa espécie
  const newOlderAnimal = animals
    .find(animal => animal.id === funcionario)
    .residents.reduce((acc, cur) => (acc.age > cur.age ? acc : cur));
  const newArr = [newOlderAnimal.name, newOlderAnimal.sex, newOlderAnimal.age];
  return newArr;
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  const calc = percentage / 100;
  prices.Adult = Math.round(Adult * (calc + 1) * 100) / 100;
  prices.Senior = Math.round(Senior * (calc + 1) * 100) / 100;
  prices.Child = Math.round(Child * (calc + 1) * 100) / 100;
  return prices;
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
