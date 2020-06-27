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

const { animals, employees, hours, prices } = require('./data');

/*
- Implemente a função animalsByIds:
Caso receba nenhum parâmetro, necessário retornar um array vazio
Ao receber como parâmetro um único id, retorna os animais com este id
Ao receber mais de um id, retorna os animais que têm um desses ids */

function animalsByIds(...ids) {
  if (!ids.length) return [];
  const arraySaida = [];
  ids.forEach(cadaId => arraySaida.push(animals.find(cadaAnimal => cadaAnimal.id === cadaId)));
  return arraySaida;
}

/* implemente a função animalsOlderThan:
Ao passar o nome de uma espécie e uma idade, testa se
todos os animais desta espécie possuem a idade mínima especificada */

function animalsOlderThan(animal, age) {
  // seu código aqui
  const retornaElementoNome = animals.find(cadaAnimal => cadaAnimal.name === animal);
  const saida = retornaElementoNome.residents.every(elemento => elemento.age > age);
  return saida;
}

/* Implemente a função employeeByName:
Sem parâmetros, retorna um objeto vazio
Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
Quando provido o último nome do funcionário, retorna o objeto do funcionário */

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  const saida = employees.find(employee => employee.firstName === employeeName ||
    employee.lastName === employeeName);
  return saida;
}

//  Cria um novo colaborador a partir de objetos contendo
//  informações pessoais, gerentes e animais gerenciados

function createEmployee(personalInfo, associatedWith) {
  //  seu código aqui
  //  concatenaEntradas:
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  const saida = employees.some(employee =>
    employee.managers.some(cadaElementoManagers => cadaElementoManagers === id));
  return saida;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const saida = animals.reduce((valorAcumulado, item) => {
      valorAcumulado[item.name] = item.residents.length;
      return valorAcumulado;
    }, {});
    return saida;
  }
  const quantidade = animals.find(animal => animal.name === species).residents.length;
  return quantidade;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants) return 0;
  const arrayEntrants = Object.entries(entrants);
  const arrayPrices = Object.entries(prices);
  arrayPrices.sort();
  const saida = arrayEntrants.reduce((atual, item, index) => {
    if (item[0] === arrayPrices[index][0]) {
      atual += item[1] * arrayPrices[index][1];
    }
    return atual;
  }, 0);
  return saida;
}

function animalMapWithOptionsEnabled(options) {
  const organizar = {};
  animals.forEach((animal) => {
    const entrada = {};
    if (options.sorted) {
      entrada[animal.name] = animal.residents.map(residente => residente.name).sort();
    } else {
      entrada[animal.name] = animal.residents.map(residente => residente.name);
    }
    if (options.sex) {
      entrada[animal.name] = animal.residents.filter(
        residente => residente.sex === options.sex).map(item => item.name);
    }
    if (!organizar[animal.location]) {
      organizar[animal.location] = [];
      organizar[animal.location].push(entrada);
    } else {
      organizar[animal.location].push(entrada);
    }
  });
  return organizar;
}

function animalMap(options) {
  // seu código aqui
  const saida = animals.reduce((prev, animal) => {
    const regiao = animal.location;
    if (prev[regiao]) {
      prev[regiao].push(animal.name);
    } else {
      prev[regiao] = [animal.name];
    }
    return prev;
  }, {});

  if (options === undefined || options.includeNames === undefined) return saida;
  return animalMapWithOptionsEnabled(options);
}

function schedule(dayName) {
  // seu código aqui
  const arrayDias = Object.keys(hours);
  const arrayHoras = Object.values(hours);
  const saida = arrayDias.reduce((atual, item, index) => {
    const until = arrayHoras[index].close;
    if (arrayHoras[index].open === 0 && until === 0) {
      atual[item] = 'CLOSED';
      return atual;
    }
    atual[item] = `Open from ${arrayHoras[index].open}am until ${until - 12}pm`;
    return atual;
  }, {});
  if (dayName === undefined) return saida;
  const objetoSaida = {};
  objetoSaida[dayName] = saida[dayName];
  return objetoSaida;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const codigoPrimeiroAnimal = employees.find(item => item.id === id).responsibleFor[0];
  const selecionaAnimalbyId = animals.find(item => item.id === codigoPrimeiroAnimal).residents;
  const selecionaMaisVelho = selecionaAnimalbyId.reduce((bigger, iterando) => {
    if (bigger.age > iterando.age) iterando = bigger;
    return iterando;
  }, selecionaAnimalbyId[0]);
  const saida = Object.values(selecionaMaisVelho);
  console.log(selecionaMaisVelho);
  return saida;
}

function increasePrices(percentage) {
  // seu código aqui
  const auxiliar = Object.keys(prices);
  auxiliar.forEach((chave) => {
    prices[chave] *= (percentage / 100) + 1;
    prices[chave] = Math.round(prices[chave] * 100);
    prices[chave] = Number((prices[chave] / 100).toFixed(2));
  });
  return prices;
}

function employeeCoverage(idOrName) {
  const saida = employees.reduce((atual, iterando) => {
    const nomeCompleto = `${iterando.firstName} ${iterando.lastName}`;
    atual[nomeCompleto] = [];
    const auxiliar = iterando.responsibleFor;
    auxiliar.forEach(item => atual[nomeCompleto].push(
      animals.find(itemAnimal => itemAnimal.id === item).name));
    return atual;
  }, {});
  if (!idOrName) return saida;
  const pegaFichaEmpregado = employees.find(empregado => empregado.id === idOrName);
  if (pegaFichaEmpregado) { //  cobre o caso de entrar com o id direto.
    const saida2 = {};
    saida2[`${pegaFichaEmpregado.firstName} ${pegaFichaEmpregado.lastName}`] = saida[`${pegaFichaEmpregado.firstName} ${pegaFichaEmpregado.lastName}`];
    return saida2;
  }
  const pegaNomesSaida = Object.keys(saida); // cobrindo o caso de entrar com nome ou sobrenome.
  let indice = 0;
  pegaNomesSaida.forEach((item, index) => {
    const auxiliar = item.split(' ');
    if (idOrName === auxiliar[0] || idOrName === auxiliar[1]) indice = index;
  });
  const saida3 = {};
  saida3[pegaNomesSaida[indice]] = saida[pegaNomesSaida[indice]];
  return saida3;
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
