# Chrome Extension (Manifest v3) — 90-Minute Starter Guide

> **📚 For instructors & self-learners:** This is the complete teaching guide.
> **🚀 Want to jump right in?** Check `README.md` for quick start instructions.

---

## 0) What you'll build

A tiny extension with a toolbar button. Click it → a popup opens → it fetches dad jokes from a public API and displays them. If you want to level up, you can build your own Rails API!

---

## 1) Create the project folder

```
chrome-extension/
  ├─ manifest.json
  ├─ popup.html
  ├─ popup.js
  └─ icon128.png
```

**📌 Getting an icon:** Download any 128×128 PNG image or use [placeholder.com/128](https://via.placeholder.com/128.png) and save it as `icon128.png`. Chrome will show a warning without an icon.

---

## 2) Add manifest.json

```json
{
  "manifest_version": 3,
  "name": "CSG Dad Jokes",
  "version": "0.1.0",
  "description": "Get random dad jokes - a Chrome extension learning project.",
  "action": {
    "default_title": "Get a Dad Joke",
    "default_popup": "popup.html"
  },
  "host_permissions": [
    "http://localhost:3000/*",
    "https://icanhazdadjoke.com/*"
  ],
  "icons": { 
    "128": "icon128.png" 
  }
}
```

**✅ Key idea:** `action.default_popup` makes a clickable toolbar button that opens `popup.html`.

**✅ Host permissions:** If you'll fetch from your Rails API (e.g., `http://localhost:3000`), include it in `host_permissions`.

---

## 3) Build the popup UI

**popup.html**

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>CSG Dad Jokes</title>
    <style>
      body { 
        font-family: system-ui, sans-serif; 
        margin: 16px; 
        width: 300px; 
      }
      h2 {
        margin-top: 0;
      }
      button { 
        padding: 8px 12px; 
        border-radius: 8px; 
        border: 1px solid #ddd; 
        background: #f5f5f5;
        cursor: pointer; 
        width: 100%;
        font-size: 14px;
      }
      button:hover {
        background: #e0e0e0;
      }
      .box { 
        margin-top: 12px; 
        padding: 12px; 
        border: 1px solid #eee; 
        border-radius: 8px; 
        min-height: 60px;
      }
      .muted { 
        color: #666; 
        font-size: 12px; 
      }
      .loading {
        color: #999;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <h2>💻 CSG Dad Jokes 🤣</h2>
    <button id="fetchBtn">Get Joke</button>
    <div id="result" class="box muted">Click the button to get a dad joke!</div>

    <script src="popup.js"></script>
  </body>
</html>
```

---

## 4) Fetch data in the popup

**popup.js**

```javascript
const API_URL = "https://icanhazdadjoke.com/";

const btn = document.getElementById("fetchBtn");
const result = document.getElementById("result");

async function getQuote() {
  result.textContent = "Loading...";
  result.classList.add("loading");
  result.classList.remove("muted");
  
  try {
    const res = await fetch(API_URL, { 
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CSG Dad Jokes Extension (https://github.com/codeSchoolGuam)'
      },
      cache: "no-store" 
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // icanhazdadjoke returns: { id, joke, status }
    const content = data.joke;

    result.innerHTML = `
      <div><strong>${content}</strong></div>
    `;
    result.classList.remove("loading");
  } catch (err) {
    result.innerHTML = `<div style="color: #d32f2f;">Error: ${err.message}</div>`;
    result.classList.remove("loading");
  }
}

btn.addEventListener("click", getQuote);
```

**✅ About this API:**
- **icanhazdadjoke.com** is a free dad joke API ([documentation](https://icanhazdadjoke.com/api))
- No authentication required!
- Returns JSON: `{ "id": "abc123", "joke": "...", "status": 200 }`
- **Important:** Include the `Accept: application/json` header to get JSON (not HTML)
- **Important:** Include a custom `User-Agent` header (good API citizenship!)

**🔄 Optional:** If you want to build your own Rails API later, just change the URL to `http://localhost:3000/quotes/random`

---

## 5) Load the extension in Chrome

1. Open **chrome://extensions**
2. Toggle **Developer mode** (top-right)
3. Click **Load unpacked** → select your `chrome-extension/` folder
4. You'll see your extension appear. Click the **puzzle icon** in the toolbar → **pin it** if you like
5. Click the **toolbar icon** → popup opens → hit **Get Joke**

**🐛 Debugging tip:** To see `console.log()` output or errors:
- Click your extension icon to open the popup
- Right-click **inside the popup** → **Inspect**
- This opens DevTools specifically for the popup

---

## 6) Optional: Build your own Rails API (if you want!)

**✨ Your extension already works with dad jokes!** This section is only if you want to create your own custom API with your own content (Guam/Chamorro quotes, recipes, tasks, game tips, etc.).

### A) Quick Rails route (example)

```ruby
# config/routes.rb
Rails.application.routes.draw do
  get "/quotes/random", to: "quotes#random"
end
```

```ruby
# app/controllers/quotes_controller.rb
class QuotesController < ApplicationController
  def random
    quotes = [
      { content: "Håfa Adai!", author: "Chamorro Greeting" },
      { content: "Keep shipping code!", author: "CSG" },
      { content: "Inafa'maolek - let us make it good together.", author: "Chamorro Value" }
    ]
    render json: quotes.sample
  end
end
```

**🧪 Test it first:** Before connecting your extension, visit `http://localhost:3000/quotes/random` in your browser or HTTPie. You should see JSON output.

### B) Enable CORS (so Chrome can fetch from localhost:3000)

**Add the gem:**

```ruby
# Gemfile
gem "rack-cors"
```

Run: `bundle install`

**Configure:**

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow localhost on any port (in case you run on 3001, etc.)
    origins "http://localhost:*", "chrome-extension://*"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]
  end
end
```

**⚠️ Restart Rails:** Changes to initializers require a server restart (`rails s`)

### C) Optional: Using API keys or secrets

If you extend this project to use external APIs (OpenAI, weather, etc.), **never hardcode API keys** in your code!

**Best practice:**
1. Add `gem "dotenv-rails"` to your Gemfile (development/test group)
2. Run `bundle install`
3. Create a `.env` file in your Rails root:
   ```
   OPENAI_API_KEY=your_key_here
   WEATHER_API_KEY=another_key
   ```
4. Add `.env` to your `.gitignore` (Rails does this by default)
5. Access in code: `ENV['OPENAI_API_KEY']`

**💡 Why?** Keeps secrets out of GitHub and makes them easy to change per environment.

---

## 7) Common pitfalls (fast fixes)

| Problem | Solution |
|---------|----------|
| **Nothing happens when clicking?** | Open the popup → right-click → Inspect → check **Console** for errors |
| **CORS error (blocked by CORS policy)** | Double-check `rack-cors` config and **restart Rails server** |
| **Network error** | Make sure Rails is running (`rails s`) and the URL matches your `manifest.json` `host_permissions` |
| **Manifest error on load** | Your `manifest.json` must be valid JSON (no trailing commas, correct keys) |
| **Extension not updating?** | After code changes, go to chrome://extensions and click the **refresh icon** on your extension |

---

## 8) Time budget (90 minutes)

- **Setup & manifest** (10 min)
- **Popup HTML/CSS** (10 min)
- **JavaScript fetch** (15 min)
- **Load extension & test with public API** (10 min)
- **Stretch goals / customization** (20 min)
- **Optional: Rails setup + CORS** (20 min) ← *Only if you want to build your own API*
- **Optional: Connect extension to Rails** (10 min)
- **Polish & troubleshooting** (5 min)

**💡 Pro tip:** The icanhazdadjoke API is perfect for getting started. If you want to build your own Rails API later, you can swap it in! This way you're not debugging Rails and the extension at the same time.

**🎯 Why icanhazdadjoke?**
- ✅ No API key needed (instant success!)
- ✅ Simple JSON structure
- ✅ Fun content (students love dad jokes!)
- ✅ Teaches proper headers (`Accept`, `User-Agent`)
- ✅ Great way to learn before building your own API

---

## 9) Stretch goals (choose 1)

### Option A: Persist last result
Use `chrome.storage.local` to save the last quote and show it when the popup opens.

### Option B: Options page
Let users set a custom API URL via an options page.

### Option C: Style it up
Add dark mode, animations, or a nicer layout.

### Option D: Multiple quotes
Show the last 3 quotes in a list instead of just one.

---

## 10) Advanced: Content script example (Optional — Try at home!)

⚠️ **This is a big conceptual leap from popup extensions.** Content scripts run in the page DOM with different security rules. Save this for after you've mastered popups!

### Important: Content Script Security & Privacy

**🔒 Content scripts have access to:**
- The full DOM of every page they run on
- User's browsing data on matched sites
- Ability to modify page content

**⚠️ Use responsibly:**
- Content scripts run on **every website** matching your pattern
- The pattern `["https://*/*"]` means **every HTTPS site the user visits**
- For learning/portfolio, be specific: `["https://www.example.com/*"]`
- Never collect or transmit user data without consent

**Add to manifest.json:**

```json
"content_scripts": [
  {
    // ⚠️ This runs on ALL sites! Be more specific for real projects:
    // "matches": ["https://www.google.com/*"],
    "matches": ["https://*/*", "http://*/*"],
    "js": ["content.js"]
  }
]
```

**Create content.js:**

```javascript
const badge = document.createElement("button");
badge.textContent = "Get Quote";
badge.style.position = "fixed";
badge.style.bottom = "16px";
badge.style.right = "16px";
badge.style.padding = "8px 12px";
badge.style.zIndex = "999999";
badge.style.background = "#4CAF50";
badge.style.color = "white";
badge.style.border = "none";
badge.style.borderRadius = "8px";
badge.style.cursor = "pointer";
document.body.appendChild(badge);

badge.addEventListener("click", async () => {
  const res = await fetch("https://icanhazdadjoke.com/", {
    headers: { 
      'Accept': 'application/json',
      'User-Agent': 'Learning Extension' 
    }
  });
  const data = await res.json();
  alert(data.joke);
});
```

Reload the extension and visit any site → button appears in bottom-right → click → quote!

**💡 Better practice:** Limit to specific sites where your extension adds value, like `"matches": ["https://github.com/*"]` for a GitHub-specific tool.

---

## 11) Demo checklist (end of class)

✅ Click the toolbar icon → popup opens

✅ Press "Get Joke" → see real data

✅ Each pair explains:
- What endpoint they used
- One thing they learned
- One idea for a next step

✅ **Bonus:** Show it to a neighbor for peer review

✅ **Bonus:** Push code to GitHub for your portfolio

---

## Quick "starter tasks" you can assign to pairs

| Pair | Task |
|------|------|
| **Pair A** (UI Styling) | Customize the popup with colors, fonts, and animations |
| **Pair B** (Dark Mode) | Add a dark mode toggle with CSS variables |
| **Pair C** (Storage) | Save the last 3 jokes using `chrome.storage.local` and display them |
| **Pair D** (Custom API) | Build a Rails API with your own content (Guam quotes, recipes, etc.) |
| **Pair E** (Content script) | Inject a "Get Joke" button on any webpage (advanced!) |
| **Pair F** (Options) | Add an `options.html` page to let users customize settings |

---

## Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/mv3/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [chrome.storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Public APIs for testing](https://github.com/public-apis/public-apis)

---

**Good luck building! 🚀 Remember: Start simple, get it working, then make it awesome.**

