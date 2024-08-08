let price = 1;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const banknotes = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

const roundCurrency = (value) => parseFloat(value.toFixed(2));

const renderCashDrawerDisplay = () => {
  cashDrawerDisplay.innerHTML = cid
    .map(
      ([banknote, amount]) => `
  <p>${banknote.toLowerCase()}: $${amount}</p>
`
    )
    .join("");
};

const calculateChange = (cash) => {
  let changeAmount = roundCurrency(cash - price);
  let closed = true;
  const change = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    const banknote = cid[i][0];
    let banknoteSum = 0;

    while (changeAmount >= banknotes[banknote] && cid[i][1] > 0) {
      changeAmount = roundCurrency(changeAmount - banknotes[banknote]);
      banknoteSum = roundCurrency(banknoteSum + banknotes[banknote]);
      cid[i][1] = roundCurrency(cid[i][1] - banknotes[banknote]);
    }
    if (banknoteSum) {
      change.push([banknote, banknoteSum]);
    }
    if (cid[i][1] > 0) {
      closed = false;
    }
  }

  if (changeAmount > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (changeAmount === 0 && closed) {
    return { status: "CLOSED", change };
  }

  return { status: "OPEN", change };
};

const processPurchase = () => {
  const cash = parseFloat(cashInput.value);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDue.innerHTML = `
      <p>No change due - customer paid with exact cash</p>
    `;
    return;
  }

  const { status, change } = calculateChange(cash);

  changeDue.innerHTML = `
    <p>Status: ${status}</p>
    ${change
      .map(
        ([banknote, amount]) => `
      <p>${banknote}: $${amount}</p>
    `
      )
      .join("")}
  `;

  renderCashDrawerDisplay();
};

cashInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    processPurchase();
  }
});

purchaseBtn.addEventListener("click", () => {
  processPurchase();
});

renderCashDrawerDisplay();
priceScreen.textContent = `Total: $${price}`;

// freeCodeCamp solution:
// let price = 3.26;
// let cid = [
//   ['PENNY', 1.01],
//   ['NICKEL', 2.05],
//   ['DIME', 3.1],
//   ['QUARTER', 4.25],
//   ['ONE', 90],
//   ['FIVE', 55],
//   ['TEN', 20],
//   ['TWENTY', 60],
//   ['ONE HUNDRED', 100]
// ];

// const displayChangeDue = document.getElementById('change-due');
// const cash = document.getElementById('cash');
// const purchaseBtn = document.getElementById('purchase-btn');
// const priceScreen = document.getElementById('price-screen');
// const cashDrawerDisplay = document.getElementById('cash-drawer-display');

// const formatResults = (status, change) => {
//   displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
//   change.map(
//     money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
//   );
//   return;
// };

// const checkCashRegister = () => {
//   if (Number(cash.value) < price) {
//     alert('Customer does not have enough money to purchase the item');
//     cash.value = '';
//     return;
//   }

//   if (Number(cash.value) === price) {
//     displayChangeDue.innerHTML =
//       '<p>No change due - customer paid with exact cash</p>';
//     cash.value = '';
//     return;
//   }

//   let changeDue = Number(cash.value) - price;
//   let reversedCid = [...cid].reverse();
//   let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
//   let result = { status: 'OPEN', change: [] };
//   let totalCID = parseFloat(
//     cid
//       .map(total => total[1])
//       .reduce((prev, curr) => prev + curr)
//       .toFixed(2)
//   );

//   if (totalCID < changeDue) {
//     return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
//   }

//   if (totalCID === changeDue) {
//     result.status = 'CLOSED';
//   }

//   for (let i = 0; i <= reversedCid.length; i++) {
//     if (changeDue >= denominations[i] && changeDue > 0) {
//       let count = 0;
//       let total = reversedCid[i][1];
//       while (total > 0 && changeDue >= denominations[i]) {
//         total -= denominations[i];
//         changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
//         count++;
//       }
//       if (count > 0) {
//         result.change.push([reversedCid[i][0], count * denominations[i]]);
//       }
//     }
//   }
//   if (changeDue > 0) {
//     return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
//   }

//   formatResults(result.status, result.change);
//   updateUI(result.change);
// };

// const checkResults = () => {
//   if (!cash.value) {
//     return;
//   }
//   checkCashRegister();
// };

// const updateUI = change => {
//   const currencyNameMap = {
//     PENNY: 'Pennies',
//     NICKEL: 'Nickels',
//     DIME: 'Dimes',
//     QUARTER: 'Quarters',
//     ONE: 'Ones',
//     FIVE: 'Fives',
//     TEN: 'Tens',
//     TWENTY: 'Twenties',
//     'ONE HUNDRED': 'Hundreds'
//   };
//   // Update cid if change is passed in
//   if (change) {
//     change.forEach(changeArr => {
//       const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
//       targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
//     });
//   }

//   cash.value = '';
//   priceScreen.textContent = `Total: $${price}`;
//   cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
//     ${cid
//       .map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
//       .join('')}
//   `;
// };

// purchaseBtn.addEventListener('click', checkResults);

// cash.addEventListener('keydown', e => {
//   if (e.key === 'Enter') {
//     checkResults();
//   }
// });

// updateUI();
