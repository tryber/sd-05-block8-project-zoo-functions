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

// console.log(animals)

function animalsByIds(...ids) {
  // seu código aqui
  const getanimals = [];

  ids.forEach(cadaId => getanimals.push(animals.find(animal => animal.id === cadaId)));

  return getanimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const findanimal = animals.find(bichos => bichos.name === animal);
  const maisvelho = findanimal.residents.every(bichano => bichano.age > age);
  return maisvelho;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  const cara = employees.find(caras =>
    caras.firstName === employeeName || caras.lastName === employeeName);
  return cara;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(todos => todos.managers
    .find(numeros => numeros === id) === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const empregado = { id, firstName, lastName, managers, responsibleFor };
  employees.push(empregado);
}

function animalCount(species) {
  // seu código aqui
  const bicho = animals.find(bichos => bichos.name === species);

  const bichostudo = animals.reduce((acc, { residents, name }) => {
    acc[name] = residents.length;
    return acc;
  }, {});

  return species ? bicho.residents.length : bichostudo;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }
  const total = Object.keys(prices).reduce(
    (acc, tipo) => acc + (prices[tipo] * entrants[tipo]), 0);

  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const agenda = {};
  Object.keys(hours).forEach((dia) => {
    if (dia === 'Monday') agenda[dia] = 'CLOSED';
    else agenda[dia] = `Open from ${hours[dia].open}am until ${hours[dia].close - 12}pm`;
  });

  return dayName ? { [dayName]: agenda[dayName] } : agenda;
}
// const bicho = animals.find( bicho => bicho.id === '0938aa23-f153-4937-9f88-4858b24d6bce')
// console.log(bicho.residents)

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const firstbicho = employees.find(caras => caras.id === id).responsibleFor[0];

  const residentes = animals.find(bicho => bicho.id === firstbicho).residents;

  const velho = residentes.sort(function (a, b) {
    return b.age - a.age;
  })[0];

  const { name, sex, age } = velho;

  return [name, sex, age];
}

// const newPrices = {};
// newPrices.Adult = Math.round(prices.Adult*1.5*100)/100;
// console.log(newPrices)

function increasePrices(percentage) {
  // seu código aqui
  prices.Adult = Math.round(prices.Adult * (1 + (percentage / 100)) * 100) / 100;
  prices.Senior = Math.round(prices.Senior * (1 + (percentage / 100)) * 100) / 100;
  prices.Child = Math.round(prices.Child * (1 + (percentage / 100)) * 100) / 100;

  return prices;
}

// const combo = {};
//   employees.forEach(funcionario => {
//     const nome = `${funcionario.firstName} ${funcionario.lastName}`;
//     combo[nome] = funcionario.responsibleFor
//     .map(id => animals.find(bich => bich.id === id).name);
//   });
// console.log(combo)

function employeeCoverage(idOrName) {
  // seu código aqui
  // achar com id e nome
  if (idOrName !== undefined) {
    const trabalhador = employees
      .find(c => c.id === idOrName || c.firstName === idOrName || c.lastName === idOrName);
    const naming = `${trabalhador.firstName} ${trabalhador.lastName}`;
    const colabrespon = trabalhador.responsibleFor;
    const respor = colabrespon.map(id => animals.find(bicho => bicho.id === id).name);
    const resultado = {};
    resultado[naming] = respor;
    return resultado;
  }

  // combo de todos:
  const combo = {};
  employees.forEach((funcionario) => {
    const nome = `${funcionario.firstName} ${funcionario.lastName}`;
    combo[nome] = funcionario.responsibleFor
    .map(id => animals.find(bich => bich.id === id).name);
  });
  return combo;
  // // achar com primeiro nome ou com sobrenome
  // const trabalhador = employees
  // .find(trabalhador => trabalhador.firstName === idOrName ||trabalhador.lastName === idOrName)
  // .responsibleFor;
  // const bichosdotrabalhador = trabalhador.forEach(id => id === animals
  //   .find(bicho => bicho.id === id).name);
  // idOrName !== undefined ? responsavelpor : combo;
  // if(typeof idOrName === Number){return responsavelpor}
  // else if (typeof idOrName === String){return bichosdotrabalhador}
  // return combo;
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
