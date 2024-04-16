const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#project-name').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
    const needed_funding_hotel = parseFloat(document.querySelector('#project-funding-hotel').value.trim());
    const needed_funding_transportation = parseFloat(document.querySelector('#project-funding-transportation').value.trim());
    const needed_funding_food = parseFloat(document.querySelector('#project-funding-food').value.trim());
    const needed_funding_attractions = parseFloat(document.querySelector('#project-funding-attractions').value.trim());
    const needed_funding_total = needed_funding_hotel + needed_funding_transportation + needed_funding_attractions;

    if (name && description && needed_funding_hotel && needed_funding_transportation && needed_funding_food && needed_funding_attractions) {
        const response = await fetch(`/api/trips`, {
            method: 'POST',
            body: JSON.stringify({ name, description, needed_funding_hotel, needed_funding_transportation, needed_funding_food, needed_funding_attractions, needed_funding_total }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create trip');
        }
    }
};


document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);

