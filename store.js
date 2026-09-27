/**
 * QuickData ProSoft — طبقة حفظ محلي (localStorage)
 * تبقي البيانات بين الصفحات أثناء التجربة بدون Backend
 */
var MockStore = (function () {
  var PREFIX = 'qdps_';
  var KEYS = [
    'customers', 'suppliers', 'products', 'salesInvoices', 'purchaseInvoices',
    'receipts', 'paymentsList', 'journalEntries', 'expenses', 'employees',
    'treasuries', 'bankAccounts', 'transfers', 'fixedAssets', 'users',
    'categories', 'warehouses'
  ];

  function load(key) {
    try {
      var raw = localStorage.getItem(PREFIX + key);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  function save(key, data) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function get(key) {
    var stored = load(key);
    if (stored) return stored;
    if (typeof MockData !== 'undefined' && MockData[key]) {
      // deep clone from seed
      return JSON.parse(JSON.stringify(MockData[key]));
    }
    return [];
  }

  function persist(key, data) {
    save(key, data);
    return data;
  }

  function resetAll() {
    KEYS.forEach(function (k) {
      try { localStorage.removeItem(PREFIX + k); } catch (e) {}
    });
  }

  function hasCustomData() {
    return KEYS.some(function (k) {
      try { return !!localStorage.getItem(PREFIX + k); } catch (e) { return false; }
    });
  }

  
  function exportCSV(filename, headers, rows) {
    var esc = function(v) {
      v = (v == null ? '' : String(v));
      if (/[",\n]/.test(v)) v = '"' + v.replace(/"/g, '""') + '"';
      return v;
    };
    var lines = [headers.map(esc).join(',')];
    rows.forEach(function(r){ lines.push(r.map(esc).join(',')); });
    // BOM for Excel Arabic
    var blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  
  function exportAllJSON() {
    var dump = {};
    KEYS.forEach(function(k){ dump[k] = get(k); });
    dump._meta = { system: 'QuickData ProSoft', exportedAt: new Date().toISOString() };
    var blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'quickdata-backup-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importAllJSON(obj) {
    if (!obj || typeof obj !== 'object') return false;
    KEYS.forEach(function(k){
      if (Array.isArray(obj[k])) save(k, obj[k]);
    });
    return true;
  }

  return { get: get, save: persist, resetAll: resetAll, hasCustomData: hasCustomData, KEYS: KEYS, exportCSV: exportCSV, exportAllJSON: exportAllJSON, importAllJSON: importAllJSON };


})();
