// js/ledger.js

function getFilteredRecords() {

  const records = getRecords();

  const monthInput = document.getElementById("ledgerMonth");

  if (!monthInput) {
    return records;
  }

  const month = monthInput.value;

  if (!month) {
    return records;
  }

  return records.filter(record => {
    return record.date.startsWith(month);
  });

}

function searchRecords(keyword) {

  const records = getFilteredRecords();

  if (!keyword) {
    return records;
  }

  keyword = keyword.toLowerCase();

  return records.filter(record => {

    return (
      (record.platform || "").toLowerCase().includes(keyword) ||
      (record.category || "").toLowerCase().includes(keyword) ||
      (record.memo || "").toLowerCase().includes(keyword)
    );

  });

}

function sortRecords(records) {

  return records.sort((a, b) => {

    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;

    return 0;

  });

}