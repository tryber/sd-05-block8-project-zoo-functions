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
  if (ids === undefined) {
    return [];
  }
  return ids.map(id => animals.find(animalAtual => animalAtual.id === id));
}

function animalsOlderThan(animal, age) {
  const tipoAnimal = animals.find(animalAtual => animalAtual.name === animal);
  return tipoAnimal.residents.every(animalAtual => animalAtual.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const achouFuncionario = employees.find(buscaFuncionario =>
    buscaFuncionario.firstName === employeeName || buscaFuncionario.lastName === employeeName);
  return achouFuncionario;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  const buscaId = employees.some(employee => employee.managers.find(gerenteId => gerenteId === id));
  return buscaId;
/*
  if (buscaId !== undefined) {
    return true;
  }
  return false;
  */
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = Object.assign({}, { id }, { firstName }, { lastName },
    { managers }, { responsibleFor });
  employees.push(newEmployee);
}

function animalCount(species) {
  const guardaObjeto = {};
  animals.forEach(buscarNome => (guardaObjeto[buscarNome.name] = buscarNome.residents.length));
  if (species === undefined) {
    return guardaObjeto;
  }
  return guardaObjeto[species];
}


function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  let total = 0;
  total += Adult * prices.Adult;
  total += Child * prices.Child;
  total += Senior * prices.Senior;
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
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

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee =>
    employee.id === id).responsibleFor[0];
  const veiaco = animals.find(animal =>
    animal.id === animalId).residents.sort((a, b) => b.age - a.age)[0];
  // const {name, sex, age} = veiaco;
  return [veiaco.name, veiaco.sex, veiaco.age];
}

function increasePrices(percentage) {
  const adicionaPorCento = (percentage / 100) + 1;
  prices.Adult = Math.round(prices.Adult * adicionaPorCento * 100) / 100;
  prices.Child = Math.round(prices.Child * adicionaPorCento * 100) / 100;
  prices.Senior = Math.round(prices.Senior * adicionaPorCento * 100) / 100;
}

function employeeCoverage(idOrName) {
  const objSaida = {};
  if (idOrName === undefined) {
    employees.forEach((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      const arrayAnimal = animalsByIds(...employee.responsibleFor);
      arrayAnimal.forEach((animal, index, arr) => (arr[index] = animal.name));
      objSaida[fullName] = arrayAnimal;
    });
    return objSaida;
  }
  const pessoaId = employees.find(employee =>
    employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  const fullName = `${pessoaId.firstName} ${pessoaId.lastName}`;
  const arrayAnimal = animalsByIds(...pessoaId.responsibleFor);
  arrayAnimal.forEach((animal, index, arr) => (arr[index] = animal.name));
  objSaida[fullName] = arrayAnimal;
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
