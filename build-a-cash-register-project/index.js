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
