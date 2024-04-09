const newTripFormHandler = async (event) => {
    event.preventDefault();

    // Get form values
    const location = document.querySelector('#trip-location').value.trim();
    const travel_dates = document.querySelector('#trip-dates').value.trim();

    // Check if form fields are not empty
    if (location && travel_dates) {
        // Send POST request to create new trip
        const response = await fetch('/api/trip', {
            method: 'POST',
            body: JSON.stringify({ location, travel_dates }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Reload the page to show the updated list of trips
            document.location.reload();
        } else {
            alert('Failed to create trip');
        }
    } else {
        alert('Please fill out all fields');
    }
};

document.querySelector('.new-trip-form').addEventListener('submit', newTripFormHandler);