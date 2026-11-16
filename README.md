# 🌐 Web Development Projects

A collection of beginner-to-intermediate front-end projects built with **HTML, CSS, and vanilla JavaScript**, no frameworks or build tools.

🔗 **[View all live demos](https://snehac11.github.io/web-dev-projects/)**

## 📚 Projects

| # | Project | Type | What it showcases |
|---|---------|------|-------------------|
| 1 | [Currency Converter](https://snehac11.github.io/web-dev-projects/Currency%20convertor/) | Utility app | Fetch API, async/await, live exchange rates |
| 2 | [E-Commerce Website](https://snehac11.github.io/web-dev-projects/E-Commerce%20website/) | Multi-section site | Working cart & wishlist, `localStorage`, responsive layout |
| 3 | [Restaurant Website](https://snehac11.github.io/web-dev-projects/Restaurant%20website/) | Landing page | Menu sections, scroll-aware header, contact form |
| 4 | [Snake Game](https://snehac11.github.io/web-dev-projects/Snake%20game/) | Game | Game loop, collision logic, sound effects, high score |
| 5 | [Stone Paper Scissors](https://snehac11.github.io/web-dev-projects/Stone%20paper%20scissor%20game/) | Game | DOM events, randomness, score tracking |
| 6 | [Tic-Tac-Toe](https://snehac11.github.io/web-dev-projects/TicTacToe%20game/) | Game | Win-pattern logic, game state, reset flow |

---

## 1. 💱 Currency Converter

🔗 **[Live Demo](https://snehac11.github.io/web-dev-projects/Currency%20convertor/)** · 📂 [Source Code](./Currency%20convertor)
Converts an amount between world currencies using live exchange rates.

- Dropdowns populated dynamically from a currency-to-country map (`codes.js`)
- Country flag updates automatically when a currency is selected
- Fetches rates from the [fawazahmed0 currency API](https://github.com/fawazahmed0/currency-api) via `fetch` + `async/await`
- Defaults to USD → INR and converts on page load; invalid or empty amounts reset to 1

**Stack:** HTML, CSS, JavaScript · **Needs internet** (rates and flag images are loaded from external services)

## 2. 🌸 E-Commerce Website (Blossom)

🔗 **[Live Demo](https://snehac11.github.io/web-dev-projects/E-Commerce%20website/)** · 📂 [Source Code](./E-Commerce%20website)
A flower-shop storefront with a working shopping cart and wishlist.

- Sections: Home, About (with autoplay video), Products, Reviews, Contact
- **Shopping cart:** add to cart, quantity +/− controls, remove items, running total in ₹, and a live item-count badge in the header
- **Wishlist:** heart any product, view saved items in a side panel, move them to the cart, or remove them
- **Persistent:** cart and wishlist survive page refreshes using `localStorage`
- Demo checkout that confirms the order total (no backend or payment gateway)
- Share button copies a link to the product section
- "Why choose us" feature cards, customer reviews, and a footer with quick links
- Contact form with an on-page confirmation message
- Font Awesome icons; responsive with a checkbox-driven mobile menu

**Stack:** HTML, CSS, JavaScript (DOM manipulation, event delegation, `localStorage`)

## 3. 🍽️ Restaurant Website (The Big Bite)

🔗 **[Live Demo](https://snehac11.github.io/web-dev-projects/Restaurant%20website/)** · 📂 [Source Code](./Restaurant%20website)
A landing page for a multi-cuisine restaurant.

- Hero banner, About Us, Menu (Breakfast / Lunch / Dinner with images), and Timings
- Header that hides on scroll-down and reappears on scroll-up
- Smooth in-page navigation and a back-to-top button
- Contact form section
- Google Fonts (Fredoka) and Font Awesome icons

**Stack:** HTML, CSS, JavaScript

## 4. 🐍 Snake Game (SnakeMania)

🔗 **[Live Demo](https://snehac11.github.io/web-dev-projects/Snake%20game/)** · 📂 [Source Code](./Snake%20game)
The classic snake game with sound and persistent scoring.

- **Controls:** Arrow keys (any key press starts the game)
- Grid-based movement driven by `requestAnimationFrame`
- Collision detection for walls and self
- Food, move, game-over, and background music sound effects
- Current score plus **high score saved in `localStorage`**

**Stack:** HTML, CSS, JavaScript

## 5. ✊✋✌️ Stone Paper Scissors

🔗 **[Live Demo](https://snehac11.github.io/web-dev-projects/Stone%20paper%20scissor%20game/)** · 📂 [Source Code](./Stone%20paper%20scissor%20game)
Play against the computer.

- Click a choice; the computer picks randomly
- Win / lose / draw feedback with color-coded messages
- Running scoreboard for you and the computer

**Stack:** HTML, CSS, JavaScript

## 6. ⭕❌ Tic-Tac-Toe

🔗 **[Live Demo](https://snehac11.github.io/web-dev-projects/TicTacToe%20game/)** · 📂 [Source Code](./TicTacToe%20game)
Two-player game on a 3×3 board.

- Alternating turns (O goes first)
- Checks all 8 winning patterns after every move
- Draw detection, winner announcement, and New Game / Reset buttons

**Stack:** HTML, CSS, JavaScript

---

## 🚀 Getting Started

No installation needed.

```bash
# Clone the repository
git clone https://github.com/SnehaC11/web-dev-projects.git
cd web-dev-projects
```

Then open the `index.html` file inside any project folder in your browser. Optionally, use the VS Code **Live Server** extension for auto-reload.

## 📁 Repository Structure

```
.
├── Currency convertor/
├── E-Commerce website/
├── Restaurant website/
├── Snake game/
├── Stone paper scissor game/
├── TicTacToe game/
└── README.md
```

Each project folder contains `index.html`, `style.css`, `script.js`, plus any images or audio it needs.

## 🛠️ Tech Used
- HTML5
- CSS3 (Flexbox, Grid, responsive design)
- JavaScript (ES6+, DOM manipulation, Fetch API, `localStorage`)
- Font Awesome and Google Fonts
