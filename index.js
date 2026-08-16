let cart = [];

// ===== CART FUNCTIONS =====
function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
  bounceCart(); // bounce the cart icon
  
  // Button feedback
  const btn = event.target;
  const originalText = btn.innerText;
  btn.innerText = "✓ Added!";
  btn.style.background = "#28a745";
  setTimeout(() => {
    btn.innerText = originalText;
    btn.style.background = "#d4af37";
  }, 1000);
}

function updateCart() {
  document.getElementById('cartCount').innerText = cart.length;
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>₦${item.price.toLocaleString()}</span>
      </div>
    `;
  });
  document.getElementById('cartTotal').innerText = total.toLocaleString();
}

function toggleCart() {
  document.getElementById('cart').classList.toggle('active');
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('show');
}

function checkout() {
  if(cart.length === 0) return alert('Cart is empty');
  let message = 'Hello JOCÉE, I want to order:%0A';
  cart.forEach(item => message += `- ${item.name} - ₦${item.price.toLocaleString()}%0A`);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `Total: ₦${total.toLocaleString()}`;
  window.open(`https://wa.me/2348000000?text=${message}`);
}

// ===== CART BOUNCE ANIMATION =====
function bounceCart() {
  const cartIcon = document.querySelector('.nav-icons span');
  cartIcon.classList.add('bounce');
  setTimeout(() => cartIcon.classList.remove('bounce'), 600);
}

// ===== SCROLL ANIMATION FOR PRODUCTS =====
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 }); 

  document.querySelectorAll('.product').forEach(product => {
    observer.observe(product);
  });
});

// ===== SMOOTH SCROLL FOR ALL LINKS =====
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ 
        target.scrollIntoView({ behavior: 'smooth' }); 
      }
      document.getElementById('navLinks').classList.remove('show');
    });
  });
}); 