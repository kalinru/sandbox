const phoneInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

const isValidPhone = (phone) => {
  const cleanedPhone = phone.split(/\s/).join("");
  const regex = /^1?(?:\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/g;

  //   const countryCode = '^(1\\s?)?';
  //   const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})';
  //   const spacesDashes = '[\\s\\-]?';
  //   const phoneNumber = '[0-9]{3}[\\s\\-]?[0-9]{4}$';
  //   const regex = new RegExp(
  //     `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
  //   );

  return regex.test(cleanedPhone);
};

clearBtn.addEventListener("click", () => {
  result.innerHTML = "";
  phoneInput.value = "";
});

checkBtn.addEventListener("click", () => {
  const phone = phoneInput.value;

  if (!phone) {
    alert("Please provide a phone number");
    return;
  }

  const isValid = isValidPhone(phone.trim());

  result.innerHTML += `
    <p class="results-text" style="color: rgb${
      isValid ? "(0, 71, 27)" : "(77, 56, 0)"
    };">
      ${isValid ? "Valid" : "Invalid"} US number: ${phone}
    </p>
  `;
  phoneInput.value = "";
});
