/**
 * QuickData ProSoft v2.3 — Supabase Client (بدون مكتبة SDK، fetch مباشر)
 * ============================================================
 * هذا الملف هو نقطة الاتصال الوحيدة بقاعدة بيانات Supabase.
 * يوفر: الإعدادات، الجلسة/الدخول/الخروج، تسجيل شركة جديدة (multi-tenant)،
 * ودوال REST/RPC عامة تستخدمها باقي صفحات النظام.
 *
 * أضف <script src="supabase.js"></script> في <head> أي صفحة تحتاج بيانات حقيقية.
 */

var SUPABASE_CONFIG = {
  URL: 'https://azxqxsnsbzvvbgymbiyq.supabase.co',
  KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6eHF4c25zYnp2dmJneW1iaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0ODc1MzgsImV4cCI6MjEwNjA2MzUzOH0.XrjOB878MpXpinIMwZOmkEsjCRu7LXb6H2HMaxd0gXA'
};

var Supabase = (function () {
  var SESSION_KEY = 'supabase_session';
  var PENDING_KEY = 'qdps_pending_signup';

  // ---------------- الجلسة (Session) ----------------
  function getSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function saveSession(s) {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {}
  }

  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  function isLoggedIn() {
    var s = getSession();
    return !!(s && s.access_token && s.expires_at && s.expires_at > Math.floor(Date.now() / 1000));
  }

  function getUser() {
    var s = getSession();
    return s ? s.user : null;
  }

  function getAccessToken() {
    var s = getSession();
    return s ? s.access_token : null;
  }

  // ---------------- REST / RPC عامة (PostgREST) ----------------
  async function rest(path, options) {
    options = options || {};
    var token = getAccessToken() || SUPABASE_CONFIG.KEY;
    var headers = Object.assign({
      'apikey': SUPABASE_CONFIG.KEY,
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }, options.headers || {});
    if (options.prefer) headers['Prefer'] = options.prefer;

    var res = await fetch(SUPABASE_CONFIG.URL + '/rest/v1' + path, {
      method: options.method || 'GET',
      headers: headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined
    });

    var text = await res.text();
    var data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      var msg = (data && (data.message || data.error_description || data.hint)) || 'حدث خطأ في الاتصال بقاعدة البيانات';
      throw new Error(msg);
    }
    return data;
  }

  async function rpc(fnName, params) {
    return rest('/rpc/' + fnName, { method: 'POST', body: params || {} });
  }

  // ---------------- تسجيل الدخول / الخروج ----------------
  async function login(email, password) {
    var res = await fetch(SUPABASE_CONFIG.URL + '/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: { 'apikey': SUPABASE_CONFIG.KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    });
    var data = await res.json();
    if (!res.ok) {
      throw new Error(data.error_description || data.msg || 'فشل تسجيل الدخول');
    }

    saveSession({
      user: data.user,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      expires_at: Math.floor(Date.now() / 1000) + data.expires_in
    });

    // لو كان هناك تسجيل شركة معلّق (تم تأجيله بسبب تفعيل البريد)، أكمله الآن
    await resolvePendingSignup(data.user, data.access_token);

    return data;
  }

  async function signup(email, password, meta) {
    var res = await fetch(SUPABASE_CONFIG.URL + '/auth/v1/signup', {
      method: 'POST',
      headers: { 'apikey': SUPABASE_CONFIG.KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password, data: meta || {} })
    });
    var data = await res.json();
    if (!res.ok) {
      var msg = data.error_description || data.msg || data.message || data.error || 'فشل إنشاء الحساب';
      if (String(msg).toLowerCase().indexOf('already registered') !== -1 ||
          String(msg).toLowerCase().indexOf('already been registered') !== -1) {
        msg = 'هذا البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد آخر.';
      }
      throw new Error(msg);
    }
    return data;
  }

  function logout() {
    clearSession();
    window.location.href = 'login.html';
  }

  // ---------------- الشركة (Tenant) الجديدة عند التسجيل ----------------
  function savePendingSignup(email, tenantName, userName) {
    try {
      localStorage.setItem(PENDING_KEY, JSON.stringify({ email: email, tenantName: tenantName, userName: userName }));
    } catch (e) {}
  }

  function getPendingSignup() {
    try {
      var raw = localStorage.getItem(PENDING_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function clearPendingSignup() {
    try { localStorage.removeItem(PENDING_KEY); } catch (e) {}
  }

  /** ينشئ شركة جديدة + أول مستخدم (admin) لها + إعداداتها الافتراضية */
  async function createTenantAndAdmin(tenantName, userName, email, accessToken) {
    var token = accessToken || getAccessToken();
    var res = await fetch(SUPABASE_CONFIG.URL + '/rest/v1/rpc/create_tenant_and_admin', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.KEY,
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ p_tenant_name: tenantName, p_user_name: userName, p_user_email: email })
    });
    var data = await res.json();
    if (!res.ok) {
      var msg = (data && (data.message || data.hint)) || 'فشل إنشاء الشركة';
      throw new Error(msg);
    }
    return data; // tenant_id
  }

  /** بيانات المستخدم الحالي من جدول app_users (تحتوي على tenant_id، الدور...) */
  async function getAppUser() {
    var user = getUser();
    if (!user) return null;
    try {
      var rows = await rest('/app_users?id=eq.' + user.id + '&select=*');
      return rows && rows[0] ? rows[0] : null;
    } catch (e) {
      return null;
    }
  }

  /** يُستدعى بعد كل تسجيل دخول ناجح: يكمل إنشاء الشركة لو كانت معلّقة (بريد لم يُفعَّل وقت التسجيل) */
  async function resolvePendingSignup(user, accessToken) {
    var pending = getPendingSignup();
    if (!pending || !user || pending.email !== user.email) return;

    var existing = await getAppUser();
    if (existing) { clearPendingSignup(); return; }

    try {
      await createTenantAndAdmin(pending.tenantName, pending.userName, user.email, accessToken);
    } finally {
      clearPendingSignup();
    }
  }

  // ---------------- إعدادات الشركة الحالية ----------------
  async function getCompanySettings() {
    var rows = await rest('/company_settings?select=*&limit=1');
    return rows && rows[0] ? rows[0] : null;
  }

  function getSystemName() {
    return 'QuickData ProSoft';
  }

  return {
    isLoggedIn: isLoggedIn,
    getSession: getSession,
    getUser: getUser,
    getAccessToken: getAccessToken,

    login: login,
    signup: signup,
    logout: logout,

    rest: rest,
    rpc: rpc,

    savePendingSignup: savePendingSignup,
    getPendingSignup: getPendingSignup,
    clearPendingSignup: clearPendingSignup,
    createTenantAndAdmin: createTenantAndAdmin,
    resolvePendingSignup: resolvePendingSignup,

    getAppUser: getAppUser,
    getCompanySettings: getCompanySettings,
    getSystemName: getSystemName
  };
})();
