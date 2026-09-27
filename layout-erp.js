/**
 * QuickData ProSoft v2.0 — تخطيط وواجهة محسّنة بالكامل
 */
(function () {
  'use strict';
  var SYSTEM_NAME = 'QuickData ProSoft';
  var SYSTEM_SUB = 'حلول إدارة الأعمال الاحترافية';
  var VERSION = '2.1.0';

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
      { href: 'categories.html', icon: 'bi-tags-fill', label: 'التصنيفات', id: 'categories' },
      { href: 'units.html', icon: 'bi-rulers', label: 'وحدات القياس', id: 'units' },
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
    h += '<div class="sidebar-footer">';
    h += '<div class="sidebar-version">v' + VERSION + '</div>';
    h += '<a href="#" class="logout-btn" onclick="logout();return false;"><i class="bi bi-box-arrow-left"></i> تسجيل الخروج</a>';
    h += '</div>';
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

  /** فتح نافذة بشكل موثوق */
  window.openErpModal = function (id) {
    var el = document.getElementById(id);
    if (!el) { console.error('Modal not found:', id); return; }
    if (el.parentElement !== document.body) document.body.appendChild(el);
    el.classList.add('erp-modal-overlay', 'is-open');
    el.style.display = 'flex';
    el.style.zIndex = '10000';
    document.body.style.overflow = 'hidden';
  };
  window.closeErpModal = function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-open');
    el.style.display = 'none';
    document.body.style.overflow = '';
  };
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('erp-modal-overlay') && e.target.classList.contains('is-open')) {
      e.target.classList.remove('is-open');
      e.target.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.erp-modal-overlay.is-open').forEach(function (m) {
        m.classList.remove('is-open');
        m.style.display = 'none';
      });
      document.body.style.overflow = '';
    }
  });

  window.showToast = function (message, type) {
    type = type || 'info';
    var c = document.getElementById('toastContainer');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toastContainer';
      c.className = 'toast-container-v2';
      document.body.appendChild(c);
    }
    var icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
    var el = document.createElement('div');
    el.className = 'toast-item toast-' + type;
    el.innerHTML = '<i class="bi ' + (icons[type] || icons.info) + '"></i><span>' + message + '</span>';
    c.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.remove(); }, 300);
    }, 3200);
  };

  window.statusBadge = function (status) {
    if (typeof MockData !== 'undefined' && MockData.statusLabels && MockData.statusLabels[status]) {
      var s = MockData.statusLabels[status];
      return '<span class="badge ' + s.class + '">' + s.text + '</span>';
    }
    return '<span class="badge badge-secondary">' + (status || '—') + '</span>';
  };

  window.formatMoney = function (n) {
    if (typeof MockData !== 'undefined' && MockData.formatCurrency) return MockData.formatCurrency(n);
    return (Number(n) || 0).toLocaleString('ar-EG', { minimumFractionDigits: 2 }) + ' ج.م';
  };

  window.initERPPage = function (opts) {
    opts = opts || {};
    document.title = (opts.title ? opts.title + ' - ' : '') + SYSTEM_NAME;

    try {
      if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark-mode');
    } catch (e) {}

    // Apply company settings if available
    try {
      if (typeof MockStore !== 'undefined') {
        var st = MockStore.getSettings();
        if (st && st.systemName) SYSTEM_NAME = st.systemName;
        if (st && st.systemSub) SYSTEM_SUB = st.systemSub;
      }
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

    var fv = document.querySelector('.footer-version');
    if (fv) fv.textContent = 'الإصدار ' + VERSION;

    var toggle = document.getElementById('sidebarToggle');
    if (toggle) toggle.onclick = function (e) { e.preventDefault(); toggleSidebar(); };

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

    // Post-init enhancements
    setupNavExtras();
    ensureFAB();
    updateNotifBadge();
  };

  // ===== لوحة الأوامر Ctrl+K =====
  var CMD_PAGES = [
    { label: 'لوحة التحكم', href: 'index.html', icon: 'bi-grid-1x2-fill', group: 'صفحات' },
    { label: 'العملاء', href: 'customers.html', icon: 'bi-people-fill', group: 'صفحات' },
    { label: 'الموردون', href: 'suppliers.html', icon: 'bi-truck', group: 'صفحات' },
    { label: 'المنتجات', href: 'products.html', icon: 'bi-box-seam-fill', group: 'صفحات' },
    { label: 'وحدات القياس', href: 'units.html', icon: 'bi-rulers', group: 'صفحات' },
    { label: 'فواتير المبيعات', href: 'sales-invoices.html', icon: 'bi-receipt', group: 'صفحات' },
    { label: 'فواتير المشتريات', href: 'purchase-invoices.html', icon: 'bi-receipt-cutoff', group: 'صفحات' },
    { label: 'سندات القبض', href: 'receipts.html', icon: 'bi-cash-coin', group: 'صفحات' },
    { label: 'سندات الصرف', href: 'payments.html', icon: 'bi-cash-stack', group: 'صفحات' },
    { label: 'القيود اليومية', href: 'journal-entries.html', icon: 'bi-journal-text', group: 'صفحات' },
    { label: 'دفتر الأستاذ', href: 'general-ledger.html', icon: 'bi-book-fill', group: 'صفحات' },
    { label: 'دليل الحسابات', href: 'chart-of-accounts.html', icon: 'bi-diagram-3-fill', group: 'صفحات' },
    { label: 'كشف حساب', href: 'customer-statement.html', icon: 'bi-file-text', group: 'صفحات' },
    { label: 'التقارير المالية', href: 'financial-reports.html', icon: 'bi-file-earmark-bar-graph-fill', group: 'صفحات' },
    { label: 'مركز التقارير', href: 'reports.html', icon: 'bi-file-earmark-bar-graph', group: 'صفحات' },
    { label: 'الخزائن', href: 'treasuries.html', icon: 'bi-wallet-fill', group: 'صفحات' },
    { label: 'الحسابات البنكية', href: 'bank-accounts.html', icon: 'bi-bank', group: 'صفحات' },
    { label: 'المصروفات', href: 'expenses.html', icon: 'bi-cash', group: 'صفحات' },
    { label: 'الموظفون', href: 'employees.html', icon: 'bi-person-badge-fill', group: 'صفحات' },
    { label: 'الأصول الثابتة', href: 'fixed-assets.html', icon: 'bi-building-gear', group: 'صفحات' },
    { label: 'منخفض المخزون', href: 'low-stock.html', icon: 'bi-exclamation-triangle-fill', group: 'صفحات' },
    { label: 'الإعدادات', href: 'settings.html', icon: 'bi-gear-fill', group: 'صفحات' }
  ];

  function ensureCmdPalette() {
    if (document.getElementById('cmdOverlay')) return;
    var o = document.createElement('div');
    o.id = 'cmdOverlay';
    o.className = 'cmd-overlay-v2';
    o.innerHTML =
      '<div class="cmd-box-v2">' +
      '<div class="cmd-input-row">' +
      '<i class="bi bi-search"></i>' +
      '<input id="cmdInput" type="text" placeholder="ابحث عن صفحة أو عميل أو منتج أو فاتورة..." autocomplete="off" />' +
      '<kbd>Esc</kbd></div>' +
      '<div id="cmdResults" class="cmd-results-v2"></div>' +
      '<div class="cmd-footer-v2">Ctrl+K للفتح · Enter للانتقال · ↑↓ للتنقل</div></div>';
    document.body.appendChild(o);
    o.addEventListener('click', function (e) { if (e.target === o) closeCommandPalette(); });
    document.getElementById('cmdInput').addEventListener('input', renderCmdResults);
    document.getElementById('cmdInput').addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCommandPalette();
      if (e.key === 'Enter') {
        var first = document.querySelector('#cmdResults [data-href]');
        if (first) location.href = first.getAttribute('data-href');
      }
    });
  }

  function renderCmdResults() {
    var q = (document.getElementById('cmdInput').value || '').toLowerCase().trim();
    var list = CMD_PAGES.filter(function (p) { return !q || p.label.toLowerCase().indexOf(q) >= 0; });
    var box = document.getElementById('cmdResults');
    var html = '';
    if (list.length) {
      html += '<div class="cmd-group">صفحات</div>';
      html += list.slice(0, 8).map(function (p) {
        return '<a data-href="' + p.href + '" href="' + p.href + '" class="cmd-item">' +
          '<i class="bi ' + p.icon + '"></i><span>' + p.label + '</span></a>';
      }).join('');
    }
    if (q && q.length >= 1) {
      try {
        var custs = (typeof MockStore !== 'undefined' ? MockStore.get('customers') : (MockData && MockData.customers)) || [];
        var prods = (typeof MockStore !== 'undefined' ? MockStore.get('products') : (MockData && MockData.products)) || [];
        var invs = (typeof MockStore !== 'undefined' ? MockStore.get('salesInvoices') : (MockData && MockData.salesInvoices)) || [];
        var mc = custs.filter(function (c) { return (c.name + c.code + (c.phone || '')).toLowerCase().indexOf(q) >= 0; }).slice(0, 5);
        var mp = prods.filter(function (p) { return (p.name + p.code).toLowerCase().indexOf(q) >= 0; }).slice(0, 5);
        var mi = invs.filter(function (i) { return ((i.number || '') + '').toLowerCase().indexOf(q) >= 0; }).slice(0, 5);
        if (mc.length) {
          html += '<div class="cmd-group">عملاء</div>';
          html += mc.map(function (c) {
            return '<a data-href="customer-statement.html?id=' + c.id + '" href="customer-statement.html?id=' + c.id + '" class="cmd-item">' +
              '<i class="bi bi-person" style="color:var(--accent)"></i><span>' + c.name + '</span><span class="cmd-meta">' + c.code + '</span></a>';
          }).join('');
        }
        if (mp.length) {
          html += '<div class="cmd-group">منتجات</div>';
          html += mp.map(function (p) {
            return '<a data-href="products.html" href="products.html" class="cmd-item">' +
              '<i class="bi bi-box" style="color:var(--accent)"></i><span>' + p.name + '</span><span class="cmd-meta">' + p.code + '</span></a>';
          }).join('');
        }
        if (mi.length) {
          html += '<div class="cmd-group">فواتير</div>';
          html += mi.map(function (i) {
            return '<a data-href="print-invoice.html?id=' + i.id + '" href="print-invoice.html?id=' + i.id + '" class="cmd-item">' +
              '<i class="bi bi-receipt" style="color:var(--accent)"></i><span>' + i.number + '</span></a>';
          }).join('');
        }
      } catch (err) {}
    }
    if (!html) html = '<div class="cmd-empty">لا نتائج مطابقة</div>';
    box.innerHTML = html;
  }

  window.openCommandPalette = function () {
    ensureCmdPalette();
    document.getElementById('cmdOverlay').style.display = 'flex';
    document.getElementById('cmdInput').value = '';
    renderCmdResults();
    setTimeout(function () { document.getElementById('cmdInput').focus(); }, 40);
  };
  window.closeCommandPalette = function () {
    var o = document.getElementById('cmdOverlay');
    if (o) o.style.display = 'none';
  };

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCommandPalette(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      var btn = document.getElementById('darkModeToggle');
      if (btn) btn.click();
    }
    if (e.key === 'Escape') closeCommandPalette();
  });

  // ===== FAB =====
  function ensureFAB() {
    if (document.getElementById('quickFab')) return;
    var wrap = document.createElement('div');
    wrap.id = 'quickFab';
    wrap.className = 'quick-fab-v2';
    wrap.innerHTML =
      '<button type="button" id="fabMain" class="fab-main" title="إجراءات سريعة"><i class="bi bi-plus-lg"></i></button>' +
      '<div id="fabMenu" class="fab-menu"></div>';
    document.body.appendChild(wrap);
    var items = [
      { href: 'sales-invoices.html', icon: 'bi-receipt', label: 'فاتورة مبيعات' },
      { href: 'receipts.html', icon: 'bi-cash-coin', label: 'سند قبض' },
      { href: 'customers.html', icon: 'bi-person-plus', label: 'عميل جديد' },
      { href: 'products.html', icon: 'bi-box-seam', label: 'منتج جديد' },
      { href: 'journal-entries.html', icon: 'bi-journal-plus', label: 'قيد يومي' },
      { href: 'expenses.html', icon: 'bi-cash', label: 'مصروف جديد' }
    ];
    var menu = document.getElementById('fabMenu');
    menu.innerHTML = items.map(function (it) {
      return '<a href="' + it.href + '" class="fab-item"><i class="bi ' + it.icon + '"></i>' + it.label + '</a>';
    }).join('');
    var open = false;
    document.getElementById('fabMain').onclick = function () {
      open = !open;
      menu.classList.toggle('open', open);
      this.classList.toggle('open', open);
    };
  }

  // ===== إشعارات =====
  function getNotifItems() {
    var items = [];
    try {
      var prods = (typeof MockStore !== 'undefined' ? MockStore.get('products') : MockData.products) || [];
      var invs = (typeof MockStore !== 'undefined' ? MockStore.get('salesInvoices') : MockData.salesInvoices) || [];
      var low = prods.filter(function (x) { return x.qty <= x.minQty; }).length;
      if (low) items.push({ t: 'مخزون منخفض', d: low + ' صنف تحت الحد الأدنى', c: 'warning', href: 'low-stock.html' });
      var unpaid = invs.filter(function (x) { return x.status === 'unpaid' || x.status === 'partial' || x.status === 'overdue'; }).length;
      if (unpaid) items.push({ t: 'فواتير معلقة', d: unpaid + ' فاتورة بانتظار التحصيل', c: 'danger', href: 'sales-invoices.html' });
      items.push({ t: 'تحديث النظام', d: 'مرحباً بك في QuickData ProSoft v' + VERSION, c: 'info', href: 'settings.html' });
    } catch (err) {}
    return items;
  }

  function updateNotifBadge() {
    var items = getNotifItems();
    var count = items.filter(function (i) { return i.c === 'warning' || i.c === 'danger'; }).length;
    var btn = document.getElementById('notifBtn');
    if (!btn) return;
    var badge = btn.querySelector('.notif-badge');
    if (count > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'notif-badge';
        btn.style.position = 'relative';
        btn.appendChild(badge);
      }
      badge.textContent = count > 9 ? '9+' : String(count);
      badge.style.display = '';
    } else if (badge) {
      badge.style.display = 'none';
    }
  }

  function ensureNotif() {
    if (document.getElementById('notifPanel')) return;
    var p = document.createElement('div');
    p.id = 'notifPanel';
    p.className = 'notif-panel-v2';
    var items = getNotifItems();
    p.innerHTML =
      '<div class="notif-head"><span>الإشعارات</span><button type="button" id="notifClose">&times;</button></div>' +
      '<div class="notif-body">' +
      (items.map(function (n) {
        return '<a href="' + (n.href || '#') + '" class="notif-item notif-' + n.c + '">' +
          '<div class="notif-title">' + n.t + '</div>' +
          '<div class="notif-desc">' + n.d + '</div></a>';
      }).join('') || '<div class="notif-empty">لا إشعارات</div>') +
      '</div>';
    document.body.appendChild(p);
    document.getElementById('notifClose').onclick = function () { p.style.display = 'none'; };
  }

  function setupNavExtras() {
    var notifRef = document.getElementById('notifBtn');
    if (notifRef && !document.getElementById('cmdNavBtn')) {
      var sb = document.createElement('button');
      sb.id = 'cmdNavBtn';
      sb.type = 'button';
      sb.className = 'nav-btn';
      sb.title = 'بحث سريع (Ctrl+K)';
      sb.innerHTML = '<i class="bi bi-search"></i>';
      sb.onclick = function () { openCommandPalette(); };
      notifRef.parentNode.insertBefore(sb, notifRef);
    }
    var nb = document.getElementById('notifBtn');
    if (nb) {
      nb.onclick = function (e) {
        e.stopPropagation();
        ensureNotif();
        var p = document.getElementById('notifPanel');
        p.style.display = p.style.display === 'flex' ? 'none' : 'flex';
      };
    }
    document.addEventListener('click', function () {
      var p = document.getElementById('notifPanel');
      if (p) p.style.display = 'none';
    });
  }

  // Expose version
  window.QDPS_VERSION = VERSION;
})();
