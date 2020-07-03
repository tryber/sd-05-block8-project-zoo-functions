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

const {
  prices,
  animals,
  employees,
  hours,
} = data;

function animalsByIds(...ids) {
  // seu código aqui
  if (ids.length === 0) {
    return [];
  }
  /* const armazenaDados = [];
  animals.forEach((animal) => {
    ids.forEach((id) => {
      if (animal.id === id) {
        armazenaDados.push(animal);
      }
    });
  });
  return armazenaDados; */
  //  console.log(armazenaDados);
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(index => index.name === animal).residents.every(retornoResidents =>
    retornoResidents.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  const employeeEncontrado = employees.find(buscaFuncionario =>
    buscaFuncionario.firstName === employeeName);
  const employeeEncontrado2 = employees.find(buscaFuncionario =>
    buscaFuncionario.lastName === employeeName);
  if (employeeEncontrado !== undefined) {
    return employeeEncontrado;
  }
  return employeeEncontrado2;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const buscaId = employees.some(employee => employee.managers.find(gerenteId => gerenteId === id));
  return buscaId;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  /* const outroFuncionario = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  } */
  const outroFuncionario2 = Object.assign({}, {
    id,
  }, {
    firstName,
  }, {
    lastName,
  }, {
    managers,
  }, {
    responsibleFor,
  });
  /* const outroFuncionario3 = createEmployee({
    id,
    firstName,
    lastName
  }, {
    managers,
    responsibleFor
  }) */
  employees.push(outroFuncionario2);
}

function animalCount(species) {
  // seu código aqui
  const retornaObjeto = {};
  animals.forEach(animal => (retornaObjeto[animal.name] = animal.residents.length));
  if (species === undefined) {
    return retornaObjeto;
  }
  return retornaObjeto[species];
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  let total = Adult * prices.Adult;
  total += Child * prices.Child;
  total += Senior * prices.Senior;
  return total;
}

function animalMap(options) {
  // seu código aqui
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
  // seu código aqui
  const idAnimal = employees.find(pessoa => pessoa.id === id).responsibleFor[0];
  const { age, name, sex } = animals.find(animal =>
    animal.id === idAnimal).residents.sort((a, b) => b.age - a.age)[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const porcentagem = (percentage / 100) + 1;
  /* const preço = prices.Adult * porcentagem;
  prices.Adult = preco
  prices.Adult = prices.Adult * porcentagem */
  prices.Adult = (Math.round(prices.Adult * porcentagem * 100) / 100);
  prices.Senior = (Math.round(prices.Senior * porcentagem * 100) / 100);
  prices.Child = (Math.round(prices.Child * porcentagem * 100) / 100);
  /* const divisor = percentage / 100;
  const {
    Adult,
    Senior,
    Child
  } = prices;
  prices.Adult = Math.round(Adult * (divisor + 1) * 100) / 100;
  prices.Senior = Math.round(Senior * (divisor + 1) * 100) / 100;
  prices.Child = Math.round(Child * (divisor + 1) * 100) / 100;
  return prices; */
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const saida = {};
  if (idOrName === undefined) {
    employees.forEach((employee) => {
      const nomeCompleto = `${employee.firstName} ${employee.lastName}`;
      const arrAnimal = animalsByIds(...employee.responsibleFor);
      arrAnimal.forEach((animal, index, arr) => (arr[index] = animal.name));
      saida[nomeCompleto] = arrAnimal;
    });
    return saida;
  }
  const pessoa = employees.find(employee => employee.id === idOrName ||
    employee.firstName === idOrName || employee.lastName === idOrName);
  const nomeCompleto = `${pessoa.firstName} ${pessoa.lastName}`;
  const arrAnimal = animalsByIds(...pessoa.responsibleFor);
  arrAnimal.forEach((animal, index, arr) => (arr[index] = animal.name));
  saida[nomeCompleto] = arrAnimal;
  return saida;
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
