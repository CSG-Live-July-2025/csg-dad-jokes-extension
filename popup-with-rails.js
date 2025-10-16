// This version uses the local Rails API
// Switch to this after you've built your Rails backend!
const API_URL = "http://localhost:3000/quotes/random";

const btn = document.getElementById("fetchBtn");
const result = document.getElementById("result");

async function getQuote() {
  result.textContent = "Loading...";
  result.classList.add("loading");
  result.classList.remove("muted");
  
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Shape data depending on your API
    const content = data.content || data.text || JSON.stringify(data);
    const author = data.author || "";

    result.innerHTML = `
      <div><strong>${content}</strong></div>
      <div class="muted">${author ? "— " + author : ""}</div>
    `;
    result.classList.remove("loading");
  } catch (err) {
    result.innerHTML = `<div style="color: #d32f2f;">Error: ${err.message}</div>`;
    result.classList.remove("loading");
  }
}

btn.addEventListener("click", getQuote);

