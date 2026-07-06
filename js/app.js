// js/app.js

const PASSWORD = "1234";

function login() {
  const password = document.getElementById("password").value;

  if (password !== PASSWORD) {
    document.getElementById("loginMessage").textContent =
      "パスワードが違います";
    return;
  }

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("appScreen").style.display = "flex";

  loadSettingsToForm();
  render();
}

function logout() {
  document.getElementById("loginScreen").style.display = "block";
  document.getElementById("appScreen").style.display = "none";
  document.getElementById("password").value = "";
}

function showSection(id) {

  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  render();
}

function yen(value) {
  return Number(value || 0).toLocaleString();
}

function render() {

  const records = getRecords();

  let sales = 0;
  let fee = 0;
  let expense = 0;
  let deposit = 0;

  let html = "";

  records.forEach((item,index)=>{

    if(item.kind==="sales"){

      sales+=item.amount;
      fee+=item.fee;
      deposit+=item.depositAmount;

      html+=`
      <tr>
        <td>売上</td>
        <td>${item.date}</td>
        <td>${item.platform}</td>
        <td>¥${yen(item.amount)}</td>
        <td>¥${yen(item.fee)}</td>
        <td>¥${yen(item.depositAmount)}</td>
        <td>${item.memo||"-"}</td>
        <td>
          <button onclick="deleteRecord(${index})">
            削除
          </button>
        </td>
      </tr>
      `;
    }

    if(item.kind==="expense"){

      expense+=item.amount;

      html+=`
      <tr>
        <td>経費</td>
        <td>${item.date}</td>
        <td>${item.category}</td>
        <td>¥${yen(item.amount)}</td>
        <td>-</td>
        <td>-</td>
        <td>${item.memo||"-"}</td>
        <td>
          <button onclick="deleteRecord(${index})">
            削除
          </button>
        </td>
      </tr>
      `;
    }

  });

  document.getElementById("salesTotal").textContent=yen(sales);
  document.getElementById("feeTotal").textContent=yen(fee);
  document.getElementById("expenseTotal").textContent=yen(expense);
  document.getElementById("depositTotal").textContent=yen(deposit);
  document.getElementById("profitTotal").textContent=
      yen(sales-fee-expense);

  document.getElementById("ledgerList").innerHTML=
      html || `
      <tr>
        <td colspan="8">
          データがありません
        </td>
      </tr>`;
}

function deleteRecord(index){

  const records=getRecords();

  records.splice(index,1);

  saveRecords(records);

  render();

}

window.onload=()=>{

  render();

};