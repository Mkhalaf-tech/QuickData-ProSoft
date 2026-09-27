/**
 * QuickData ProSoft — تخطيط مطابق لتصميم النظام الأصلي
 */
(function () {
  'use strict';
  var SYSTEM_NAME = 'QuickData ProSoft';
  var SYSTEM_SUB = 'حلول إدارة الأعمال الاحترافية';

  var MENU = [
    { title: 'القائمة الرئيسية', items: [
      { href: 'index.html', icon: 'bi-grid-1x2-fill', label: 'لوحة التحكم', id: 'dashboard' }
    ]},
    { title: 'المحاسبة', items: [
      { href: 'chart-of-accounts.html', icon: 'bi-diagram-3-fill', label: 'دليل الحسابات', id: 'coa' },
      { href: 'journal-entries.html', icon: 'bi-journal-text', label: 'القيود اليومية', id: 'journal' },
      { href: 'general-ledger.html', icon: 'bi-book-fill', label: 'دفتر الأستاذ', id: 'ledger' },
      { href: 'financial-reports.html', icon: 'bi-file-earmark-bar-graph-fill', label: 'التقارير المالية', id: 'fin-reports' }
    ]},
    { title: 'المبيعات', items: [
      { href: 'customers.html', icon: 'bi-people-fill', label: 'العملاء', id: 'customers' },
      { href: 'sales-invoices.html', icon: 'bi-receipt', label: 'فواتير المبيعات', id: 'sales-invoices' },
      { href: 'receipts.html', icon: 'bi-cash-coin', label: 'سندات القبض', id: 'receipts' },
      { href: 'customer-statement.html', icon: 'bi-file-text', label: 'كشف حساب عميل', id: 'statement' }
    ]},
    { title: 'المشتريات', items: [
      { href: 'suppliers.html', icon: 'bi-truck', label: 'الموردون', id: 'suppliers' },
      { href: 'purchase-invoices.html', icon: 'bi-receipt-cutoff', label: 'فواتير المشتريات', id: 'purchase-invoices' },
      { href: 'payments.html', icon: 'bi-cash-stack', label: 'سندات الصرف', id: 'payments' }
    ]},
    { title: 'المخزون', items: [
      { href: 'products.html', icon: 'bi-box-seam-fill', label: 'المنتجات', id: 'products' },
      { href: 'warehouses.html', icon: 'bi-building', label: 'المخازن', id: 'warehouses' },
      { href: 'low-stock.html', icon: 'bi-exclamation-triangle-fill', label: 'منخفض المخزون', id: 'low-stock' }
    ]},
    { title: 'الخزينة والبنوك', items: [
      { href: 'treasuries.html', icon: 'bi-wallet-fill', label: 'الخزائن', id: 'treasuries' },
      { href: 'bank-accounts.html', icon: 'bi-bank', label: 'الحسابات البنكية', id: 'banks' },
      { href: 'transfers.html', icon: 'bi-arrow-left-right', label: 'التحويلات', id: 'transfers' }
    ]},
    { title: 'المصروفات والموارد', items: [
      { href: 'expenses.html', icon: 'bi-cash', label: 'المصروفات', id: 'expenses' },
      { href: 'employees.html', icon: 'bi-person-badge-fill', label: 'الموظفون', id: 'employees' },
      { href: 'fixed-assets.html', icon: 'bi-building-gear', label: 'الأصول الثابتة', id: 'assets' }
    ]},
    { title: 'الإدارة', items: [
      { href: 'reports.html', icon: 'bi-file-earmark-bar-graph-fill', label: 'التقارير', id: 'reports' },
      { href: 'users.html', icon: 'bi-people', label: 'المستخدمون', id: 'users' },
      { href: 'settings.html', icon: 'bi-gear-fill', label: 'الإعدادات', id: 'settings' }
    ]}
  ];

  function currentPage() {
    var p = (location.pathname.split('/').pop() || 'index.html').replace(/\/$/, '');
    if (!p || p === '') p = 'index.html';
    if (!p.endsWith('.html')) p += '.html';
    return p;
  }

  function renderSidebar(activeId) {
    var cur = currentPage();
    var html = '';
    html += '<div class="sidebar-brand"><div class="brand-row">';
    html += '<div class="brand-mark">QD</div>';
    html += '<div class="brand-text">' + SYSTEM_NAME.split(' ')[0] + ' <span>' + (SYSTEM_NAME.split(' ')[1] || '') + '</span>';
    html += '<small>' + SYSTEM_SUB + '</small></div></div></div>';
    html += '<nav class="sidebar-nav">';
    MENU.forEach(function (sec) {
      html += '<div class="nav-section-title">' + sec.title + '</div><ul class="nav-list">';
      sec.items.forEach(function (it) {
        var active = (it.href === cur || it.id === activeId) ? ' class="active"' : '';
        html += '<li><a href="' + it.href + '"' + active + '><i class="bi ' + it.icon + '"></i> ' + it.label + '</a></li>';
      });
      html += '</ul>';
    });
    html += '</nav>';
    html += '<div class="sidebar-footer"><a href="#" class="logout-btn" onclick="logout();return false;"><i class="bi bi-box-arrow-left"></i> تسجيل الخروج</a></div>';
    return html;
  }

  window.logout = function () {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) location.href = 'login.html';
  };

  window.toggleSidebar = function () {
    var sidebar = document.getElementById('sidebar');
    var main = document.getElementById('mainContent') || document.getElementById('main-content');
    var overlay = document.getElementById('sidebarOverlay') || document.getElementById('sidebar-overlay');
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!sidebar) return;
    if (isMobile) {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active', sidebar.classList.contains('open'));
      if (overlay) overlay.classList.toggle('show', sidebar.classList.contains('open'));
    } else {
      sidebar.classList.toggle('closed');
      if (main) main.classList.toggle('full', sidebar.classList.contains('closed'));
      if (main) main.classList.toggle('expanded', sidebar.classList.contains('closed'));
    }
  };

  window.showToast = function (message, type) {
    type = type || 'info';
    var c = document.getElementById('toastContainer');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toastContainer';
      c.style.cssText = 'position:fixed;top:20px;left:20px;z-index:9999;display:flex;flex-direction:column;gap:8px';
      document.body.appendChild(c);
    }
    var icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
    var colors = { success: '#1c7a4e', error: '#ad3f39', warning: '#ad7f2e', info: '#2d6088' };
    var el = document.createElement('div');
    el.style.cssText = 'display:flex;align-items:center;gap:10px;padding:12px 18px;background:#fff;border-radius:10px;box-shadow:0 10px 30px rgba(14,28,46,.12);border:1px solid #e0dccf;font-size:13px;font-weight:600;border-right:3px solid ' + (colors[type] || colors.info);
    el.innerHTML = '<i class="bi ' + (icons[type] || icons.info) + '" style="color:' + (colors[type] || colors.info) + '"></i><span>' + message + '</span>';
    c.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; setTimeout(function () { el.remove(); }, 300); }, 3000);
  };

  window.initERPPage = function (opts) {
    opts = opts || {};
    document.title = (opts.title ? opts.title + ' - ' : '') + SYSTEM_NAME;

    // Dark mode early
    try {
      if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark-mode');
    } catch (e) {}

    var sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.innerHTML = renderSidebar(opts.activeId);

    var brandText = document.getElementById('navbarBrandText');
    if (brandText) brandText.innerHTML = 'QuickData <span>ProSoft</span>';

    var pageTitle = document.getElementById('pageTitleText');
    if (pageTitle && opts.title) {
      pageTitle.innerHTML = opts.title + (opts.subtitle ? '<small>' + opts.subtitle + '</small>' : '');
    }

    var userRole = document.getElementById('userRole');
    if (userRole) userRole.textContent = SYSTEM_NAME;

    var footerBrand = document.querySelector('.footer-brand');
    if (footerBrand) footerBrand.innerHTML = 'QuickData <span>ProSoft</span>';

    var toggle = document.getElementById('sidebarToggle');
    if (toggle) toggle.addEventListener('click', toggleSidebar);

    var overlay = document.getElementById('sidebarOverlay') || document.getElementById('sidebar-overlay');
    if (overlay) overlay.addEventListener('click', function () {
      var s = document.getElementById('sidebar');
      if (s) s.classList.remove('open');
      overlay.classList.remove('active', 'show');
    });

    var darkBtn = document.getElementById('darkModeToggle');
    if (darkBtn) {
      darkBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        try { localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'true' : 'false'); } catch (e) {}
        darkBtn.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
      });
      if (document.body.classList.contains('dark-mode')) darkBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    var refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', function () { location.reload(); });

    // Date in header
    var hd = document.getElementById('headerDate');
    if (hd) {
      hd.textContent = new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
  };

  // status badge helper
  window.statusBadge = function (status) {
    if (typeof MockData !== 'undefined' && MockData.statusLabels && MockData.statusLabels[status]) {
      var s = MockData.statusLabels[status];
      return '<span class="badge ' + s.class + '">' + s.text + '</span>';
    }
    return '<span class="badge">' + status + '</span>';
  };
})();
