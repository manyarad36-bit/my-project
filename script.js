const products = [
    {
        id: 1,
        name: "Phone Model A",
        price: 799,
        image: "https://images.unsplash.com/photo-1623593476267-c7e98d1fb572?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhbXN1bmclMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
        features: ["6-inch Display", "90MP Triple Camera", "Fast Charging", "5G Connectivity"]
    },
    {
        id: 2,
        name: "Phone Model B",
        price: 699,
        image: "https://plus.unsplash.com/premium_photo-1681313824743-7b5a2a635938?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aSUyMHBob25lfGVufDB8fDB8fHww",
        features: ["5.8-inch Display", "64MP Camera", "All Day Battery", "5G Ready"]
    },
    {
        id: 3,
        name: "Phone Model C",
        price: 599,
        image: "https://images.unsplash.com/photo-1572069438926-cb9e0a5806d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90b3JvbGF8ZW58MHx8MHx8fDA%3D",
        features: ["6.1-inch Display", "48MP Camera", "Wireless Charging", "5G Support"]
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification(`${product.name} added to cart!`);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}


function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item && quantity > 0) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}


function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid && products.length > 0) {
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
                <a href="3.html?id=${product.id}">View Details</a>
            </div>
        `).join('');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 20px;
        right: 20px;
        background: #4e73df;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function validateSignUpForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
        alert('All fields are required!');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters!');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address!');
        return false;
    }

    alert('Account created successfully!');
    console.log('User registered:', { name, email });
    return false;
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function searchProducts(searchTerm) {
    return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
    );
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function loadDarkModePreference() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

function sortProducts(sortBy) {
    if (sortBy === 'price-low') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
    displayProducts();
}


document.addEventListener('DOMContentLoaded', function() {
    loadDarkModePreference();
    displayProducts();


    const signupForm = document.querySelector('form');
    if (signupForm) {
        signupForm.addEventListener('submit', validateSignUpForm);
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .dark-mode {
        background-color: #035c0c;
        color: #dacece;
    }

    .dark-mode header {
        background: rgba(30, 30, 30, 0.9);
    }

    .dark-mode .product-card {
        background: #333;
        color: #cc8411;
    }
`;
document.head.appendChild(style);
