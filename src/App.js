import { Animals, AnimalDetails } from './animals';
import { ZooInfo } from './zoo';
import { useState } from 'react';
const animalList = [
  {
    "age": 4,
    "gender": "Female",
    "id": 1,
    "isPregnant": false,
    "name": "Anne",
    "type": "Hummingbird",
    "weight": 45.90
  },
  {
    "age": 2,
    "gender": "Female",
    "id": 2,
    "isPregnant": true,
    "name": "Perry",
    "type": "Platypus",
    "weight": 3.20
  },
  {
    "age": 2,
    "gender": "Male",
    "id": 3,
    "isPregnant": false,
    "name": "Harry",
    "type": "Hummingbird",
    "weight": 3.20
  },
  {
    "age": 2,
    "gender": "Female",
    "id": 4,
    "isPregnant": true,
    "name": "Sherry",
    "type": "Shark",
    "weight": 852.00
  },
  {
    "age": 3,
    "gender": "Female",
    "id": 5,
    "isPregnant": true,
    "name": "Cherry",
    "type": "Chimpanzee",
    "weight": 3.20
  }
]

function App() {
  let zooName = "Como Zoo"
  let capacity = 300;
  let [noGuests, setGuests] = useState(200);
  let [animals, setAnimals] = useState(animalList);
  let [currentAnimal, setCurrentAnimal] = useState({
    "age": "",
    "gender": "",
    "id": "",
    "isPregnant": false,
    "name": "",
    "type": "",
    "weight": ""
  });

  const addAnimal = (mother = {}) => {
    animals.push({
      age: 0,
      gender: "",
      id: animals.at(-1).id + 1,
      isPregnant: false,
      name: mother.type ? "Baby " + mother.type : "Name",
      type: mother.type ? mother.type : "",
      weight: mother.weight ? Math.round(mother.weight * 0.1, 2) : 0
    })
  };

  const update = (animal) => {
    animals.find((a, index) => {
      if (a.id === animal.id) {
        animals[index] = animal;
        return true;
      }
      return false;
    });
    setCurrentAnimal({
          "age": "",
          "gender": "",
          "id": "",
          "isPregnant": false,
          "name": "",
          "type": "",
          "weight": ""
      });
  };

  return (
    <>
      <h1>Zoo</h1>
      <ZooInfo name={zooName} capacity={capacity} noAnimals={animals.length} noGuests={noGuests} />
      <button onClick={() => setGuests(noGuests + 1)}>Admit Guest</button><br /><hr /><br />
      <Animals animals={animals} addAnimal={addAnimal} setAnimals={setAnimals} setCurrentAnimal={setCurrentAnimal} />
      <button onClick={() => {
        addAnimal();
        setCurrentAnimal(animals.at(-1));
      }}>Add Animal</button><br /><hr /><br />
      <AnimalDetails animal={currentAnimal} setAnimal={setCurrentAnimal} update={update} />
    </>
  );
}

export default App;