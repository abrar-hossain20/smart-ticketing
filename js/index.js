const chairs = document.querySelectorAll('.seat');
const selectedChairs = [];
let totalCost;
let phone = '';
let discount = 0;

updateTable();
updateNextButton();

function seatSelect() {
    const chair = this;

    if (selectedChairs.length === 4 && !chair.classList.contains('bg-selected')) {
        document.getElementById('error-message').classList.remove('hidden');

    }
    else {
        document.getElementById('error-message').classList.add('hidden');
        chair.classList.toggle('bg-selected');
        chair.classList.toggle('text-white');
        const chairName = chair.textContent;
        const chairClass = 'Economy';
        const chairPrice = 550;

        let availableChair = parseInt(document.getElementById('available-seats').textContent);
        let selectedChair = parseInt(document.getElementById('selected-seats').textContent);

        if (chair.classList.contains('bg-selected')) {
            availableChair--;
            selectedChair++;
            selectedChairs.push({ name: chairName, class: chairClass, price: chairPrice });
        } else {
            availableChair++;
            selectedChair--;
            const index = selectedChairs.findIndex(s => s.name === chairName);
            if (index !== -1) {
                selectedChairs.splice(index, 1);
            }
        }
        document.getElementById('available-seats').textContent = availableChair;
        document.getElementById('selected-seats').textContent = selectedChair;
        if (selectedChairs.length) {
            document.getElementById('next-btn').removeAttribute('disabled');
        }
        else {
            document.getElementById('next-btn').setAttribute('disabled', 'disabled');
        }
        if (selectedChairs.length === 4) {
            document.getElementById('coupon-text').removeAttribute('disabled');
            document.getElementById('coupon-btn').removeAttribute('disabled');
        }
        else {
            document.getElementById('coupon-text').setAttribute('disabled', 'disabled');
            document.getElementById('coupon-btn').setAttribute('disabled', 'disabled');
            document.getElementById('coupon-text').classList.remove('hidden');
            document.getElementById('coupon-btn').classList.remove('hidden');
            document.getElementById('coupon-text').value = '';
            discount = 0;
        }

        updateTable();
        updateNextButton();
    }
}

function updateTable() {
    const tableBody = document.querySelector('.table tbody');
    tableBody.innerHTML = '';
    selectedChairs.forEach(chair => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${chair.name}</td>
            <td>${chair.class}</td>
            <td>${chair.price}</td>
        `;
        tableBody.appendChild(row);
    });

    totalCost = selectedChairs.reduce((total, chair) => total + chair.price, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td>Total Price</td>
        <td></td>
        <td>BDT <span>${totalCost}</span></td>
    `;
    tableBody.appendChild(totalRow);

    let grandTotal = totalCost;
    if (discount > 0) {
        grandTotal -= discount;
        const discountRow = document.createElement('tr');
        discountRow.innerHTML = `
            <td>Discount</td>
            <td></td>
            <td>- BDT <span>${discount}</span></td>
        `;
        tableBody.appendChild(discountRow);
    }
    document.getElementById('grand-total').textContent = grandTotal;

}

function specialOffer() {
    let grandTotal = totalCost;
    const couponText = document.getElementById('coupon-text').value;
    if (couponText === 'NEW15') {
        discount = totalCost * 0.15;
        grandTotal -= discount;
        document.getElementById('error-coupon').classList.add('hidden');
        document.getElementById('coupon-text').classList.add('hidden');
        document.getElementById('coupon-btn').classList.add('hidden');
    }
    else if (couponText === 'Couple 20') {
        discount = totalCost * 0.2;
        grandTotal -= discount;
        document.getElementById('error-coupon').classList.add('hidden');
        document.getElementById('coupon-text').classList.add('hidden');
        document.getElementById('coupon-btn').classList.add('hidden');
    }
    else {
        document.getElementById('error-coupon').classList.remove('hidden');
        discount = 0;
    }
    updateTable();

}

function updateNextButton() {
    const nextButton = document.getElementById('next-btn');
    const phoneInput = document.getElementById('phone-number');

    if (selectedChairs.length > 0 && phoneInput.value.trim() !== '') {
        nextButton.removeAttribute('disabled');
    } else {
        nextButton.setAttribute('disabled', 'disabled');
    }
}

for (const chair of chairs) {
    chair.addEventListener('click', seatSelect);
}

document.getElementById('phone-number').addEventListener('input', function () {
    phone = this.value.trim();
    updateNextButton();
});
