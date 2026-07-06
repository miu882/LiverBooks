// js/storage.js

const RECORDS_KEY = "liverBooksRecords";
const SETTINGS_KEY = "liverBooksSettings";

function getRecords() {
  return JSON.parse(localStorage.getItem(RECORDS_KEY)) || [];
}

function saveRecords(records) {
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

function getSettings() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
    coinRate: 1,
    diamondRate: 0.5,
    usdRate: 160,
    idrRate: 0.01
  };
}

function saveSettingsData(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function clearAllData() {
  if (confirm("すべてのデータを削除しますか？")) {
    localStorage.removeItem(RECORDS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    alert("データを削除しました");
    location.reload();
  }
}