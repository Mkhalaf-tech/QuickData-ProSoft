/**
 * QuickData ProSoft v2.0 — طبقة حفظ محلي محسّنة
 * localStorage + أحداث + سجل نشاط + إعدادات الشركة
 */
var MockStore = (function () {
  var PREFIX = 'qdps_';
  var VERSION = '2.0.0';
  var KEYS = [
    'customers', 'suppliers', 'products', 'salesInvoices', 'purchaseInvoices',
    'receipts', 'paymentsList', 'journalEntries', 'expenses', 'employees',
    'treasuries', 'bankAccounts', 'transfers', 'fixedAssets', 'users',
    'categories', 'warehouses', 'activityLog', 'companySettings'
  ];

  var listeners = {};

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
      emit('change', { key: key, data: data });
      return true;
    } catch (e) {
      return false;
    }
  }

  function get(key) {
    var stored = load(key);
    if (stored !== null) return stored;
    if (typeof MockData !== 'undefined' && MockData[key]) {
      return JSON.parse(JSON.stringify(MockData[key]));
    }
    if (key === 'activityLog') return [];
    if (key === 'companySettings') return getDefaultSettings();
    return [];
  }

  function persist(key, data) {
    save(key, data);
    return data;
  }

  function getDefaultSettings() {
    return {
      systemName: 'QuickData ProSoft',
      systemSub: 'حلول إدارة الأعمال الاحترافية',
      companyName: 'شركة التجارة المتكاملة',
      taxNumber: '123-456-789',
      currency: 'ج.م',
      currencyLabel: 'جنيه مصري',
      taxRate: 14,
      fiscalYear: new Date().getFullYear().toString(),
      city: 'القاهرة',
      address: '',
      phone: '',
      email: '',
      logo: '',
      updatedAt: new Date().toISOString()
    };
  }

  function getSettings() {
    var s = get('companySettings');
    if (!s || typeof s !== 'object' || Array.isArray(s)) {
      s = getDefaultSettings();
      save('companySettings', s);
    }
    return s;
  }

  function saveSettings(partial) {
    var current = getSettings();
    var next = Object.assign({}, current, partial || {}, { updatedAt: new Date().toISOString() });
    save('companySettings', next);
    return next;
  }

  function logActivity(action, details, entity) {
    var log = get('activityLog') || [];
    log.unshift({
      id: Date.now() + Math.random().toString(36).slice(2, 7),
      action: action,
      details: details || '',
      entity: entity || '',
      user: 'مدير النظام',
      at: new Date().toISOString()
    });
    if (log.length > 200) log = log.slice(0, 200);
    save('activityLog', log);
    emit('activity', log[0]);
    return log[0];
  }

  function resetAll() {
    KEYS.forEach(function (k) {
      try { localStorage.removeItem(PREFIX + k); } catch (e) {}
    });
    emit('reset', {});
  }

  function hasCustomData() {
    return KEYS.some(function (k) {
      try { return !!localStorage.getItem(PREFIX + k); } catch (e) { return false; }
    });
  }

  function exportCSV(filename, headers, rows) {
    var esc = function (v) {
      v = (v == null ? '' : String(v));
      if (/[",\n]/.test(v)) v = '"' + v.replace(/"/g, '""') + '"';
      return v;
    };
    var lines = [headers.map(esc).join(',')];
    rows.forEach(function (r) { lines.push(r.map(esc).join(',')); });
    var blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function exportAllJSON() {
    var dump = {};
    KEYS.forEach(function (k) { dump[k] = get(k); });
    dump._meta = {
      system: 'QuickData ProSoft',
      version: VERSION,
      exportedAt: new Date().toISOString()
    };
    var blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'quickdata-backup-v2-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
    logActivity('تصدير', 'نسخة احتياطية كاملة JSON', 'system');
  }

  function importAllJSON(obj) {
    if (!obj || typeof obj !== 'object') return false;
    KEYS.forEach(function (k) {
      if (obj[k] !== undefined) save(k, obj[k]);
    });
    logActivity('استيراد', 'استعادة نسخة احتياطية', 'system');
    return true;
  }

  function on(event, fn) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(fn);
  }

  function off(event, fn) {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter(function (f) { return f !== fn; });
  }

  function emit(event, data) {
    (listeners[event] || []).forEach(function (fn) {
      try { fn(data); } catch (e) {}
    });
  }

  function nextId(list) {
    if (!list || !list.length) return 1;
    return Math.max.apply(null, list.map(function (x) { return x.id || 0; })) + 1;
  }

  return {
    get: get,
    save: persist,
    resetAll: resetAll,
    hasCustomData: hasCustomData,
    KEYS: KEYS,
    VERSION: VERSION,
    exportCSV: exportCSV,
    exportAllJSON: exportAllJSON,
    importAllJSON: importAllJSON,
    getSettings: getSettings,
    saveSettings: saveSettings,
    logActivity: logActivity,
    on: on,
    off: off,
    nextId: nextId
  };
})();
