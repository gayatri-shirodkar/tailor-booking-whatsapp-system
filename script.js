// Initialize EmailJS with your public key
// emailjs.init("YOUR_PUBLIC_KEY");

let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({item, price});
  total += price;
  displayCart();

  // ✅ Scroll to cart section smoothly
  document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
}

function displayCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  cart.forEach(c => {
    let li = document.createElement('li');
    li.textContent = c.item + " - ₹" + c.price;
    cartList.appendChild(li);
  });
  document.getElementById('cart-total').textContent = total;
  document.getElementById('cart-count').textContent = cart.length; // ✅ updates badge
}

function checkout() {
  let name = document.getElementById('customer-name').value;
  let phone = document.getElementById('customer-phone').value;
  let address = document.getElementById('customer-address').value;
  let delivery = document.getElementById('delivery').value;
  let payment = document.getElementById('payment').value;
  let finalTotal = total;

  if (delivery === "Express") {
    finalTotal += 100;
  }

  // 🛒 Get cart items
  let items = cart.map(c => `${c.item} - ₹${c.price}`).join('%0A');

  // 📱 WhatsApp message format
  let message = `🧵 *New Order - Gayatri Tailors* %0A%0A
👤 Name: ${name} %0A
� Phone: ${phone} %0A
�📍 Address: ${address} %0A
🚚 Delivery: ${delivery} %0A
💰 Payment: ${payment} %0A%0A
🛒 *Items:* %0A${items} %0A%0A
💵 Total: ₹${finalTotal}`;

  // 🔗 Your WhatsApp number (India format)
  let phoneNumber = "916363939138";

  let url = `https://wa.me/${phoneNumber}?text=${message}`;

  // 🚀 Redirect to WhatsApp
  window.open(url, '_blank');
}
