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
  if (ids.length === 0) {
    return [];
  }

  const animais = ids.map(variavelTemp =>
    animals.find(animal => animal.id === variavelTemp));
  return animais;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(valor => valor.name === animal).residents.every(valor2 => valor2.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(funcionario => funcionario.firstName === employeeName ||
  funcionario.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  return employees.some(valor => valor.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const funcionario = Object.assign({ }, { id }, { firstName },
  { lastName }, { managers }, { responsibleFor });
  employees.push(funcionario);
}

function animalCount(species) {
  // seu código aqui
  const retornaObjeto = {};
  animals.forEach(valor => (retornaObjeto[valor.name] = valor.residents.length));
  if (species === undefined) {
    return retornaObjeto;
  }
  return retornaObjeto[species];
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants) === 0) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  let total = Adult * prices.Adult;
  total += Child * prices.Child;
  total += Senior * prices.Senior;
  return total;
}

function animalMap(options) {
  // seu código aqui

}

function schedule(dayName) {
  // seu código aqui
  const crono = Object.assign({}, hours);
  const dias = Object.keys(crono);
  dias.forEach((dia) => {
    crono[dia] = `Open from ${crono[dia].open}am until ${crono[dia].close - 12}pm`;
    if (dia === 'Monday') crono[dia] = 'CLOSED';
  });
  if (dayName === undefined) {
    return crono;
  }
  const saida = {};
  saida[dayName] = crono[dayName];
  return saida;
}

function oldestFromFirstSpecies(idProcurado) {
  // seu código aqui
  const idAnimal = employees.find(pessoa => pessoa.id === idProcurado).responsibleFor[0];
  const { age, name, sex } =
  animals.find(animal => animal.id === idAnimal).residents.sort((a, b) => b.age - a.age)[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const porcentagem = (percentage / 100) + 1;
  prices.Adult = (Math.round(prices.Adult * porcentagem * 100) / 100);
  prices.Senior = (Math.round(prices.Senior * porcentagem * 100) / 100);
  prices.Child = (Math.round(prices.Child * porcentagem * 100) / 100);
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const objSaida = {};
  if (idOrName === undefined) {
    employees.forEach((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      const arrayAnimal = animalsByIds(...employee.responsibleFor);
      arrayAnimal.forEach((animal, index, arr) => (arr[index] = animal.name));
      objSaida[fullName] = arrayAnimal;
    });
  } else {
    const pessoa = employees.find(employee => employee.id === idOrName ||
        employee.firstName === idOrName || employee.lastName === idOrName);
    const fullName = `${pessoa.firstName} ${pessoa.lastName}`;
    const arrayAnimal = animalsByIds(...pessoa.responsibleFor);
    arrayAnimal.forEach((animal, index, arr) => (arr[index] = animal.name));
    objSaida[fullName] = arrayAnimal;
  }
  return objSaida;
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
