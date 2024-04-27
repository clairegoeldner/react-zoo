export function ZooInfo({name, capacity, noAnimals, noGuests}) {
    return (
        <>
            <label htmlFor="name">Name:</label>
            <input name="name" placeholder="Name" readOnly value={name} /><br />
            <label htmlFor="capacity">Capacity:</label>
            <input name="capacity" placeholder="Capacity" readOnly value={capacity} /><br />
            <label htmlFor="noAnimals">Number of Animals:</label>
            <input name="noAnimals" placeholder="Number of Animals" readOnly value={noAnimals} /><br />
            <label htmlFor="noGuests">Number of Guests</label>
            <input name="noGuests" placeholder="Number of Guests" readOnly value={noGuests} /><br />
        </>
    );
}