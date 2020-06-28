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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  const result = ids;
  if (result.length === 1) {
    return animals.filter(elemento => elemento.id === result[0]);
  } else if (result.length >= 2) {
    return animals.filter(
      elemento => elemento.id === result[0] || elemento.id === result[1]);
  }
  return result;
}

function animalsOlderThan(animal, age) {
  return animals
    .find(elemento => elemento.name === animal)
    .residents.every(elemento => elemento.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(elemento =>
  elemento.firstName === employeeName || elemento.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(elemento => elemento.managers[0] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  let newObj;
  if (managers === undefined && responsibleFor === undefined) {
    newObj = {
      id,
      firstName,
      lastName,
      managers: [],
      responsibleFor: [],
    };
    employees.push(newObj);
    return employees;
  }
  newObj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newObj);
  return newObj;
}

function animalCount(species) {
  if (species === undefined) {
    const nomesAnimal = animals.map(elemento => elemento.name);
    const tamanho = animals.map(elemento => elemento.residents.length);
    const novoObjeto = {};
    nomesAnimal.forEach((chave, indice) => (novoObjeto[chave] = tamanho[indice]));
    return novoObjeto;
  }
  return animals.find(elemento => elemento.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  } else if (entrants.Adult === 2) {
    return (
      (data.prices.Adult * entrants.Adult) +
      (data.prices.Senior * entrants.Senior) +
      (data.prices.Child * entrants.Child)
    );
  }
  return 0;
}

function schedule(dayName) {
  const obj = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName === 'Monday') {
    const obj2 = { [dayName]: obj.Monday };
    return obj2;
  } else if (dayName === 'Tuesday') {
    const obj3 = { [dayName]: obj.Tuesday };
    return obj3;
  }
  return obj;
}

function oldestFromFirstSpecies(id) {
  const chaveTrampo = employees.find(elemento => elemento.id === id)
    .responsibleFor[0];
  const animalCuidado = animals.find(elemento => elemento.id === chaveTrampo);
  const dados = animalCuidado.residents.reduce((ele, elemento) => {
    if (ele.age > elemento.age) {
      return ele;
    }
    return elemento;
  });
  const novoArray = [dados.name, dados.sex, dados.age];
  return novoArray;
}

function roundNum(num, comprimento) {
  const numero = Math.round(num * (10 ** comprimento)) / (10 ** comprimento);
  return numero;
}

function increasePrices(percentage) {
  const Adulto = ((prices.Adult * percentage) / 100) + prices.Adult;
  const Seniorr = ((prices.Senior * percentage) / 100) + prices.Senior;
  const Childd = ((prices.Child * percentage) / 100) + prices.Child;

  const obj = {
    Adult: roundNum(Adulto, 2),
    Senior: roundNum(Seniorr, 2),
    Child: roundNum(Childd, 2),
  };

  const obj2 = {
    Adult: (data.prices.Adult = obj.Adult),
    Senior: (data.prices.Senior = obj.Senior),
    Child: (data.prices.Child = obj.Child),
  };

  return (data.prices = obj2);
}
/*
function employeeCoverage(idOrName) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}
*/
module.exports = {
  animalsByIds,
  animalsOlderThan,
  employeeByName,
  createEmployee,
  isManager,
  addEmployee,
  animalCount,
  entryCalculator,
  schedule,
  increasePrices,
  oldestFromFirstSpecies,
/*animalMap,
employeeCoverage,
*/
};
