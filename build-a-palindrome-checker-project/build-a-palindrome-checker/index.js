const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

checkBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const value = textInput.value;
  const valueCleaned = textInput.value.replace(/[^0-9a-z]/gi, "").toLowerCase();
  if (value === "") {
    alert("Please input a value");
    return;
  }

  const isPalindrome = checkPalindrome(valueCleaned);

  result.innerHTML = `${value} is ${isPalindrome ? "" : "not"} a palindrome`;
});

function checkPalindrome(value) {
  for (let i = 0; i < value.length; i++) {
    if (value[i] !== value[value.length - i - 1]) {
      return false;
    }
  }
  return true;
}
