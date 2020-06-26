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

function animalsByIds(id1, id2) {
  // seu código aqui
  if (id1 === 0 && id2 === 0) {
    return [];
  }
  const arrayAnimals = (animals.filter(animal =>
  (animal.id === id1) + (animal.id === id2)));
  return arrayAnimals;
}

function animalsOlderThan(animalName, minAge) {
  // seu código aqui
  const animalSelec = (animals.find(animalS => animalS.name === animalName));
  const idade = (animalSelec.residents.every(animalAge => animalAge.age > minAge));
  return idade;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  const emplByName = employees.find(employee =>
  (employee.firstName === employeeName) || (employee.lastName === employeeName));
  return emplByName;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const onjetoEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return onjetoEmployee;
}

function isManager(id) {
  // seu código aqui
  const manager = employees.some(empregado => empregado.managers.find(gerente => gerente === id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmpregado = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  const pushEmpl = employees.push(newEmpregado);
  return pushEmpl;
}

function animalCount(species) {
  // seu código aqui

  const allSpecies = animals.reduce(((lista, { name, residents }) => {
    lista[name] = residents.length;
    return lista;
  }), {});

  const oneEspecie = animals.find(animal => animal.name === species);

  return species ? oneEspecie.residents.length : allSpecies;
}

function entryCalculator(entrants) {
  // seu código aqui

  if (entrants === undefined || Object.entries(entrants).length < 1) {
    return 0;
  }
  const total = Object.keys(prices).reduce((vTotal, faixaEtaria) =>
  vTotal + (entrants[faixaEtaria] * prices[faixaEtaria]), 0);

  return total;
}

function nomeLocal() {
  const zonas = ['NE', 'NW', 'SE', 'SW'];
  const objetoSaida = {};
  zonas.forEach(zona => (objetoSaida[zona] = animals.filter(local => local.location === zona)
    .map(objeto => objeto.name)));
  return objetoSaida;
}

function animalMap(options) {
  const zonas = ['NE', 'NW', 'SE', 'SW'];
  const objetoSaida = {};

  if (options === undefined) return nomeLocal();
  const { includeNames = false, sorted = false, sex = '' } = options;
  if (includeNames === true) {
    zonas.forEach(zona => (objetoSaida[zona] = animals.filter(local =>
      local.location === zona).map((objeto) => {
        const tipo = {};
        tipo[objeto.name] = objeto.residents;
        if (sex !== '') {
          tipo[objeto.name] = tipo[objeto.name].filter(resdent =>
          resdent.sex === sex);
        }
        tipo[objeto.name] = tipo[objeto.name].map(nome => nome.name);
        if (sorted === true) {
          tipo[objeto.name] = tipo[objeto.name].sort();
        }
        return tipo;
      })));
    return objetoSaida;
  }
  if (includeNames === false && sex !== '') return nomeLocal();
  return animalMap;
}

function schedule(dayName) {
  // seu código aqui
  const diaHorairo = {};
  Object.keys(hours).forEach((dia) => {
    if (dia === 'Monday') {
      diaHorairo[dia] = 'CLOSED';
    } else {
      diaHorairo[dia] = `Open from ${hours[dia].open}am until ${hours[dia].close - 12}pm`;
    }
  });
  if (dayName === undefined) return diaHorairo;
  const umDia = {};
  umDia[dayName] = diaHorairo[dayName];
  return umDia;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const respon = (employees.find(empregado => empregado.id === id)).responsibleFor;
  const animaisRes = animals.find(animal => animal.id === respon[0]).residents;
  let oldestAnimal = { name: '', sex: '', age: 0 };
  animaisRes.forEach((resident) => {
    if (resident.age > oldestAnimal.age) oldestAnimal = resident;
  });

  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const novoValor = prices;
  const { Adult, Senior, Child } = novoValor;
  novoValor.Adult = Math.round(Adult * (1 + (percentage / 100)) * 100) / 100;
  novoValor.Senior = Math.round(Senior * (1 + (percentage / 100)) * 100) / 100;
  novoValor.Child = Math.round(Child * (1 + (percentage / 100)) * 100) / 100;
  return novoValor;
}
function employeeCoverage(idOrName) {
  // seu código aqui
  const saida = {};
  function igual(employee) {
    saida[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor
      .map(employeeAnimId => animals.find(animal => animal.id === employeeAnimId).name,
      );
  }
  if (idOrName === undefined) {
    employees.forEach((employee) => {
      employee = igual(employee);
    });
    return saida;
  }
  const selectEmp = employees.find(empregado =>
    (empregado.id === idOrName || empregado.firstName === idOrName ||
        empregado.lastName === idOrName));
  igual(selectEmp);
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
