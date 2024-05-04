export function Animals({animals, addAnimal, setAnimals, setCurrentAnimal, setRefreshFlag, refreshFlag, url}) {
    const editAnimal = async (animal) => {
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

    const removeAnimal = async (id) => {
      await fetch(url, {method: "DELETE", headers : {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(animals.filter(a => a.id === id)[0])});
      setRefreshFlag(!refreshFlag);
    }

    const showAnimal = (id) => {
      setCurrentAnimal(animals.filter(animal => animal.id === id)[0]);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Weight</th>
                    <th>Is Pregnant</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    animals.map(animal => (
                    <tr key={animal.id}>
                        <td>{animal.name}</td>
                        <td>{animal.type}</td>
                        <td>{animal.age}</td>
                        <td>{animal.gender}</td>
                        <td>{animal.weight}</td>
                        <td>{animal.isPregnant ? "Yes" : "No"}</td>
                        <td>
                            <button onClick={() => showAnimal(animal.id, setCurrentAnimal, animals)}>Show Animal</button>
                            <button onClick={() => removeAnimal(animal.id, setAnimals, animals)}>Remove Animal</button>
                            {
                                animal.isPregnant &&
                                <button className="birth" onClick={() => {
                                    animal.isPregnant = false;
                                    editAnimal(animal);
                                    addAnimal(animal);
                                    setCurrentAnimal({});
                                }}>Give Birth</button>
                            }
                            {
                                (!animal.isPregnant && animal.gender.toLowerCase() === "female") &&
                                <button className="birth" onClick={() => {
                                    animal.isPregnant = true;
                                    editAnimal(animal);
                                }}>Make Pregnant</button>
                            }
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export function AnimalDetails({animal, setAnimal, update}) {

    if (animal.name !== "" || animal.type !== "") {
        return (
            <>
                <label htmlFor="name">Name:</label>
                <input name="name" placeholder="Name" onChange={(event) => setAnimal({...animal, name: event.target.value})} value={animal.name} /><br />
                <label htmlFor="type">Type:</label>
                <input name="type" placeholder="Type" onChange={(event) => setAnimal({...animal, type: event.target.value})} value={animal.type} /><br />
                <label htmlFor="age">Age:</label>
                <input name="age" placeholder="Age" onChange={(event) => setAnimal({...animal, age: event.target.value})} type="number" value={animal.age} /><br />
                <label htmlFor="gender">Gender:</label>
                <input name="gender" placeholder="Gender" onChange={(event) => setAnimal({...animal, gender: event.target.value})} value={animal.gender} /><br />
                <label htmlFor="weight">Weight:</label>
                <input name="weight" placeholder="Weight" onChange={(event) => setAnimal({...animal, weight: event.target.value})} type="number" step="any" value={animal.weight} /><br />
                <label htmlFor="isPregnant">Is Pregnant:</label>
                <input checked={animal.isPregnant} name="isPregnant" readOnly type="checkbox" /><br />

                <button onClick={() => update(animal)}>Save</button>
            </>
        )
    }
    return (<p>Please select an animal.</p>);
}