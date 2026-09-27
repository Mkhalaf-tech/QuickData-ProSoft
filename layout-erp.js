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

  

  /** فتح نافذة بشكل موثوق: ينقلها لـ body ويرفع z-index */
  window.openErpModal = function(id) {
    var el = document.getElementById(id);
    if (!el) { console.error('Modal not found:', id); return; }
    if (el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
    el.classList.add('erp-modal-overlay', 'is-open');
    el.style.display = 'flex';
    el.style.zIndex = '10000';
    document.body.style.overflow = 'hidden';
  };
  window.closeErpModal = function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-open');
    el.style.display = 'none';
    document.body.style.overflow = '';
  };
  // إغلاق بالضغط على الخلفية
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList && e.target.classList.contains('erp-modal-overlay') && e.target.classList.contains('is-open')) {
      e.target.classList.remove('is-open');
      e.target.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.erp-modal-overlay.is-open').forEach(function(m) {
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
    { label: 'الإعدادات', href: 'settings.html', icon: 'bi-gear-fill', group: 'صفحات' }
  ];

  function ensureCmdPalette() {
    if (document.getElementById('cmdOverlay')) return;
    var o = document.createElement('div');
    o.id = 'cmdOverlay';
    o.style.cssText = 'display:none;position:fixed;inset:0;z-index:5000;background:rgba(14,28,46,.5);backdrop-filter:blur(3px);align-items:flex-start;justify-content:center;padding-top:12vh';
    o.innerHTML = '<div style="width:100%;max-width:520px;background:var(--surface,#fff);border-radius:14px;box-shadow:0 20px 50px rgba(14,28,46,.25);border:1px solid var(--border,#e0dccf);overflow:hidden;font-family:Cairo,sans-serif">' +
      '<div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--border,#e0dccf)">' +
      '<i class="bi bi-search" style="color:var(--text-tertiary,#928c79)"></i>' +
      '<input id="cmdInput" type="text" placeholder="ابحث عن صفحة أو إجراء..." style="flex:1;border:none;outline:none;background:transparent;font-family:inherit;font-size:14px;color:var(--text,#181712)" />' +
      '<kbd style="font-size:11px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;color:var(--text-tertiary)">Esc</kbd></div>' +
      '<div id="cmdResults" style="max-height:340px;overflow-y:auto;padding:8px"></div>' +
      '<div style="padding:8px 14px;border-top:1px solid var(--border);font-size:11px;color:var(--text-tertiary)">Ctrl+K للفتح · Enter للانتقال</div></div>';
    document.body.appendChild(o);
    o.addEventListener('click', function(e){ if(e.target===o) closeCommandPalette(); });
    document.getElementById('cmdInput').addEventListener('input', renderCmdResults);
    document.getElementById('cmdInput').addEventListener('keydown', function(e){
      if(e.key==='Escape') closeCommandPalette();
      if(e.key==='Enter'){
        var first = document.querySelector('#cmdResults [data-href]');
        if(first) location.href = first.getAttribute('data-href');
      }
    });
  }

  function renderCmdResults() {
    var q = (document.getElementById('cmdInput').value||'').toLowerCase();
    var list = CMD_PAGES.filter(function(p){ return !q || p.label.toLowerCase().indexOf(q)>=0; });
    var box = document.getElementById('cmdResults');
    var html = '';
    if (list.length) {
      html += '<div style="font-size:10px;font-weight:700;color:var(--text-tertiary);padding:6px 10px">صفحات</div>';
      html += list.map(function(p){
        return '<a data-href="'+p.href+'" href="'+p.href+'" style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;text-decoration:none;color:inherit">' +
          '<i class="bi '+p.icon+'" style="font-size:16px;color:var(--text-secondary);width:22px;text-align:center"></i>' +
          '<span style="font-size:13.5px;font-weight:600">'+p.label+'</span></a>';
      }).join('');
    }
    // Search records if MockStore / MockData available
    if (q && q.length >= 1) {
      try {
        var custs = (typeof MockStore!=='undefined' ? MockStore.get('customers') : (MockData&&MockData.customers)) || [];
        var prods = (typeof MockStore!=='undefined' ? MockStore.get('products') : (MockData&&MockData.products)) || [];
        var invs = (typeof MockStore!=='undefined' ? MockStore.get('salesInvoices') : (MockData&&MockData.salesInvoices)) || [];
        var mc = custs.filter(function(c){ return (c.name+c.code+(c.phone||'')).toLowerCase().indexOf(q)>=0; }).slice(0,5);
        var mp = prods.filter(function(p){ return (p.name+p.code).toLowerCase().indexOf(q)>=0; }).slice(0,5);
        var mi = invs.filter(function(i){ return (i.number||'').toLowerCase().indexOf(q)>=0; }).slice(0,5);
        if (mc.length) {
          html += '<div style="font-size:10px;font-weight:700;color:var(--text-tertiary);padding:6px 10px">عملاء</div>';
          html += mc.map(function(c){
            return '<a data-href="customer-statement.html?id='+c.id+'" href="customer-statement.html?id='+c.id+'" style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;text-decoration:none;color:inherit">'+
              '<i class="bi bi-person" style="width:22px;text-align:center;color:var(--accent)"></i><span style="font-size:13px;font-weight:600">'+c.name+'</span><span style="margin-right:auto;font-size:11px;color:var(--text-tertiary)">'+c.code+'</span></a>';
          }).join('');
        }
        if (mp.length) {
          html += '<div style="font-size:10px;font-weight:700;color:var(--text-tertiary);padding:6px 10px">منتجات</div>';
          html += mp.map(function(p){
            return '<a data-href="products.html" href="products.html" style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;text-decoration:none;color:inherit">'+
              '<i class="bi bi-box" style="width:22px;text-align:center;color:var(--accent)"></i><span style="font-size:13px;font-weight:600">'+p.name+'</span><span style="margin-right:auto;font-size:11px;color:var(--text-tertiary)">'+p.code+'</span></a>';
          }).join('');
        }
        if (mi.length) {
          html += '<div style="font-size:10px;font-weight:700;color:var(--text-tertiary);padding:6px 10px">فواتير</div>';
          html += mi.map(function(i){
            return '<a data-href="print-invoice.html?id='+i.id+'" href="print-invoice.html?id='+i.id+'" style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;text-decoration:none;color:inherit">'+
              '<i class="bi bi-receipt" style="width:22px;text-align:center;color:var(--accent)"></i><span style="font-size:13px;font-weight:600">'+i.number+'</span></a>';
          }).join('');
        }
      } catch (err) {}
    }
    if (!html) html = '<div style="text-align:center;padding:28px;color:var(--text-tertiary);font-size:13px">لا نتائج</div>';
    box.innerHTML = html;
  }

  window.openCommandPalette = function() {
    ensureCmdPalette();
    document.getElementById('cmdOverlay').style.display = 'flex';
    document.getElementById('cmdInput').value = '';
    renderCmdResults();
    setTimeout(function(){ document.getElementById('cmdInput').focus(); }, 50);
  };
  window.closeCommandPalette = function() {
    var o = document.getElementById('cmdOverlay');
    if(o) o.style.display = 'none';
  };

  document.addEventListener('keydown', function(e){
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openCommandPalette(); }
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='d'){
      e.preventDefault();
      var btn = document.getElementById('darkModeToggle');
      if(btn) btn.click();
    }
    if(e.key==='Escape') closeCommandPalette();
  });

  // ===== إشعارات =====
  

  function ensureFAB() {
    if (document.getElementById('quickFab')) return;
    var wrap = document.createElement('div');
    wrap.id = 'quickFab';
    wrap.style.cssText = 'position:fixed;bottom:24px;left:24px;z-index:1500;display:flex;flex-direction:column-reverse;align-items:flex-start;gap:8px;font-family:Cairo,sans-serif';
    wrap.innerHTML = '<button type="button" id="fabMain" style="width:52px;height:52px;border-radius:50%;border:none;background:var(--accent,#dc2626);color:#fff;font-size:22px;box-shadow:0 4px 16px rgba(220,38,38,.4);cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="bi bi-plus-lg"></i></button>'+
      '<div id="fabMenu" style="display:none;flex-direction:column;gap:6px"></div>';
    document.body.appendChild(wrap);
    var items = [
      { href:'sales-invoices.html', icon:'bi-receipt', label:'فاتورة مبيعات' },
      { href:'receipts.html', icon:'bi-cash-coin', label:'سند قبض' },
      { href:'customers.html', icon:'bi-person-plus', label:'عميل جديد' },
      { href:'products.html', icon:'bi-box-seam', label:'منتج جديد' },
      { href:'journal-entries.html', icon:'bi-journal-plus', label:'قيد يومي' }
    ];
    var menu = document.getElementById('fabMenu');
    menu.innerHTML = items.map(function(it){
      return '<a href="'+it.href+'" style="display:flex;align-items:center;gap:8px;background:var(--surface,#fff);border:1px solid var(--border,#e0dccf);padding:8px 14px;border-radius:9999px;box-shadow:0 4px 12px rgba(14,28,46,.1);text-decoration:none;color:inherit;font-size:12.5px;font-weight:600"><i class="bi '+it.icon+'" style="color:var(--accent)"></i>'+it.label+'</a>';
    }).join('');
    var open = false;
    document.getElementById('fabMain').onclick = function(){
      open = !open;
      menu.style.display = open ? 'flex' : 'none';
      this.style.transform = open ? 'rotate(45deg)' : '';
      this.style.background = open ? '#ad3f39' : '';
    };
  }

  function ensureNotif() {
    if(document.getElementById('notifPanel')) return;
    var p = document.createElement('div');
    p.id = 'notifPanel';
    p.style.cssText = 'display:none;position:fixed;top:64px;left:20px;width:340px;max-height:400px;background:var(--surface,#fff);border-radius:12px;box-shadow:0 12px 40px rgba(14,28,46,.15);border:1px solid var(--border,#e0dccf);z-index:2000;overflow:hidden;flex-direction:column;font-family:Cairo,sans-serif';
    var items = [];
    try {
      if(typeof MockData!=='undefined'){
        var low = MockData.products.filter(function(x){return x.qty<=x.minQty;}).length;
        if(low) items.push({t:'مخزون منخفض', d: low+' صنف تحت الحد الأدنى', c:'#ad7f2e'});
        var unpaid = MockData.salesInvoices.filter(function(x){return x.status==='unpaid'||x.status==='partial';}).length;
        if(unpaid) items.push({t:'فواتير معلقة', d: unpaid+' فاتورة بانتظار التحصيل', c:'#ad3f39'});
        items.push({t:'مرحباً بك', d:'نظام QuickData ProSoft جاهز للاستخدام', c:'#2d6088'});
      }
    } catch(err){}
    p.innerHTML = '<div style="display:flex;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--border);font-weight:700;font-size:13px">الإشعارات <button type="button" id="notifClose" style="border:none;background:none;cursor:pointer;font-size:16px">&times;</button></div>' +
      '<div style="overflow-y:auto;flex:1">' + (items.map(function(n){
        return '<div style="padding:12px 14px;border-bottom:1px solid var(--border-light,#ebe7db);border-right:3px solid '+n.c+'"><div style="font-weight:700;font-size:13px">'+n.t+'</div><div style="font-size:12px;color:var(--text-secondary);margin-top:2px">'+n.d+'</div></div>';
      }).join('') || '<div style="padding:24px;text-align:center;color:var(--text-tertiary);font-size:13px">لا إشعارات</div>') + '</div>';
    document.body.appendChild(p);
    document.getElementById('notifClose').onclick = function(){ p.style.display='none'; };
  }

  // Hook notif button after init
  var _origInit = window.initERPPage;
  window.initERPPage = function(opts) {
    _origInit(opts);

    // زر البحث السريع بجانب الإشعارات
    var notifRef = document.getElementById('notifBtn');
    if (notifRef && !document.getElementById('cmdNavBtn')) {
      var sb = document.createElement('button');
      sb.id = 'cmdNavBtn';
      sb.type = 'button';
      sb.className = 'nav-btn';
      sb.title = 'بحث سريع (Ctrl+K)';
      sb.innerHTML = '<i class="bi bi-search"></i>';
      sb.onclick = function(){ openCommandPalette(); };
      notifRef.parentNode.insertBefore(sb, notifRef);
    }

    var nb = document.getElementById('notifBtn');
    if(nb){
      nb.onclick = function(e){
        e.stopPropagation();
        ensureNotif();
        try { ensureFAB(); } catch(e){}
        var p = document.getElementById('notifPanel');
        p.style.display = p.style.display==='flex' ? 'none' : 'flex';
      };
    }
    // search trigger in navbar optional
    document.addEventListener('click', function(){
      var p = document.getElementById('notifPanel');
      if(p) p.style.display = 'none';
    });
  };
