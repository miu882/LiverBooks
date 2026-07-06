// js/csv.js

function exportCSV() {
  const records = getRecords();

  if (records.length === 0) {
    alert("出力するデータがありません");
    return;
  }

  const headers = [
    "区分",
    "日付",
    "プラットフォーム/カテゴリ",
    "入力方法",
    "数量",
    "金額",
    "手数料",
    "入金予定額",
    "入金予定日",
    "メモ"
  ];

  const rows = records.map(record => {
    if (record.kind === "sales") {
      return [
        "売上",
        record.date,
        record.platform,
        record.inputType,
        record.value,
        record.amount,
        record.fee,
        record.depositAmount,
        record.depositDate || "",
        record.memo || ""
      ];
    }

    return [
      "経費",
      record.date,
      record.category,
      "",
      "",
      record.amount,
      "",
      "",
      "",
      record.memo || ""
    ];
  });

  const csv = [
    headers,
    ...rows
  ]
    .map(row => row.map(value => `"${value}"`).join(","))
    .join("\n");

  const bom = "\uFEFF";
  const blob = new Blob([bom + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "liverbooks_records.csv";
  a.click();

  URL.revokeObjectURL(url);
}