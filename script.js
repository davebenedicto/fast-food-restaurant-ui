let cart = JSON.parse(localStorage.getItem('bqCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initAnimations();

  // Featured Toggle
  const toggleBtn = document.getElementById('toggleMenu');
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      const grid = document.getElementById('featuredGrid');
      grid.style.display = grid.style.display === 'none' ? 'grid' : 'none';
    };
  }

  // Reservation Logic 
  const modal = document.getElementById('resModal');
  if (modal) {
    document.querySelectorAll('.open-res').forEach(btn => {
      btn.onclick = () => modal.style.display = 'flex';
    });
    document.querySelectorAll('.closeModal').forEach(btn => {
      btn.onclick = () => modal.style.display = 'none';
    });
    document.querySelectorAll('.reservationForm').forEach(form => {
      form.onsubmit = (e) => {
        e.preventDefault();
        const nameInput = form.querySelector('.custName');
        const name = nameInput ? nameInput.value : 'Majesty';
        Swal.fire('Reserved!', `Table saved for ${name}.`, 'success');
        modal.style.display = 'none';
      };
    });
  }
});

function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  });
  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('active');
}

function addToCart(name, price, img) {
  cart.push({ name, price, img });
  saveAndRefresh();
  Swal.fire({ title: 'Added!', text: `${name} added to bag.`, icon: 'success', timer: 1500, showConfirmButton: false, toast: true, position: 'top-end' });
}

function removeItem(index) {
  cart.splice(index, 1);
  saveAndRefresh();
}

function saveAndRefresh() {
  localStorage.setItem('bqCart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cart-count');
  const list = document.getElementById('cartItems');
  const totalEl = document.getElementById('cart-total');
  if (!badge) return;

  badge.innerText = cart.length;
  list.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    list.innerHTML += `<div class="cart-item"><img src="${item.img}"><div style="flex:1"><h4 style="font-family:'Titan One'">${item.name}</h4><p>P${item.price}.0</p></div><button onclick="removeItem(${index})" style="color:red; background:none; border:none; cursor:pointer; font-weight:bold; font-size:1.2rem;">&times;</button></div>`;
  });
  if (cart.length === 0) list.innerHTML = '<p style="text-align:center; color:#999; margin-top:50px;">Cart is empty.</p>';
  totalEl.innerText = `P${total}.0`;
}

function checkout() {
  if (cart.length === 0) return Swal.fire('Wait!', 'Bag is empty!', 'warning');
  Swal.fire('Order Placed!', 'The Queen is preparing your feast.', 'success');
  cart = []; saveAndRefresh(); toggleCart();
}