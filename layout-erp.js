/**
 * QuickData ProSoft — تخطيط مطابق 1:1 لتصميم النظام الأصلي
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
    var p = (location.pathname.split('/').pop() || 'index.html');
    if (!p || p.indexOf('.') < 0) p = (p || 'index') + (p.indexOf('.html') >= 0 ? '' : '.html');
    if (p === '.html') p = 'index.html';
    if (!/\.html$/i.test(p)) p += '.html';
    return p;
  }

  function renderSidebar(activeId) {
    var cur = currentPage();
    var h = '';
    h += '<div class="sidebar-brand"><div class="brand-row">';
    h += '<div class="brand-mark">QD</div>';
    h += '<div class="brand-text">QuickData <span>ProSoft</span><small>' + SYSTEM_SUB + '</small></div>';
    h += '</div></div>';
    h += '<nav class="sidebar-nav">';
    MENU.forEach(function (sec) {
      h += '<div class="nav-section-title">' + sec.title + '</div><ul class="nav-list">';
      sec.items.forEach(function (it) {
        var act = (it.href === cur || it.id === activeId) ? ' class="active"' : '';
        h += '<li><a href="' + it.href + '"' + act + '><i class="bi ' + it.icon + '"></i> ' + it.label + '</a></li>';
      });
      h += '</ul>';
    });
    h += '</nav>';
    h += '<div class="sidebar-footer"><a href="#" class="logout-btn" onclick="logout();return false;"><i class="bi bi-box-arrow-left"></i> تسجيل الخروج</a></div>';
    return h;
  }

  window.logout = function () {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) location.href = 'login.html';
  };

  window.toggleSidebar = function () {
    var sidebar = document.getElementById('sidebar');
    var main = document.getElementById('mainContent');
    var overlay = document.getElementById('sidebarOverlay');
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!sidebar) return;
    if (isMobile) {
      sidebar.classList.toggle('open');
      var open = sidebar.classList.contains('open');
      if (overlay) { overlay.classList.toggle('active', open); overlay.classList.toggle('show', open); }
    } else {
      sidebar.classList.toggle('closed');
      if (main) {
        main.classList.toggle('full', sidebar.classList.contains('closed'));
        main.classList.toggle('expanded', sidebar.classList.contains('closed'));
      }
    }
  };

  window.showToast = function (message, type) {
    type = type || 'info';
    var c = document.getElementById('toastContainer');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toastContainer';
      c.style.cssText = 'position:fixed;top:16px;left:16px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
      document.body.appendChild(c);
    }
    var colors = { success: '#1c7a4e', error: '#ad3f39', warning: '#ad7f2e', info: '#2d6088' };
    var icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
    var el = document.createElement('div');
    el.style.cssText = 'display:flex;align-items:center;gap:8px;padding:10px 14px;background:#fff;border-radius:8px;box-shadow:0 8px 24px rgba(14,28,46,.12);border:1px solid #e0dccf;font-size:12.5px;font-weight:600;border-right:3px solid ' + (colors[type] || colors.info) + ';font-family:Cairo,sans-serif';
    el.innerHTML = '<i class="bi ' + (icons[type] || icons.info) + '" style="color:' + (colors[type] || colors.info) + '"></i><span>' + message + '</span>';
    c.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; setTimeout(function () { el.remove(); }, 250); }, 2800);
  };

  window.statusBadge = function (status) {
    if (typeof MockData !== 'undefined' && MockData.statusLabels && MockData.statusLabels[status]) {
      var s = MockData.statusLabels[status];
      return '<span class="badge ' + s.class + '">' + s.text + '</span>';
    }
    return '<span class="badge badge-secondary">' + (status || '—') + '</span>';
  };

  window.initERPPage = function (opts) {
    opts = opts || {};
    document.title = (opts.title ? opts.title + ' - ' : '') + SYSTEM_NAME;

    try {
      if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark-mode');
    } catch (e) {}

    var sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.innerHTML = renderSidebar(opts.activeId);

    var brand = document.getElementById('navbarBrandText');
    if (brand) brand.innerHTML = 'QuickData <span>ProSoft</span>';

    var pt = document.getElementById('pageTitleText');
    if (pt && opts.title) {
      pt.innerHTML = opts.title + (opts.subtitle ? '<small>' + opts.subtitle + '</small>' : '');
    }

    var role = document.getElementById('userRole');
    if (role) role.textContent = SYSTEM_NAME;

    var fb = document.querySelector('.footer-brand');
    if (fb) fb.innerHTML = 'QuickData <span>ProSoft</span>';

    var toggle = document.getElementById('sidebarToggle');
    if (toggle) {
      toggle.onclick = function (e) { e.preventDefault(); toggleSidebar(); };
    }

    var overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
      overlay.onclick = function () {
        var s = document.getElementById('sidebar');
        if (s) s.classList.remove('open');
        overlay.classList.remove('active', 'show');
      };
    }

    var darkBtn = document.getElementById('darkModeToggle');
    if (darkBtn) {
      darkBtn.onclick = function () {
        document.body.classList.toggle('dark-mode');
        var on = document.body.classList.contains('dark-mode');
        try { localStorage.setItem('darkMode', on ? 'true' : 'false'); } catch (e) {}
        darkBtn.innerHTML = on ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
      };
      if (document.body.classList.contains('dark-mode')) darkBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    var refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) refreshBtn.onclick = function () { location.reload(); };

    var hd = document.getElementById('headerDate');
    if (hd) {
      hd.textContent = new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
  };
})();
