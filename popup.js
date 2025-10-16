// Where to fetch jokes from
const API_URL = "https://icanhazdadjoke.com/";

// Get elements from the page
const btn = document.getElementById("fetchBtn");
const result = document.getElementById("result");

// Function to get a joke
async function getJoke() {
  // Show loading message
  result.textContent = "Loading...";
  
  try {
    // Fetch a joke from the API
    const response = await fetch(API_URL, { 
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();

    // Display the joke
    result.innerHTML = `<div><strong>${data.joke}</strong></div>`;
    
  } catch (error) {
    // Show error if something goes wrong
    result.innerHTML = `<div style="color: red;">Oops! Couldn't load a joke.</div>`;
  }
}

// When button is clicked, get a joke
btn.addEventListener("click", getJoke);

