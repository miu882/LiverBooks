// js/settings.js

function loadSettingsToForm() {
  const settings = getSettings();

  document.getElementById("coinRate").value = settings.coinRate;
  document.getElementById("diamondRate").value = settings.diamondRate;
  document.getElementById("usdRate").value = settings.usdRate;
  document.getElementById("idrRate").value = settings.idrRate;
}

function saveSettings() {
  const settings = {
    coinRate: Number(document.getElementById("coinRate").value || 1),
    diamondRate: Number(document.getElementById("diamondRate").value || 0.5),
    usdRate: Number(document.getElementById("usdRate").value || 160),
    idrRate: Number(document.getElementById("idrRate").value || 0.01)
  };

  saveSettingsData(settings);

  if (typeof updateSalesPreview === "function") {
    updateSalesPreview();
  }

  alert("設定を保存しました");
}