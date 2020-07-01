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
  if (ids.length === 0) {
    return [];
  }
  /*
  return = animals.filter(animalAtual => animalAtual.id === ids);
  */
  return ids.map(idAtual => animals.find(animal => animal.id === idAtual));
  // ids [1, 2] -> map -->(idAtual=1)-> objAnimalEncontrado
}

function animalsOlderThan(animal, age) {
  return animals.find(valor => valor.name === animal).residents.every(valor2 => valor2.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(funcionario => funcionario.firstName
=== employeeName || funcionario.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // employee.assign
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(valor => valor.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const funcionario = Object.assign({ }, { id }, { firstName }, { lastName },
{ managers }, { responsibleFor });
  employees.push(funcionario);
}


function animalCount(species) {
  const retornaObjeto = {};
  animals.forEach(animal => (retornaObjeto[animal.name] = animal.residents.length));
  if (species === undefined) {
    return retornaObjeto;
  }
  return retornaObjeto[species];
}

function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  if (Object.entries(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const ingresso = ((prices.Adult * Adult) + (prices.Senior * Senior) + (prices.Child * Child));
  return ingresso;
}

function animalMap(options) {
  // digite sua função aqui.
}

function schedule(dayName) {
  const crono = Object.assign({}, hours);
  const dias = Object.keys(crono);
  dias.forEach((dia) => {
    crono[dia] =
    `Open from ${crono[dia].open}am until ${crono[dia].close - 12}pm`;
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
  const idAnimal = employees.find(pessoa =>
    pessoa.id === idProcurado).responsibleFor[0];
  const animalSenior = animals.find(animal =>
    animal.id === idAnimal).residents.sort((a, b) => b.age - a.age)[0];
  return [animalSenior.name, animalSenior.sex, animalSenior.age];
}

function increasePrices(percentage) {
  const porcentagem = (percentage / 100) + 1;
  // prices.Adult = (Math.round(prices.Adult * porcentagem * 100) / 100);
  prices.Adult = /* arredonda */(Math.round(prices.Adult * porcentagem * 100) / 100);
  prices.Senior = (Math.round(prices.Senior * porcentagem * 100) / 100);
  prices.Child = (Math.round(prices.Child * porcentagem * 100) / 100);
}
/* function arredonda(valor, porcentagem) {
  return (Math.round(valor * porcentagem * 100) / 100);
} */

function employeeCoverage(idOrName) {
  const saida = {};
  if (idOrName === undefined) {
    employees.forEach((pessoa) => {
      const nomeCompleto = `${pessoa.firstName} ${pessoa.lastName}`;
      const arrAnimal = animalsByIds(...pessoa.responsibleFor)
    .map(animal => animal.name);
      saida[nomeCompleto] = arrAnimal;
    });
    return saida;
  }
  const pessoa = employees.find(funcionario => funcionario.id === idOrName ||
    funcionario.lastName === idOrName || funcionario.firstName === idOrName);
  const nomeCompleto = `${pessoa.firstName} ${pessoa.lastName}`;
  const arrAnimal = animalsByIds(...pessoa.responsibleFor).map(animal => animal.name);
  saida[nomeCompleto] = arrAnimal;
  return saida;
}

employeeCoverage();

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
