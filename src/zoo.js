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

const { animals } = data;
const { employees } = data;
const { prices } = data;
const { hours } = data;


function animalsByIds(...ids) {
  const animId = [];

  animals.forEach((animale, i) => {
    if (animale.id === ids[i]) {
      animId.push(animale);
    }
  });
  return animId;
  // seu código aqui
}

function animalsOlderThan(animal, age) {
  const animOld = animals.find(animale => animale.name === animal)
  .residents.every(animales => animales.age > age);
  return animOld;
  // seu código aqui
}

function employeeByName(employeeName) {
  if (employeeName) {
    const myR = employees.find(n => n.firstName === employeeName) || employees.find(n =>
      n.lastName === employeeName);
    return myR;
  }
  return {};
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  const ret = { ...personalInfo, ...associatedWith };
  return ret;
  // seu código aqui
}

function isManager(id) {
  const myReturn = employees.some(man => id === man.managers.find(item => item === id));
  return myReturn;
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push(({ id, firstName, lastName, managers, responsibleFor }));
  // seu código aqui
}

function animalCount(species) {
  const todosOsAnumais = (listagem, { name, residents }) => {
    listagem[name] = residents.length;
    console.log(listagem);
    return listagem;
  };
  if (species === undefined) {
    return animals.reduce(todosOsAnumais, {});
  }
  return animals.find(anim => (anim.name === species)).residents.length;
}


function entryCalculator(entrants) {
  const valorTotal = (meuTotal, preçoCIdade) => {
    console.log(meuTotal);
    return meuTotal + (entrants[preçoCIdade] * prices[preçoCIdade]);
  };
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }
  return Object.keys(prices).reduce(valorTotal, 0);
  // rever esse pq não entendi direito o que fiz (embora funcione)
}


function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const result = {};
  Object.entries(hours).forEach(({ 0: chaveH, 1: valorH }) => {
    const { open, close } = valorH;
    if ((dayName && dayName === chaveH) || !dayName) {
      result[chaveH] = (open === 0 && close === 0) ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`;
    }
  });
  return result;
  // seu código aqui testando if em uma  linha (sintax reference) --> "var = () ? '' : '';"
}

function oldestFromFirstSpecies(id) {
  const idAnim = employees.find(funcio => funcio.id === id).responsibleFor[0];
  console.log(idAnim);
  const animMaisVelho = animals.find(animale => animale.id === idAnim).residents
  .reduce((velho, maisVelho) => {
    if (velho.age > maisVelho.age) {
      maisVelho = velho;
    }
    return maisVelho;
  });
  console.log(animMaisVelho);
  console.log(Object.values(animMaisVelho));
  return Object.values(animMaisVelho);
  // seu código aqui
}
// oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992');
// retorno esperado ['Vicky', 'female', 12]

function increasePrices(percentage) {
  return Object.keys(prices).forEach((valor) => {
    prices[valor] *= (percentage / 100) + 1;
    prices[valor] = (Math.floor(Number((prices[valor]) * 100) + 1) / 100).toFixed(2);
  });
  // seu código aqui
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
