/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  // seu código aqui
  if (ids.length === 0) return [];
  return animals.filter(animal => ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(el => el.name === animal).residents.every(ell => ell.age >= age);
}
function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  const resp1 = employees.find(el => el.firstName === employeeName);
  const resp2 = employees.find(el => el.lastName === employeeName);
  return (resp1 || resp2);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  let valor = false;
  employees.forEach(el => el.managers.forEach(ell => (ell === id ? (valor = true) : false)));
  return valor;
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
  const retorno = {};
  if (species === undefined) {
    animals.forEach((el) => {
      const name = el.name;
      const quant = el.residents.length;
      retorno[name] = quant;
    });
    return retorno;
  }
  return animals.find(el => el.name === species).residents.length;
}
/* console.log(animalCount());
console.log(animalCount('lions'));
console.log(animalCount('snakes')); */

function entryCalculator(...entrants) {
  if (entrants.length === 0) return 0;

  if (Object.keys(entrants[0]).length === 0) return 0;

  const { Adult = 0, Child = 0, Senior = 0 } = entrants[0];
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
  //  seu código aqui
}

function animalMap(options) {
  const zonas = ['NE', 'NW', 'SE', 'SW'];
  const objetoSaida = {};
  const { includeNames = false, sorted = false, sex = '' } =
  options === undefined ? { includeNames: false, sorted: false, sex: '' } : options;
  if (includeNames === true) {
    zonas.forEach(function (zona) {
      objetoSaida[zona] = animals.filter(local => local.location === zona).map((objeto) => {
        const tipo = {};
        tipo[objeto.name] = objeto.residents;
        if (sex !== '') {
          tipo[objeto.name] = tipo[objeto.name].filter(animalSex =>
          animalSex.sex === sex);
        }
        tipo[objeto.name] = tipo[objeto.name].map(nome => nome.name);
        if (sorted === true) tipo[objeto.name].sort();
        return tipo;
      });
    });
    return objetoSaida;
  }
  zonas.forEach(function (zona) {
    objetoSaida[zona] = animals.filter(local =>
    local.location === zona).map(objeto => objeto.name);
  });
  return objetoSaida;
}

function schedule(dayName) {
  // seu código aqui

  const hoursArr = Object.keys(hours);
  const workingHours = {};
  hoursArr.forEach((dday) => {
    const el = hours[dday];
    if (el.open === el.close) {
      workingHours[dday] = 'CLOSED';
    } else {
      workingHours[dday] = `Open from ${el.open}am until ${el.close > 12 ? el.close - 12 : el.close}${el.close > 12 ? 'pm' : 'am'}`;
    }
  });
  if (dayName === undefined) {
    return workingHours;
  }
  const onlyMonday = {};
  onlyMonday[dayName] = workingHours[dayName];
  return onlyMonday;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const idAnimal = employees.find(el => el.id === id).responsibleFor[0];
  let olderAnimal = {};
  animals.find(el => el.id === idAnimal).residents.forEach((el) => {
    if (Object.keys(olderAnimal).length === 0) olderAnimal = el;
    if (olderAnimal.age < el.age) olderAnimal = el;
  });
  return [olderAnimal.name, olderAnimal.sex, olderAnimal.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const newPrice = prices;
  const { Adult, Child, Senior } = newPrice;
  percentage /= 100;
  percentage += 1;
  prices.Adult = Math.round(Adult * percentage * 100) / 100;
  prices.Child = Math.round(Child * percentage * 100) / 100;
  prices.Senior = Math.round(Senior * percentage * 100) / 100;
  return prices;
}

function listOfAnimals(keysToUse, el) {
  const resp = {};
  resp[keysToUse] = [];
  el.responsibleFor.forEach(ell => resp[keysToUse].push(animals.find(an => an.id === ell).name));
  return resp;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const resp = {};
  if (idOrName === undefined) {
    employees.forEach((el) => {
      const fullName = `${el.firstName} ${el.lastName}`;
      Object.assign(resp, listOfAnimals(fullName, el));
    });
    return resp;
  }
  let elemnt;
  const options = ['firstName', 'lastName', 'id'];
  if (elemnt === undefined) {
    elemnt = employees.find(el => el[options[0]] === idOrName);
  }
  if (elemnt === undefined) {
    elemnt = employees.find(el => el[options[1]] === idOrName);
  }
  if (elemnt === undefined) {
    elemnt = employees.find(el => el[options[2]] === idOrName);
  }
  const fullName = `${elemnt.firstName} ${elemnt.lastName}`;
  return listOfAnimals(fullName, elemnt);
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
