// js/expense.js

function addExpense() {
  const records = getRecords();

  const date = document.getElementById("expenseDate").value;
  const category = document.getElementById("expenseCategory").value;
  const amount = Number(document.getElementById("expenseAmount").value || 0);
  const paymentMethod = document.getElementById("paymentMethod").value;
  const receipt = document.getElementById("receipt").value;
  const memo = document.getElementById("expenseMemo").value;

  if (!date || !amount) {
    alert("日付と金額を入力してください");
    return;
  }

  records.push({
    kind: "expense",
    date,
    category,
    amount,
    paymentMethod,
    receipt,
    memo
  });

  saveRecords(records);

  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseMemo").value = "";

  render();
  alert("経費を保存しました");
}