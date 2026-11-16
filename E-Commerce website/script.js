document.addEventListener("DOMContentLoaded", function () {
  const CART_KEY = "blossom_cart";
  const WISH_KEY = "blossom_wishlist";

  // ---------- helpers ----------
  const $ = (id) => document.getElementById(id);
  const money = (n) => "\u20B9" + n.toLocaleString("en-IN");

  function load(key) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return Array.isArray(v) ? v : [];
    } catch (e) {
      return [];
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable (private mode etc.) - cart still works in memory */
    }
  }

  let toastTimer;
  function toast(message) {
    const el = $("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2500);
  }

  // ---------- product catalogue (read from the page itself) ----------
  const catalog = {};
  document.querySelectorAll(".product .box-container .box").forEach((box, i) => {
    const id = "p" + (i + 1);
    const nameEl = box.querySelector(".content h3");
    const priceEl = box.querySelector(".price");
    const imgEl = box.querySelector("img");
    if (!nameEl || !priceEl || !priceEl.firstChild) return;

    // price = the first text node only (the <span> holds the old, crossed-out price)
    const price = parseInt(priceEl.firstChild.textContent.replace(/[^\d]/g, ""), 10);
    catalog[id] = {
      id: id,
      name: nameEl.textContent.trim() + " #" + (i + 1),
      price: price,
      img: imgEl ? imgEl.getAttribute("src") : "",
    };
    box.dataset.productId = id;
  });

  // Only keep valid {id, qty} pairs; name/price always come from the page, never from storage
  let cart = load(CART_KEY)
    .filter((it) => it && catalog[it.id] && Number.isInteger(it.qty) && it.qty > 0)
    .map((it) => ({ id: it.id, qty: Math.min(it.qty, 99) }));
  let wishlist = load(WISH_KEY).filter((id) => catalog[id]);

  // ---------- cart panel ----------
  const panel = $("cart-panel");
  const wishPanel = $("wishlist-panel");
  const overlay = $("cart-overlay");

  function closeCart() {
    [panel, wishPanel].forEach((p) => {
      p.classList.remove("open");
      p.setAttribute("aria-hidden", "true");
    });
    overlay.classList.remove("open");
  }
  function openPanel(p) {
    closeCart(); // never show both panels at once
    p.classList.add("open");
    p.setAttribute("aria-hidden", "false");
    overlay.classList.add("open");
  }
  const openCart = () => openPanel(panel);
  const openWishlist = () => openPanel(wishPanel);

  function renderCart() {
    const list = $("cart-items");
    list.innerHTML = "";
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
      const empty = document.createElement("p");
      empty.className = "cart-empty";
      empty.textContent = "Your cart is empty.";
      list.appendChild(empty);
    }

    cart.forEach((item) => {
      const p = catalog[item.id];
      total += p.price * item.qty;
      count += item.qty;

      const row = document.createElement("div");
      row.className = "cart-item";
      row.dataset.id = item.id;
      row.innerHTML =
        '<img alt="">' +
        '<div class="info"><h4></h4><span></span>' +
        '<div class="qty">' +
        '<button type="button" data-action="dec" aria-label="Decrease quantity">&minus;</button>' +
        "<b></b>" +
        '<button type="button" data-action="inc" aria-label="Increase quantity">+</button>' +
        "</div></div>" +
        '<button type="button" class="remove" data-action="remove" aria-label="Remove item">&times;</button>';
      row.querySelector("img").src = p.img;
      row.querySelector("h4").textContent = p.name;
      row.querySelector(".info span").textContent = money(p.price);
      row.querySelector("b").textContent = item.qty;
      list.appendChild(row);
    });

    $("cart-total").textContent = money(total);
    $("checkout-btn").disabled = cart.length === 0;

    const badge = $("cart-count");
    badge.textContent = count;
    badge.classList.toggle("empty", count === 0);

    save(CART_KEY, cart);
  }

  function syncHearts() {
    document.querySelectorAll(".product .box-container .box").forEach((box) => {
      const heart = box.querySelector(".image .icons .fa-heart");
      if (heart) heart.classList.toggle("active", wishlist.includes(box.dataset.productId));
    });
  }

  function renderWishlist() {
    const list = $("wishlist-items");
    list.innerHTML = "";

    if (wishlist.length === 0) {
      const empty = document.createElement("p");
      empty.className = "cart-empty";
      empty.textContent = "Your wishlist is empty.";
      list.appendChild(empty);
    }

    wishlist.forEach((id) => {
      const p = catalog[id];
      const row = document.createElement("div");
      row.className = "cart-item";
      row.dataset.id = id;
      row.innerHTML =
        '<img alt="">' +
        '<div class="info"><h4></h4><span></span><br>' +
        '<button type="button" class="add-btn" data-action="to-cart">add to cart</button></div>' +
        '<button type="button" class="remove" data-action="remove" aria-label="Remove from wishlist">&times;</button>';
      row.querySelector("img").src = p.img;
      row.querySelector("h4").textContent = p.name;
      row.querySelector(".info span").textContent = money(p.price);
      list.appendChild(row);
    });

    const badge = $("wishlist-count");
    badge.textContent = wishlist.length;
    badge.classList.toggle("empty", wishlist.length === 0);

    syncHearts();
    save(WISH_KEY, wishlist);
  }

  function addToCart(id) {
    const existing = cart.find((it) => it.id === id);
    if (existing) {
      existing.qty = Math.min(existing.qty + 1, 99);
    } else {
      cart.push({ id: id, qty: 1 });
    }
    renderCart();
    toast(catalog[id].name + " added to cart");
  }

  $("cart-items").addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = btn.closest(".cart-item").dataset.id;
    const item = cart.find((it) => it.id === id);
    if (!item) return;

    if (btn.dataset.action === "inc") item.qty = Math.min(item.qty + 1, 99);
    if (btn.dataset.action === "dec") item.qty -= 1;
    if (btn.dataset.action === "remove") item.qty = 0;
    cart = cart.filter((it) => it.qty > 0);
    renderCart();
  });

  $("cart-toggle").addEventListener("click", function (e) {
    e.preventDefault();
    openCart();
  });
  $("wishlist-toggle").addEventListener("click", function (e) {
    e.preventDefault();
    openWishlist();
  });
  $("wishlist-close").addEventListener("click", closeCart);
  $("user-toggle").addEventListener("click", function (e) {
    e.preventDefault();
    toast("Accounts are not available in this demo");
  });

  $("wishlist-items").addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = btn.closest(".cart-item").dataset.id;
    if (btn.dataset.action === "remove") {
      wishlist = wishlist.filter((w) => w !== id);
      renderWishlist();
    } else if (btn.dataset.action === "to-cart") {
      addToCart(id);
    }
  });

  $("cart-close").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeCart();
  });

  $("clear-cart").addEventListener("click", function () {
    cart = [];
    renderCart();
  });

  // Demo checkout: there is no backend or payment gateway, so this only confirms the order.
  $("checkout-btn").addEventListener("click", function () {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, it) => sum + catalog[it.id].price * it.qty, 0);
    cart = [];
    renderCart();
    closeCart();
    toast("Order placed (demo)! Total " + money(total) + ". Thank you!");
  });

  // ---------- product cards: add to cart, wishlist, share ----------
  document.querySelectorAll(".product .box-container .box").forEach((box) => {
    const id = box.dataset.productId;
    if (!id) return;

    box.addEventListener("click", function (e) {
      const link = e.target.closest(".image .icons a");
      if (!link) return;
      e.preventDefault();

      if (link.classList.contains("cart")) {
        addToCart(id);
      } else if (link.classList.contains("fa-heart")) {
        const nowActive = !wishlist.includes(id);
        wishlist = nowActive
          ? wishlist.concat(id)
          : wishlist.filter((w) => w !== id);
        renderWishlist();
        toast(nowActive ? "Added to wishlist" : "Removed from wishlist");
      } else if (link.classList.contains("fa-share")) {
        const url = window.location.href.split("#")[0] + "#product";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(
            () => toast("Link copied to clipboard"),
            () => toast("Could not copy the link")
          );
        } else {
          toast("Sharing is not supported in this browser");
        }
      }
    });
  });

  // ---------- contact form ----------
  const form = $("messageForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      toast("Thanks for reaching out to us!");
      form.reset();
    });
  }

  renderCart();
  renderWishlist();
});