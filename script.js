let accountBalance = 1000;
let cashBalance = 1000;
let Counter = 1;

function addStatement(text){
  const ta = document.getElementById('statement');
  ta.value = `${Counter}, ${text}\n` + ta.value;
  ta.scrollTop = 0;
  Counter += 1;
}

function Header(){
  const ta = document.getElementById('statement');
  if (ta.value.trim() === '') {
    ta.value = `1, Current account balance: ${accountBalance}, Current cash balance: ${cashBalance}\n`;
    Counter = 2;
  }
}

function refreshInputs(){
  const accEl  = document.getElementById('accbalanceInput');
  const cashEl = document.getElementById('cashbalanceInput');
  if (accEl)  accEl.value  = accountBalance;
  if (cashEl) cashEl.value = cashBalance;
}

refreshInputs();
Header();

const btnChange = document.getElementById('btnChange');
if (btnChange) {
  btnChange.addEventListener('click', () => {
    const acc = Number((document.getElementById('accbalanceInput')?.value) || 0);
    const cash = Number((document.getElementById('cashbalanceInput')?.value) || 0);

    accountBalance = acc;
    cashBalance = cash;
    addStatement(`Current account balance: ${accountBalance}, Current cash balance: ${cashBalance}`);
    refreshInputs();
  });
}


// ===== Bank operation =====
const btnProceed = document.getElementById('btnProceed');
if (btnProceed) {
  btnProceed.addEventListener('click', () => {
    const op  = document.getElementById('operation')?.value;
    const amt = Number((document.getElementById('amount')?.value) || 0);

    if (op === 'deposit') {
      if (cashBalance < amt) {
        addStatement(`Couldn't deposit entered balance. (Insufficient cash balance)`);
        return;
      }
      cashBalance -= amt;
      accountBalance += amt;
      addStatement(`Current account balance: ${accountBalance}, Current cash balance: ${cashBalance}`);
    } else if (op === 'withdraw') {
      if (accountBalance < amt) {
        addStatement(`Couldn't withdraw entered balance. (Insufficient account balance)`);
        return;
      }
      accountBalance -= amt;
      cashBalance += amt;
      addStatement(`Current account balance: ${accountBalance}, Current cash balance: ${cashBalance}`);
    }

    refreshInputs();
  });
}

const btnConvert = document.getElementById('btnConvert');
if (btnConvert) {
  btnConvert.addEventListener('click', () => {
    const input = Number((document.getElementById('converInput').value) || 0);
    const select = document.getElementById('converCurrency').value;
    const output = document.getElementById('converOutput');

    const rateUSD = 32.07;
    let result;

    if (select == "USD") {
      result = input * rateUSD;
    }
    else if (select == "THB") {
      result = input / rateUSD;
    }

    output.value = result.toFixed();
  });
}
