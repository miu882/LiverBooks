// js/sales.js

function convertSalesToYen() {
  const settings = getSettings();

  const inputType = document.getElementById("salesInputType").value;
  const value = Number(document.getElementById("salesValue").value || 0);

  if (inputType === "yen") return value;
  if (inputType === "coin") return value * settings.coinRate;
  if (inputType === "diamond") return value * settings.diamondRate;

  return 0;
}

function calculateWithdrawFee(amount, method) {
  const settings = getSettings();
  const usd = settings.usdRate;
  const idr = settings.idrRate;

  if (method === "PayPal") return Math.min(amount * 0.015, 20 * usd);
  if (method === "Payoneer") return Math.min(amount * 0.02, 3 * usd);
  if (method === "銀行送金") return 3 * usd;
  if (method === "WebMoney Wallet") return amount * 0.015;
  if (method === "PromptPay") return 1 * usd;
  if (method === "GCash") return amount * 0.01 + 0.1 * usd;
  if (method === "DANA") return amount * 0.01 + 600 * idr;
  if (method === "GoPay") return amount * 0.01;
  if (method === "クレジットカード/デビットカード") return amount * 0.015 + 0.1 * usd;

  return 0;
}

function updateSalesPreview() {
  const amount = Math.round(convertSalesToYen());
  const method = document.getElementById("withdrawMethod").value;

  const fee = Math.round(calculateWithdrawFee(amount, method));
  const depositAmount = amount - fee;

  document.getElementById("convertedSales").value = "¥" + yen(amount);
  document.getElementById("feePreview").value = "¥" + yen(fee);
  document.getElementById("depositPreview").value = "¥" + yen(depositAmount);
}

function addSales() {
  const records = getRecords();

  const date = document.getElementById("salesDate").value;
  const platform = document.getElementById("platform").value;
  const salesType = document.getElementById("salesType").value;
  const inputType = document.getElementById("salesInputType").value;
  const value = Number(document.getElementById("salesValue").value || 0);
  const amount = Math.round(convertSalesToYen());
  const withdrawMethod = document.getElementById("withdrawMethod").value;
  const fee = Math.round(calculateWithdrawFee(amount, withdrawMethod));
  const depositAmount = amount - fee;
  const depositDate = document.getElementById("depositDate").value;
  const memo = document.getElementById("salesMemo").value;

  if (!date || !value) {
    alert("日付と数量・金額を入力してください");
    return;
  }

  records.push({
    kind: "sales",
    date,
    platform,
    salesType,
    inputType,
    value,
    amount,
    withdrawMethod,
    fee,
    depositAmount,
    depositDate,
    isDeposited: false,
    memo
  });

  saveRecords(records);

  document.getElementById("salesValue").value = "";
  document.getElementById("convertedSales").value = "";
  document.getElementById("feePreview").value = "";
  document.getElementById("depositPreview").value = "";
  document.getElementById("salesMemo").value = "";

  render();
  alert("売上を保存しました");
}