# 😄 CSG Dad Jokes Chrome Extension

A Chrome extension learning project for Code School of Guam students. Fetch dad jokes from a public API and display them in a clean popup interface. Optional: Build your own Rails API with custom content!

## 📁 Project Structure

```
dad-jokes-extension/
  ├─ manifest.json               ← Extension configuration
  ├─ popup.html                  ← Popup UI
  ├─ popup.js                    ← Main popup logic
  ├─ icon128.png                 ← Extension icon
  ├─ README.md                   ← Quick start guide (this file)
  └─ CHROME_EXTENSION_GUIDE.md  ← Full 90-minute teaching guide
```

**Optional Rails API:** If you want to build your own API with custom content (Guam quotes, recipes, etc.), check out the teaching guide Section 6!

## 🚀 Quick Start (Test the Extension)

### Step 1: Load the Extension in Chrome

1. Open Chrome and go to **chrome://extensions**
2. Toggle **Developer mode** ON (top-right corner)
3. Click **Load unpacked**
4. Select this folder (the one containing `manifest.json`)
5. The extension will appear in your extensions list

### Step 2: Pin the Extension (Optional)

1. Click the **puzzle icon** (🧩) in your Chrome toolbar
2. Find "CSG Dad Jokes" and click the **pin icon** to keep it visible

### Step 3: Test It!

1. Click the **CSG Dad Jokes icon** in your toolbar
2. A popup will appear
3. Click **Get Joke**
4. You should see a random dad joke from the icanhazdadjoke API

### Step 4: Inspect & Debug

- Right-click inside the popup → **Inspect** to open DevTools
- Check the Console for any errors or `console.log()` output

## 🔧 Customization

### Optional: Connect to Your Own Rails API (If You Want!)

If you build your own Rails API with custom content, switching is easy!

1. Open `popup.js`
2. Change line 2 from:
   ```javascript
   const API_URL = "https://icanhazdadjoke.com/";
   ```
   to:
   ```javascript
   const API_URL = "http://localhost:3000/quotes/random";
   ```
3. Go to **chrome://extensions** and click the **refresh icon** on your extension
4. Click your extension → now it fetches from your Rails API!

### Optional: Build Your Own Rails API

**Your extension already works with dad jokes!** But if you want to build your own API with custom content (quotes, recipes, facts, etc.), see **Section 6** in the `CHROME_EXTENSION_GUIDE.md`.

You can create an API that returns:
- 🌴 Guam/Chamorro quotes
- 🍝 Favorite recipes
- 📚 Book recommendations
- 🎮 Game tips
- Or anything else you want!

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Extension won't load** | Check that `manifest.json` is valid JSON (no syntax errors) |
| **Nothing happens when clicking** | Right-click popup → Inspect → check Console for errors |
| **CORS error** | Make sure `rack-cors` is configured and Rails server restarted |
| **Changes not showing** | Go to chrome://extensions and click the refresh icon on your extension |

## 📚 Learning Resources

- Full teaching guide: `CHROME_EXTENSION_GUIDE.md`
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/mv3/)
- [Manifest V3 Overview](https://developer.chrome.com/docs/extensions/mv3/intro/)

## 🎯 What's Working Out of the Box

✅ Fetches dad jokes from icanhazdadjoke.com (no Rails needed to start!)  
✅ Proper API headers (`Accept` and `User-Agent`)  
✅ Clean, simple UI with loading states  
✅ Error handling  
✅ Ready to customize and extend  

## 💡 Next Steps (Pick What Interests You!)

1. Style the popup with custom colors/fonts
2. Add dark mode or animations
3. Save the last 3 quotes using `chrome.storage.local`
4. Add an options page to customize the API URL
5. **Optional:** Build your own Rails API with custom content (see Section 6 in the guide)

---

**Built for Code School of Guam students** 🌴 **Keep shipping!**

