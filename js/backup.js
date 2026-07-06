// js/backup.js

function exportBackup() {
  const data = {
    records: getRecords(),
    settings: getSettings(),
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "liverbooks_backup.json";
  a.click();

  URL.revokeObjectURL(url);
}

function importBackup(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);

      if (!data.records || !data.settings) {
        alert("バックアップファイルの形式が違います");
        return;
      }

      saveRecords(data.records);
      saveSettingsData(data.settings);

      alert("バックアップを復元しました");
      location.reload();

    } catch (error) {
      alert("復元に失敗しました");
    }
  };

  reader.readAsText(file);
}