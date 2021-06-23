const FromCur = document.getElementById("fromCur");
const FromAmt = document.getElementById("fromAmt");
const ToCur = document.getElementById("toCur");
const ToAmt = document.getElementById("toAmt");

const Rate = document.getElementById("rate");
const Exchange = document.getElementById("exchange");

// when triggered executes calculate function
FromCur.addEventListener("change", calculate);
FromAmt.addEventListener("input", calculate);
ToCur.addEventListener("change", calculate);
ToAmt.addEventListener("input", calculate);

// swap the values while pressing xchange icon
Exchange.addEventListener("click", () => {
  const temp = FromCur.value;
  FromCur.value = ToCur.value;
  ToCur.value = temp;

  calculate();
});

async function calculate() {
  //copy Input value to variables
  const fCur = FromCur.value;
  const tCur = ToCur.value;

  // Fetching API
  let xValue = await fetch(`https://open.er-api.com/v6/latest/${fCur}`);
  //fetch is parsed to JSON format and stored in variable "data".
  let data = await xValue.json();
  console.log(data);

  if (!xValue.ok) {
    alert(`${xValue.status} error has occured!`); //If error while fetching.. show error
  }

  const xChange = data.rates[tCur];
  Rate.innerText = `1 ${fCur} = ${xChange} ${tCur}`;
  ToAmt.value = (FromAmt.value * xChange).toFixed(2);

  // const from_currency = from_currencyEl.value;
  // const to_currency = to_currencyEl.value;

  // fetch(`https://open.er-api.com/v6/latest/${from_currency}`)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     // console.log(res);

  //     const rate = res.rates[to_currency];
  //     rateEl.innerText = `1 ${from_currency} = ${rate} ${to_currency}`;
  //     to_ammountEl.value = (from_ammountEl.value * rate).toFixed(2);
  //   });
}
calculate();
