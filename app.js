const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_REYyBmSxqb33eZIn667xHB0USBdBCBZfNNQgwvRD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// ✅ POPULATE DROPDOWNS WITH FLAGS
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => updateFlag(e.target));
}

// ✅ FLAG FUNCTION
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// ✅ EXCHANGE RATE FUNCTION
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input").value || 1;
  const URL = `${BASE_URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[toCurr.value];
    let finalAmount = (amount * rate).toFixed(2);
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (err) {
    msg.innerText = "Error fetching exchange rate!";
  }
};

// ✅ CLICK EVENT
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});