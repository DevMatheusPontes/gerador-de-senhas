const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const passwordLengthEl = document.querySelector("#password-length");
const securityIndicatorBarEl = document.querySelector(
  "#security-indicator-bar"
);

let passwordLength = 16;

const generatePassword = () => {
  let chars = "abcdefghjkmnpqrstuvwxyz";

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numberChars = "123456789";
  const symbolChars = "?!@&*()[]";

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars;
  }
  if (numberCheckEl.checked) {
    chars += numberChars;
  }
  if (symbolCheckEl.checked) {
    chars += symbolChars;
  }

  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  calculateQuality();
  calculateFontSize();
  inputEl.value = password;
};

const calculateQuality = () => {
  /**
   * 0 - 50% critical
   * 51 - 69% warning
   * 69 - 100% safe
   */

  //Ajuste de pesos para cálculo de segurança
  const percent = Math.round(
    (passwordLength / 64) * 40 +
      (upperCaseCheckEl.checked ? 20 : 0) +
      (numberCheckEl.checked ? 20 : 0) +
      (symbolCheckEl.checked ? 20 : 0)
  );

  securityIndicatorBarEl.style.width = `${percent}%`;
  switch (true) {
    case percent >= 100:
      {
        securityIndicatorBarEl.classList.add("completed");
      }
      break;
    case percent >= 69:
      {
        securityIndicatorBarEl.classList.remove("critical");
        securityIndicatorBarEl.classList.remove("warning");
        securityIndicatorBarEl.classList.add("safe");
        securityIndicatorBarEl.classList.remove("completed");
      }
      break;
    case percent >= 50:
      {
        securityIndicatorBarEl.classList.remove("critical");
        securityIndicatorBarEl.classList.remove("safe");
        securityIndicatorBarEl.classList.add("warning");
        securityIndicatorBarEl.classList.remove("completed");
      }
      break;
    default: {
      securityIndicatorBarEl.classList.remove("warning");
      securityIndicatorBarEl.classList.remove("safe");
      securityIndicatorBarEl.classList.add("critical");
      securityIndicatorBarEl.classList.remove("completed");
    }
  }
};

const calculateFontSize = () => {
  switch (true) {
    case passwordLength > 45:
      {
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.add("font-xxs");
      }
      break;
    case passwordLength > 32:
      {
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xxs");
        inputEl.classList.add("font-xs");
      }
      break;
    case passwordLength > 22:
      {
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
        inputEl.classList.add("font-sm");
      }
      break;
    default:
      {
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
        inputEl.classList.remove("font-sm");
      }
      break;
  }
};
const copy = () => {
  navigator.clipboard.writeText(inputEl.value);
};

passwordLengthEl.addEventListener("input", () => {
  passwordLength = passwordLengthEl.value;
  document.querySelector("#password-length-text").innerText = passwordLength;
  generatePassword();
});
upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);
document.querySelector("#renew").addEventListener("click", generatePassword);

generatePassword();
