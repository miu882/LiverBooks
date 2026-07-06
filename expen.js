// js/expense.js

function addExpense() {
  const records = getRecords();

  const date = document.getElementById("expenseDate").value;
  const category = document.getElementById("expenseCategory").value;
  const amount = Number(document.getElementById("expenseAmount").value || 0);
  const paymentMethod = document.getElementById("paymentMethod").value;
  const receipt = document.getElementById("receipt").value;
  const memo = document.getElementById("expenseMemo").value;
  const receiptImageInput = document.getElementById("receiptImage");

  if (!date || !amount) {
    alert("日付と金額を入力してください");
    return;
  }

  if (receiptImageInput && receiptImageInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function(e) {
      records.push({
        kind: "expense",
        date,
        category,
        amount,
        paymentMethod,
        receipt,
        receiptImage: e.target.result,
        memo
      });

      saveRecords(records);
      resetExpenseForm();
      render();
      alert("経費を保存しました");
    };

    reader.readAsDataURL(receiptImageInput.files[0]);
  } else {
    records.push({
      kind: "expense",
      date,
      category,
      amount,
      paymentMethod,
      receipt,
      receiptImage: "",
      memo
    });

    saveRecords(records);
    resetExpenseForm();
    render();
    alert("経費を保存しました");
  }
}

function resetExpenseForm() {
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseMemo").value = "";

  const receiptImageInput = document.getElementById("receiptImage");
  if (receiptImageInput) {
    receiptImageInput.value = "";
  }
}
function setReceipt(value) {
  document.getElementById("receipt").value = value;

  document.getElementById("receiptYes").classList.remove("active");
  document.getElementById("receiptNo").classList.remove("active");

  if (value === "あり") {
    document.getElementById("receiptYes").classList.add("active");
  } else {
    document.getElementById("receiptNo").classList.add("active");
  }
}