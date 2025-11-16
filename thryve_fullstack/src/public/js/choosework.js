// FETCH WORKOUT LIST FROM JSON

// Load workouts.json from the "public/data" folder
fetch("/data/workouts.json")

  // Convert response to JSON
  .then(response => response.json())

  .then(data => {

    // Container where all workout cards will appear
    const container = document.getElementById("workoutContainer");

    // Clear old content if any
    container.innerHTML = "";

    // Loop through each workout in the JSON file
    data.forEach(workout => {

      // Create a card for each workout
      const card = document.createElement("div");
      card.classList.add("card");

      // Template for each workout card
      card.innerHTML = `
        <h3>${workout.title}</h3>
        <p>${workout.description}</p>

        <button 
          onclick="window.location.href='/start-workout?w=${encodeURIComponent(workout.title)}'">
          Start Workout
        </button>
      `;

      // Append card to container
      container.appendChild(card);
    });
  })

  // Catch missing file / wrong path / server issues
  .catch(error => console.error("Error loading workouts:", error));
