import { Animals, AnimalDetails } from './animals';
import { ZooInfo } from './zoo';
import { useEffect, useState } from 'react';

const url = "https://oswd-cg.azurewebsites.net/api/zoo/animals/";

function App() {
  let zooName = "Como Zoo"
  let capacity = 300;
  let [noGuests, setGuests] = useState(200);
  let [animals, setAnimals] = useState(null);
  let [refreshFlag, setRefreshFlag] = useState(false);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => setAnimals(json.payload));
  }, [refreshFlag]);
  let [currentAnimal, setCurrentAnimal] = useState({
    "age": "",
    "gender": "",
    "id": "",
    "isPregnant": false,
    "name": "",
    "type": "",
    "weight": ""
  });

  const addAnimal = async (mother = {}) => {
    await fetch(url, {method: "PUT", headers : {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify({
      age: 0,
      gender: "",
      isPregnant: false,
      name: mother.type ? "Baby " + mother.type : "Name",
      type: mother.type ? mother.type : "",
      weight: mother.weight ? Math.round(mother.weight * 0.1, 2) : 0
    })});
    setRefreshFlag(!refreshFlag);
  };

  const update = async (animal) => {
    await fetch(url, {method: "PUT", headers : {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(animal)});
    setRefreshFlag(!refreshFlag);
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
      {
        (animals && (
          <>
            <ZooInfo name={zooName} capacity={capacity} noAnimals={animals.length} noGuests={noGuests} />
            <button onClick={() => setGuests(noGuests + 1)}>Admit Guest</button><br /><hr /><br />
            <Animals animals={animals} addAnimal={addAnimal} setAnimals={setAnimals} setCurrentAnimal={setCurrentAnimal} setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} url={url} />
            <button onClick={() => {
              addAnimal();
              setCurrentAnimal(animals.at(-1));
            }}>Add Animal</button><br /><hr /><br />
            <AnimalDetails animal={currentAnimal} setAnimal={setCurrentAnimal} setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} update={update} url={url} />
          </>
        ))
      }
      {
        (!animals && (
          <h2>Loading...</h2>
        ))
      }
    </>
  );
}

export default App;