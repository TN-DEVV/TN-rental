const container = document.querySelector('.container');
const carContainer = document.querySelector('.con2_2');
const priceElement = document.getElementById('price');
let categories = [];

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        container.style.display = 'none';
        updatePayment();
        fetch('https://TN-rental/close', { method: 'POST' });
    }
}

function closeNui() {
    container.style.display = 'none';
    updatePayment();
    fetch('https://TN-rental/close', { method: 'POST' });
}

function updatePayment() {
    const selectedCar = document.querySelector('.car.active');
    if (selectedCar) {
        document.getElementById('quantity').value = 1;
        valueCount = 1;
        const carPrice = selectedCar.querySelector('.line').innerText.substring(1);
        updateTotalPrice(carPrice * 1);
    }
}

// Function to handle payment with banking card
function payWithCard() {
    handlePayment('bank');
}

// Function to handle payment with cash
function payWithCash() {
    handlePayment('cash');
}

// Common function to handle payment
function handlePayment(paymentMethod) {
    const selectedCar = document.querySelector('.car.active');
    if (selectedCar) {
        const carName = selectedCar.querySelector('p').innerText;
        const carPrice = selectedCar.querySelector('.line').innerText.substring(1);
        const rentTime = document.getElementById('quantity').value;

        const paymentData = {
            carname: carName,
            payment: carPrice * rentTime,
            renttime: rentTime,
            paymentmethod: paymentMethod,
        };

        // Use fetch to send the payment data
        fetch('https://TN-rental/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        // Close the container after payment
        container.style.display = 'none';
        updatePayment();
    }
}


function updateCategoriesList() {
    const categoryList = document.querySelector('.con2_1 ul');
    categoryList.innerHTML = '';
    categories.forEach(category => {
        categoryList.innerHTML += `<li><button class="menu-btn" id="${category.name}">${category.name}</button></li>`;
    });

    categoryList.addEventListener('click', handleCategoryButtonClick);
}

function showCarsInCategory(category) {
    resetActiveCar();
    carContainer.innerHTML = '';

    let firstCarPrice = 0;

    categories.forEach(categoryData => {
        if (category === categoryData.name || category === 'All') {
            categoryData.cars.forEach((car, index) => {
                const carButton = createCarButton(car, category, 'All');
                carContainer.appendChild(carButton);

                if (index === 0) {
                    firstCarPrice = car.price;
                    carButton.classList.add('active'); // Add 'active' class to the first car in the selected category
                }
            });
        }
    });

    updateTotalPrice(firstCarPrice);
    handleQuantityChange();
}

function createCarButton(car, category, allClass) {
    const carButton = document.createElement('button');
    carButton.classList.add('car', category, allClass);
    carButton.innerHTML = `
        <p>${car.name}</p>
        <div class="image-container">
            <img src="imgs/${car.name}.png" alt="${car.name}">
        </div>
        <p>Day</p>
        <p class="line">$${car.price}</p>
    `;
    carButton.addEventListener('click', handleCarButtonClick);

    return carButton;
}

function handleQuantityChange() {
    const selectedCar = document.querySelector('.car.active');
    if (selectedCar) {
        const carPrice = selectedCar.querySelector('.line').innerText.substring(1);
        updateTotalPrice(carPrice * valueCount); // Update total price based on quantity change
    }
}


function handleCarButtonClick(event) {
    resetActiveCar();
    const selectedCar = event.target;
    selectedCar.classList.add('active');
    
    const carPrice = selectedCar.querySelector('.line').innerText.substring(1);
    const quantity = document.getElementById('quantity').value;

    updateTotalPrice(carPrice * quantity);
}

function updateTotalPrice(price) {
    priceElement.innerText = price;
}

function resetActiveBtns() {
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active-btn');
    });
}

function resetActiveCar() {
    document.querySelectorAll('.car').forEach(btn => {
        btn.classList.remove('active');
    });
}

function handleCategoryButtonClick(event) {
    resetActiveBtns();
    const category = event.target.id;
    event.target.classList.add('active-btn');
    showCarsInCategory(category);
    handleQuantityChange();
}

document.getElementById('quantity').addEventListener('input', handleQuantityChange);

document.querySelector('.plus-btn').addEventListener('click', function () {
    valueCount = document.getElementById('quantity').value;
    valueCount++;
    document.getElementById('quantity').value = valueCount;
    handleQuantityChange();
});

document.querySelector('.minus-btn').addEventListener('click', function () {
    valueCount = document.getElementById('quantity').value;
    valueCount = Math.max(1, valueCount - 1);
    document.getElementById('quantity').value = valueCount;
    handleQuantityChange();

    // Remove the disabled attribute
    document.querySelector('.minus-btn').removeAttribute('disabled');
});


// Add event listener to Banking Card button
document.getElementById('bankingCardBtn').addEventListener('click', payWithCard);

// Add event listener to Pay via Cash button
document.getElementById('cashBtn').addEventListener('click', payWithCash);


const menuBtns = document.querySelectorAll('.menu-btn');
menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        resetActiveBtns();
        showCarsInCategory(btn.id);
        btn.classList.add('active-btn');
    });
});

window.addEventListener('message', function (event) {
    if (event.data.action === 'show') {
        container.style.display = 'block';
        categories = event.data.data.categories;
        updateCategoriesList();
        showCarsInCategory(categories[0].name);
        resetActiveBtns(); // Reset initially active button
        const firstCategoryButton = document.querySelector('.con2_1 .menu-btn'); // Select the first category button
        if (firstCategoryButton) {
            firstCategoryButton.classList.add('active-btn');
        }
    }
});


// Escape key event
window.addEventListener('keydown', handleEscapeKey);
