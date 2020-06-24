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

const animalsByIds = (...ids) => ids.map(id => animals.find(animal => animal.id === id));

const animalsOlderThan = (animalName, age) => animals
    .find(animal => animal.name === animalName)
    .residents.every(animal => animal.age > age);

const employeeByName = empName => (!empName
    ? {}
    : employees.find(employee => employee.firstName === empName || employee.lastName === empName));

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id => employees.some(employ => id === employ.managers.find(item => item === id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) =>
  employees.push({ id, firstName, lastName, managers, responsibleFor });

const animalCount = (species) => {
  const animalObj = {};
  animals.forEach(animal => (animalObj[animal.name] = animal.residents.length));
  return species
    ? animals.find(animal => animal.name === species).residents.length
    : animalObj;
};

const entryCalculator = (entrants) => {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  const totalPrice = (total, priceByAge) => total + (prices[priceByAge] * entrants[priceByAge]);
  return Object.keys(prices).reduce(totalPrice, 0);
};

const animalsName = (nameOfAnimal, sorted, sex) => {
  const obj = {};
  obj[nameOfAnimal] = animals.find(element => element.name === nameOfAnimal).residents;
  if (sex) {
    obj[nameOfAnimal] = obj[nameOfAnimal].filter(resident => resident.sex === sex);
  }
  obj[nameOfAnimal] = obj[nameOfAnimal].map(({ name }) => name);
  if (sorted) obj[nameOfAnimal].sort();
  return obj;
};

const animalMap = (options = {}) => {
  const { includeNames, sex, sorted } = options;
  const mappedAnimal = animals.reduce((animal, { name, location }) => {
    if (!animal[location]) animal[location] = [];
    if (includeNames) {
      animal[location].push(animalsName(name, sorted, sex));
    } else {
      animal[location].push(name);
    }
    return animal;
  }, {});
  return mappedAnimal;
};

const schedule = (dayName) => {
  const humanReadableSchedule = {};
  Object.keys(hours).forEach((day) => {
    if (hours[day].open === 0) humanReadableSchedule[day] = 'CLOSED';
    else humanReadableSchedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
  });
  return dayName ? { [dayName]: humanReadableSchedule[dayName] } : humanReadableSchedule;
};

const findOldestAnimal = (old, older) => (old.age > older.age ? old : older);

const oldestFromFirstSpecies = (id) => {
  const selectedEmployee = employees.find(employee => employee.id === id);
  const selectedAnimal = animals.find(animal =>
    animal.id === selectedEmployee.responsibleFor[0]).residents;
  const oldestAnimal = selectedAnimal.reduce(findOldestAnimal);
  return Object.values(oldestAnimal).map(key => key);
};

const roundNum = (num, length) => Math.round(num * (10 ** length)) / (10 ** length);

const increasePrices = percentage => Object.keys(prices).forEach(
    key => (prices[key] = roundNum(prices[key] + (prices[key] * (percentage / 100)), 2)),
  );

const employeeCoverage = (idOrName) => {
  const coverage = {};
  employees.forEach((employee) => {
    coverage[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map(
      employId => animals.find(animal => animal.id === employId).name,
    );
  });
  if (!idOrName) return coverage;
  const selectedEmployee = employees.find(
    employee =>
      idOrName === employee.id || idOrName === employee.lastName || idOrName === employee.firstName,
  );
  const employeeName = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
  return { [employeeName]: coverage[employeeName] };
};

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
