// Product Data
const products = [
  {
    id: 1,
    title: "B8 Frog",
    description: "Rotary Drawing Stencil - Twist Art B Series",
    price: "5,000",
    category: "Twist Art",
    icon: "<img src = 'photos/B8-Frog.png' alt='B8 Frog' style='width: 100%; height: auto;'>",
    // Using an image tag for the icon to allow for larger images
    // Using an image tag for the icon to allow for larger images
  },
  {
    id: 2,
    title: "B7-Dog",
    description: "Rotary Drawing Stencil - Twist Art B Series",
    price: "5,000",
    category: "Twist Art",
    icon: "<img src = 'photos/B7-Dog.png' alt='B8 Frog' style='width: 100%; height: auto;'>",
  },
  {
    id: 3,
    title: "B6 Elephant",
    description: "Rotary Drawing Stencil - Twist Art B Series",
    price: "5,000",
    category: "Twist Art",
    icon: "<img src = 'photos/B6-Elephant.png' alt='B8 Frog' style='width: 100%; height: auto;'>",
  },
  {
    id: 4,
    title: "Custom Keychain",
    description: "Personalized keychains with your logo or design",
    price: "3,000",
    category: "custom",
    icon: "🔑",
  },
  {
    id: 5,
    title: "Desk Organizer",
    description: "Multi-compartment organizer for pens, clips, and supplies",
    price: 18.99,
    category: "home",
    icon: "📝",
  },
  {
    id: 6,
    title: "Gaming Dice Set",
    description: "Custom D&D dice set with unique designs",
    price: 22.99,
    category: "miniatures",
    icon: "🎲",
  },
  {
    id: 7,
    title: "Replacement Parts",
    description: "Custom replacement parts for various devices",
    price: "10,000 - 50,000",
    // Price range for custom parts
    category: "custom",
    icon: "⚙️",
  },
  {
    id: 8,
    title: "Decorative Vase",
    description: "Modern geometric vase for home decoration",
    price: 25.99,
    category: "home",
    icon: "🏺",
  },
  {
    id: 9,
    title: "Car Key Holder",
    description: "Wall-mounted key holder for car keys",
    price: "5,000",
    category: "custom",
    icon: "🗝️",
  },
  {
    id: 10,
    title: "fatman",
    description: "Custom action figures based on your specifications",
    price: "30,000",
    category: "figures",
    icon: "<img src = 'photos/fatman.png' alt='B8 Frog' style='width: 100%; height: auto;'>",
  },
  {
    id: 11,
    title: "Prototype Parts",
    description: "Rapid prototyping for your custom designs",
    price: "15,000 - 100,000",
    // Price range for prototype parts
    category: "custom",
    icon: "🔧",
  },
  {
    id: 12,
    title: "Cup Holder ",
    description: "Custom cup holder inserts for any desk",
    price: "35,000",
    category: "custom",
    icon: "<img src = 'photos/cup-holder.png' alt='B8 Frog' style='width: 100%; height: auto;'>",
  },
];

// Shopping Cart
let cart = [];

// DOM Elements
const productsGrid = document.getElementById("products-grid");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  displayProducts(products);
  updateCartUI();

  // Smooth scrolling for navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // CTA button smooth scroll
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      e.preventDefault();
      const storeSection = document.querySelector("#store");
      if (storeSection) {
        storeSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
});

// Display products
function displayProducts(productsToShow) {
  productsGrid.innerHTML = "";

  productsToShow.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Create product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("data-category", product.category);

  card.innerHTML = `
        <div class="product-image">
           ${product.icon} 
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">IQD ${product.price}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                🛒 Add to Cart
            </button>
        </div>
    `;

  return card;
}

// Filter products
function filterProducts(category) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => btn.classList.remove("active"));

  const activeButton = [...filterButtons].find(
    (btn) =>
      btn.textContent.toLowerCase().includes(category) ||
      (category === "all" && btn.textContent === "All Products")
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }

  if (category === "all") {
    displayProducts(products);
  } else {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    displayProducts(filteredProducts);
  }
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCartUI();
  showCartNotification();
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

// Update cart UI
function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: red;">×</button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  // Update total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = total.toFixed(2);
}

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle("open");
  cartOverlay.classList.toggle("active");

  // Prevent body scroll when cart is open
  if (cartSidebar.classList.contains("open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

// Show cart notification
function showCartNotification() {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1002;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
    `;
  notification.textContent = "✓ Added to cart!";

  // Add CSS animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.5s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 500);
  }, 2500);
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Create WhatsApp message
  let message = "Hello! I'd like to order the following items:%0A%0A";

  cart.forEach((item) => {
    message += `• ${item.title} (${item.quantity}x) - $${(
      item.price * item.quantity
    ).toFixed(2)}%0A`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `%0ATotal: $${total.toFixed(2)}%0A%0A`;
  message += "Please confirm the order and delivery details. Thank you!";

  // Replace with your actual WhatsApp number
  const whatsappNumber = "9647750000414";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  // Open WhatsApp
  window.open(whatsappUrl, "_blank");

  // Clear cart after order
  cart = [];
  updateCartUI();
  toggleCart();
}

// Close cart when clicking outside
document.addEventListener("click", function (e) {
  if (
    cartSidebar.classList.contains("open") &&
    !cartSidebar.contains(e.target) &&
    !e.target.classList.contains("cart-icon") &&
    !e.target.closest(".cart-icon")
  ) {
    toggleCart();
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && cartSidebar.classList.contains("open")) {
    toggleCart();
  }
});

// Add loading animation for product images
function addImageLoadingEffect() {
  const productImages = document.querySelectorAll(".product-image");
  productImages.forEach((image) => {
    image.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    image.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
}

// Call the function after products are loaded
setTimeout(addImageLoadingEffect, 100);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".product-card, .about-card, .contact-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Mobile menu toggle (for future mobile menu implementation)
function toggleMobileMenu() {
  // Implementation for mobile menu toggle
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("mobile-open");
}
