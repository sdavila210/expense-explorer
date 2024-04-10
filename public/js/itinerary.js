        const newFormHandler = async (event) => {
        event.preventDefault();
      
        const foodTitle = document.querySelector('#food-title').value.trim();
        const foodCost = document.querySelector('#food-cost').value.trim();
        const attractionName = document.querySelector('#attraction-name').value.trim();
        const attractionsCost = document.querySelector('#attractions-cost').value.trim();
        const hotelTitle = document.querySelector('#hotel-title').value.trim();
        const hotelCost = document.querySelector('#hotel-cost').value.trim();
        const transportationTitle = document.querySelector('#transportation-title').value.trim();
        const transportationCost = document.querySelector('#transportation-cost').value.trim();
        const dayActivitiesTitle = document.querySelector('#day_activities-title').value.trim();
        const dayActivitiesCost = document.querySelector('#day_activities-cost').value.trim();
        const nightActivitiesTitle = document.querySelector('#night_activities-title').value.trim();
        const nightActivitiesCost = document.querySelector('#night_activities-cost').value.trim();
      
        // You can perform validation here if needed
      
        const formData = {
          foodTitle,
          foodCost,
          attractionName,
          attractionsCost,
          hotelTitle,
          hotelCost,
          transportationTitle,
          transportationCost,
          dayActivitiesTitle,
          dayActivitiesCost,
          nightActivitiesTitle,
          nightActivitiesCost
        };
      
        // You can perform additional processing or validation on formData if needed
        if(foodTitle && foodCost && hotelTitle && hotelCost && transportationTitle && transportationCost){
        const response = await fetch(`/api/itineraryRoutes`, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to create itinerary');
        }
      };
    };
      
      document.querySelector('.new-itinerary-form').addEventListener('submit', newFormHandler);