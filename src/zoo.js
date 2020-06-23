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
  const animalWithId = [];
  animals.forEach((animal, index) => {
    if (animal.id === ids[index]) {
      animalWithId.push(animal);
    }
  });
  return animalWithId;
}

function animalsOlderThan(animal, age) {
  const animalSelected = animals.filter(eachAnimal => eachAnimal.name === animal);
  return animalSelected[0].residents.every(ani => ani.age > age);
}

function employeeByName(employeeName) {
  return (employeeName == null) ?
  {} :
  employees.filter(({ firstName, lastName }) =>
  (firstName === employeeName || lastName === employeeName))[0];
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const animalsTotal = {};
  animals.forEach(({ name, residents }) => (animalsTotal[name] = residents.length));
  return (species == null) ? animalsTotal : animalsTotal[species];
}

function entryCalculator(entrants = 0) {
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (entrants === {}) ? 0 :
  ((Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child));
}

/*
Sem parâmetros, retorna animais categorizados por localização
Com opções especificadas, retorna nomes de animais
Com opções especificadas, retorna nomes de animais ordenados
Com opções especificadas, retorna somente nomes de animais macho/fêmea
Só retorna informações específicas de gênero se includeNames for setado

NE: [
        { lions: ['Zena', 'Maxwell', 'Faustino', 'Dee'] },
        { giraffes: ['Gracia', 'Antone', 'Vicky', 'Clay', 'Arron', 'Bernard'] }
      ],
*/

function animalMap(options) {
  const regions = {};
  animals.forEach(({ location }) => (regions[location] = []));
  if (options !== undefined) {
    const { includeNames = false, sorted = false, sex } = options;
    Object.keys(regions).forEach((region) => {
      animals.forEach(({ name, location, residents }) => {
        if (location === region) {
          if (includeNames && !sex) {
            regions[location].push({ [name]: residents.map(resident => resident.name) });
            if (sorted) {
              regions[location].forEach((animal, index) => {
                if (regions[location][index][name] !== undefined) {
                  regions[location][index][name].sort();
                }
              });
            }
          }
          if (includeNames && (sex === 'male' || sex === 'female')) {
            regions[location].push({ [name]: residents.filter(res => res.sex === sex).map(res => (res.sex === sex) ? res.name : false) });
          }
          if (!includeNames && (sex === 'male' || sex === 'female')) {
            residents = residents.filter(resident => resident.sex === sex).map(resident => resident.name);
            if (residents !== []) regions[location].push(name);
          }
        }
      });
    });
  } else {
    Object.keys(regions).forEach((region) => {
      animals.forEach(({ name, location }) => {
        if (location === region) return regions[location].push(name);
      });
    });
  }
  return regions;
}

// console.log(animalMap({includeNames: true, sorted: false}))
// console.log(animalMap({sex: 'female'}));

function schedule(dayName) {
  const readByHuman = {};
  const weekDays = Object.keys(hours);
  const workHours = Object.values(hours);
  workHours.forEach((hour) => {
    if (hour.close > 12) {
      hour.close -= 12;
    }
  });
  weekDays.forEach((day, index) => {
    if (day === 'Monday') {
      readByHuman[day] = 'CLOSED';
    } else {
      readByHuman[day] = `Open from ${workHours[index].open}am until ${workHours[index].close}pm`;
    }
  });
  return (dayName == null) ? readByHuman : { [dayName]: readByHuman[dayName] };
}

function oldestFromFirstSpecies(id) {
  const selectedEmployee = employees.filter(employee => employee.id === id);
  const firstSpecieId = selectedEmployee[0].responsibleFor[0];
  const selectedAnimal = animals.filter(animal => firstSpecieId === animal.id);
  const oldestResident = selectedAnimal[0].residents.sort((a, b) => b.age - a.age);
  const { name, sex, age } = oldestResident[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  const pricesToBeIncreased = prices;
  const ages = Object.keys(pricesToBeIncreased);
  ages.forEach((age) => {
    prices[age] *= (1 + (percentage / 100));
    prices[age] = (Math.round(pricesToBeIncreased[age] * 100) / 100).toFixed(2);
  });
  return pricesToBeIncreased;
}

function employeeCoverage(idOrName) {
  const personAnimal = {};
  let animalsPerPerson = [];
  let employee = employees;
  if (idOrName) {
    employee = employees.filter(({ id, firstName, lastName }) =>
    (id === idOrName || firstName === idOrName || lastName === idOrName));
  }
  employee.forEach(({ firstName, lastName, responsibleFor }) => {
    animalsPerPerson = [];
    responsibleFor.forEach((animalId) => {
      animals.forEach((animal) => {
        if (animal.id === animalId) {
          animalsPerPerson.push(animal.name);
        }
      });
    });
    personAnimal[`${firstName} ${lastName}`] = animalsPerPerson;
  });
  return personAnimal;
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
