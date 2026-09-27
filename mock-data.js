const MockData = (function () {
  const statusLabels = {
    active: { text: "نشط", class: "badge-success" },
    inactive: { text: "غير نشط", class: "badge-secondary" },
    draft: { text: "مسودة", class: "badge-secondary" },
    approved: { text: "معتمد", class: "badge-info" },
    posted: { text: "مرحّل", class: "badge-success" },
    paid: { text: "مدفوع", class: "badge-success" },
    unpaid: { text: "غير مدفوع", class: "badge-danger" },
    partial: { text: "مدفوع جزئياً", class: "badge-warning" },
    overdue: { text: "متأخر", class: "badge-danger" },
    pending: { text: "قيد الانتظار", class: "badge-warning" },
    confirmed: { text: "مؤكد", class: "badge-success" },
    cancelled: { text: "ملغي", class: "badge-secondary" },
  };

  function formatCurrency(n) {
    return (Number(n) || 0).toLocaleString("ar-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ج.م";
  }
  function formatDate(d) {
    if (!d) return "—";
    const p = d.split("-");
    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : d;
  }

  const customers = [
    { id: 1, code: "C-001", name: "شركة النور للتجارة", phone: "01012345678", email: "info@alnoor.com", city: "القاهرة", address: "شارع التحرير", taxNumber: "100-200-300", balance: 45000, status: "active", createdAt: "2024-01-15" },
    { id: 2, code: "C-002", name: "مؤسسة الأمل", phone: "01098765432", email: "amal@mail.com", city: "الجيزة", address: "فيصل", taxNumber: "", balance: 12500, status: "active", createdAt: "2024-02-10" },
    { id: 3, code: "C-003", name: "تاجر الجملة - أحمد", phone: "01123456789", email: "", city: "الإسكندرية", address: "سموحة", taxNumber: "", balance: 82000, status: "active", createdAt: "2024-03-01" },
    { id: 4, code: "C-004", name: "محلات السلام", phone: "01234567890", email: "salam@shop.com", city: "المنصورة", address: "", taxNumber: "400-500-600", balance: 0, status: "active", createdAt: "2024-03-20" },
    { id: 5, code: "C-005", name: "شركة البناء الحديث", phone: "01555555555", email: "build@co.com", city: "القاهرة", address: "مدينة نصر", taxNumber: "700-800-900", balance: 156000, status: "active", createdAt: "2024-04-05" },
    { id: 6, code: "C-006", name: "صيدلية الشفاء", phone: "01000001111", email: "", city: "طنطا", address: "", taxNumber: "", balance: 3200, status: "inactive", createdAt: "2024-05-12" },
    { id: 7, code: "C-007", name: "مكتبة المعرفة", phone: "01112223334", email: "books@know.com", city: "أسيوط", address: "", taxNumber: "", balance: 7800, status: "active", createdAt: "2024-06-01" },
    { id: 8, code: "C-008", name: "مطعم البحر", phone: "01221112223", email: "", city: "الإسكندرية", address: "الكورنيش", taxNumber: "", balance: 21000, status: "active", createdAt: "2024-07-15" },
  ];

  const suppliers = [
    { id: 1, code: "S-001", name: "مصنع الإلكترونيات المتحدة", phone: "0223456789", email: "sales@elec.com", city: "القاهرة", address: "المنطقة الصناعية", taxNumber: "111-222-333", balance: 95000, status: "active", createdAt: "2024-01-10" },
    { id: 2, code: "S-002", name: "شركة الأغذية الطازجة", phone: "0229876543", email: "fresh@food.com", city: "الجيزة", address: "", taxNumber: "444-555-666", balance: 28000, status: "active", createdAt: "2024-02-01" },
    { id: 3, code: "S-003", name: "مستورد الأجهزة المنزلية", phone: "0333444555", email: "", city: "بورسعيد", address: "", taxNumber: "", balance: 142000, status: "active", createdAt: "2024-02-20" },
    { id: 4, code: "S-004", name: "مورد الورق والقرطاسية", phone: "0221112223", email: "paper@sup.com", city: "القاهرة", address: "", taxNumber: "", balance: 8500, status: "active", createdAt: "2024-03-15" },
    { id: 5, code: "S-005", name: "شركة التعبئة والتغليف", phone: "01099887766", email: "", city: "العاشر من رمضان", address: "", taxNumber: "", balance: 0, status: "inactive", createdAt: "2024-04-01" },
  ];

  const categories = [
    { id: 1, name: "إلكترونيات", productsCount: 4 },
    { id: 2, name: "أجهزة منزلية", productsCount: 3 },
    { id: 3, name: "مواد غذائية", productsCount: 2 },
    { id: 4, name: "قرطاسية", productsCount: 2 },
  ];
  const units = [
    { id: 1, name: "قطعة" }, { id: 2, name: "علبة" }, { id: 3, name: "كرتونة" }, { id: 4, name: "كيلو" },
  ];
  const warehouses = [
    { id: 1, name: "المخزن الرئيسي", location: "القاهرة", status: "active" },
    { id: 2, name: "مخزن الإسكندرية", location: "الإسكندرية", status: "active" },
    { id: 3, name: "مخزن الجيزة", location: "الجيزة", status: "active" },
  ];

  const products = [
    { id: 1, code: "P-001", name: "هاتف ذكي سامسونج A54", brand: "Samsung", categoryId: 1, unitId: 1, salePrice: 12500, purchasePrice: 10200, qty: 45, minQty: 10, warehouseId: 1, status: "active" },
    { id: 2, code: "P-002", name: "لابتوب ديل إنسبايرون 15", brand: "Dell", categoryId: 1, unitId: 1, salePrice: 28500, purchasePrice: 24000, qty: 12, minQty: 5, warehouseId: 1, status: "active" },
    { id: 3, code: "P-003", name: "سماعات بلوتوث", brand: "Sony", categoryId: 1, unitId: 1, salePrice: 450, purchasePrice: 280, qty: 8, minQty: 15, warehouseId: 1, status: "active" },
    { id: 4, code: "P-004", name: "شاحن سريع USB-C", brand: "Anker", categoryId: 1, unitId: 1, salePrice: 120, purchasePrice: 65, qty: 120, minQty: 30, warehouseId: 2, status: "active" },
    { id: 5, code: "P-005", name: "ثلاجة توشيبا 16 قدم", brand: "Toshiba", categoryId: 2, unitId: 1, salePrice: 18900, purchasePrice: 15500, qty: 6, minQty: 3, warehouseId: 1, status: "active" },
    { id: 6, code: "P-006", name: "غسالة أوتوماتيك LG", brand: "LG", categoryId: 2, unitId: 1, salePrice: 15200, purchasePrice: 12800, qty: 4, minQty: 3, warehouseId: 1, status: "active" },
    { id: 7, code: "P-007", name: "مكيف سبليت 1.5 حصان", brand: "Carrier", categoryId: 2, unitId: 1, salePrice: 16500, purchasePrice: 13800, qty: 2, minQty: 4, warehouseId: 3, status: "active" },
    { id: 8, code: "P-008", name: "أرز بسمتي 5 كجم", brand: "الضحى", categoryId: 3, unitId: 2, salePrice: 185, purchasePrice: 140, qty: 200, minQty: 50, warehouseId: 2, status: "active" },
    { id: 9, code: "P-009", name: "زيت ذرة 1.5 لتر", brand: "عافية", categoryId: 3, unitId: 2, salePrice: 95, purchasePrice: 72, qty: 18, minQty: 40, warehouseId: 2, status: "active" },
    { id: 10, code: "P-010", name: "طابعة ليزر كانون", brand: "Canon", categoryId: 4, unitId: 1, salePrice: 4200, purchasePrice: 3500, qty: 9, minQty: 3, warehouseId: 1, status: "active" },
    
    { id: 12, code: "P-012", name: "شاشة سامسونج 27 بوصة", brand: "Samsung", categoryId: 1, unitId: 1, salePrice: 6500, purchasePrice: 5200, qty: 15, minQty: 5, warehouseId: 1, status: "active" },
    { id: 13, code: "P-013", name: "كيبورد ميكانيكي", brand: "Logitech", categoryId: 1, unitId: 1, salePrice: 890, purchasePrice: 520, qty: 3, minQty: 10, warehouseId: 1, status: "active" },
    { id: 14, code: "P-014", name: "ماوس لاسلكي", brand: "Logitech", categoryId: 1, unitId: 1, salePrice: 350, purchasePrice: 180, qty: 40, minQty: 15, warehouseId: 2, status: "active" },
    { id: 15, code: "P-015", name: "مكواة بخار فيليبس", brand: "Philips", categoryId: 2, unitId: 1, salePrice: 1200, purchasePrice: 850, qty: 22, minQty: 8, warehouseId: 1, status: "active" },
    { id: 16, code: "P-016", name: "خلاط كهربائي", brand: "Braun", categoryId: 2, unitId: 1, salePrice: 2100, purchasePrice: 1500, qty: 11, minQty: 5, warehouseId: 3, status: "active" },
    { id: 17, code: "P-017", name: "سكر أبيض 1 كجم", brand: "", categoryId: 3, unitId: 2, salePrice: 32, purchasePrice: 24, qty: 500, minQty: 100, warehouseId: 2, status: "active" },
    { id: 18, code: "P-018", name: "شاي أحمد 100 فتلة", brand: "أحمد", categoryId: 3, unitId: 2, salePrice: 55, purchasePrice: 38, qty: 80, minQty: 30, warehouseId: 2, status: "active" },
    { id: 19, code: "P-019", name: "أقلام جاف علبة 12", brand: "", categoryId: 4, unitId: 2, salePrice: 45, purchasePrice: 28, qty: 60, minQty: 20, warehouseId: 1, status: "active" },
    { id: 20, code: "P-020", name: "ملفات حافظة A4", brand: "", categoryId: 4, unitId: 1, salePrice: 25, purchasePrice: 12, qty: 4, minQty: 25, warehouseId: 1, status: "active" },
    { id: 11, code: "P-011", name: "دفاتر A4 عبوة 10", brand: "", categoryId: 4, unitId: 3, salePrice: 85, purchasePrice: 55, qty: 50, minQty: 20, warehouseId: 1, status: "active" },
  ];

  const salesInvoices = [
    { id: 1, number: "INV-2024-001", customerId: 1, date: "2024-08-01", dueDate: "2024-08-31", warehouseId: 1, subtotal: 29500, discount: 0, tax: 4130, total: 33630, paid: 33630, status: "paid", notes: "" },
    { id: 2, number: "INV-2024-002", customerId: 3, date: "2024-08-05", dueDate: "2024-09-05", warehouseId: 1, subtotal: 28500, discount: 0, tax: 3990, total: 32490, paid: 15000, status: "partial", notes: "" },
    { id: 3, number: "INV-2024-003", customerId: 5, date: "2024-08-10", dueDate: "2024-09-10", warehouseId: 1, subtotal: 68200, discount: 2000, tax: 9268, total: 75468, paid: 0, status: "unpaid", notes: "طلب جملة" },
    { id: 4, number: "INV-2024-004", customerId: 2, date: "2024-08-12", dueDate: "2024-08-27", warehouseId: 2, subtotal: 6550, discount: 0, tax: 917, total: 7467, paid: 7467, status: "paid", notes: "" },
    { id: 5, number: "INV-2024-005", customerId: 1, date: "2024-08-15", dueDate: "2024-09-15", warehouseId: 1, subtotal: 139500, discount: 5000, tax: 18830, total: 153330, paid: 50000, status: "partial", notes: "" },
    { id: 6, number: "INV-2024-006", customerId: 4, date: "2024-08-20", dueDate: "2024-09-20", warehouseId: 1, subtotal: 12600, discount: 0, tax: 1764, total: 14364, paid: 0, status: "draft", notes: "مسودة" },
    
    { id: 8, number: "INV-2024-008", customerId: 5, date: "2024-08-22", dueDate: "2024-09-22", warehouseId: 1, subtotal: 42000, discount: 1000, tax: 5740, total: 46740, paid: 46740, status: "paid", notes: "" },
    { id: 9, number: "INV-2024-009", customerId: 7, date: "2024-08-25", dueDate: "2024-09-25", warehouseId: 1, subtotal: 8500, discount: 0, tax: 1190, total: 9690, paid: 0, status: "unpaid", notes: "" },
    { id: 10, number: "INV-2024-010", customerId: 3, date: "2024-08-28", dueDate: "2024-09-28", warehouseId: 2, subtotal: 15600, discount: 500, tax: 2114, total: 17214, paid: 8000, status: "partial", notes: "" },
    { id: 7, number: "INV-2024-007", customerId: 8, date: "2024-07-01", dueDate: "2024-07-15", warehouseId: 1, subtotal: 16800, discount: 500, tax: 2282, total: 18582, paid: 0, status: "overdue", notes: "" },
  ];

  const purchaseInvoices = [
    { id: 1, number: "PINV-001", supplierId: 1, date: "2024-07-20", total: 120000, paid: 120000, status: "paid" },
    { id: 2, number: "PINV-002", supplierId: 3, date: "2024-08-01", total: 85000, paid: 40000, status: "partial" },
    { id: 3, number: "PINV-003", supplierId: 2, date: "2024-08-08", total: 35000, paid: 0, status: "unpaid" },
  ];

  const receipts = [
    { id: 1, number: "RCP-001", customerId: 1, date: "2024-08-02", amount: 33630, method: "bank", status: "confirmed", notes: "سداد فاتورة 001" },
    { id: 2, number: "RCP-002", customerId: 3, date: "2024-08-06", amount: 15000, method: "cash", status: "confirmed", notes: "دفعة جزئية" },
    { id: 3, number: "RCP-003", customerId: 2, date: "2024-08-13", amount: 7467, method: "bank", status: "confirmed", notes: "" },
    { id: 4, number: "RCP-004", customerId: 1, date: "2024-08-18", amount: 50000, method: "check", status: "confirmed", notes: "شيك رقم 4521" },
  ];

  const paymentsList = [
    { id: 1, number: "PAY-001", supplierId: 1, date: "2024-07-25", amount: 120000, method: "bank", status: "confirmed", notes: "سداد كامل" },
    { id: 2, number: "PAY-002", supplierId: 3, date: "2024-08-05", amount: 40000, method: "bank", status: "confirmed", notes: "" },
    { id: 3, number: "PAY-003", supplierId: null, date: "2024-08-10", amount: 5000, method: "cash", status: "confirmed", notes: "إيجار مكتب" },
  ];

  const accounts = [
    { id: 1, code: "1", name: "الأصول", isGroup: true, parentId: null, type: "asset" },
    { id: 2, code: "1-1", name: "الأصول المتداولة", isGroup: true, parentId: 1, type: "asset" },
    { id: 3, code: "1-1-1", name: "الصندوق", isGroup: false, parentId: 2, type: "asset", balance: 45000 },
    { id: 4, code: "1-1-2", name: "البنك", isGroup: false, parentId: 2, type: "asset", balance: 320000 },
    { id: 5, code: "1-1-3", name: "العملاء", isGroup: false, parentId: 2, type: "asset", balance: 327500 },
    { id: 6, code: "1-1-4", name: "المخزون", isGroup: false, parentId: 2, type: "asset", balance: 485000 },
    { id: 7, code: "1-2", name: "الأصول الثابتة", isGroup: true, parentId: 1, type: "asset" },
    { id: 8, code: "1-2-1", name: "السيارات", isGroup: false, parentId: 7, type: "asset", balance: 250000 },
    { id: 9, code: "2", name: "الخصوم", isGroup: true, parentId: null, type: "liability" },
    { id: 10, code: "2-1", name: "الموردون", isGroup: false, parentId: 9, type: "liability", balance: 273500 },
    { id: 11, code: "3", name: "حقوق الملكية", isGroup: true, parentId: null, type: "equity" },
    { id: 12, code: "3-1", name: "رأس المال", isGroup: false, parentId: 11, type: "equity", balance: 1000000 },
    { id: 13, code: "4", name: "الإيرادات", isGroup: true, parentId: null, type: "revenue" },
    { id: 14, code: "4-1", name: "إيرادات المبيعات", isGroup: false, parentId: 13, type: "revenue", balance: 485000 },
    { id: 15, code: "5", name: "المصروفات", isGroup: true, parentId: null, type: "expense" },
    { id: 16, code: "5-1", name: "تكلفة البضاعة", isGroup: false, parentId: 15, type: "expense", balance: 310000 },
    { id: 17, code: "5-2", name: "مصروفات تشغيلية", isGroup: false, parentId: 15, type: "expense", balance: 45000 },
  ];

  const journalEntries = [
    { id: 1, number: "JE-001", date: "2024-08-01", description: "قيد افتتاحي", status: "posted", totalDebit: 1500000, totalCredit: 1500000 },
    { id: 2, number: "JE-002", date: "2024-08-02", description: "مبيعات نقدية وآجلة", status: "posted", totalDebit: 33630, totalCredit: 33630 },
    { id: 3, number: "JE-003", date: "2024-08-05", description: "شراء بضاعة من مورد", status: "posted", totalDebit: 85000, totalCredit: 85000 },
    { id: 4, number: "JE-004", date: "2024-08-15", description: "مصروف إيجار", status: "draft", totalDebit: 8000, totalCredit: 8000 },
  ];

  const treasuries = [
    { id: 1, name: "الخزينة الرئيسية", balance: 45000, status: "active" },
    { id: 2, name: "خزينة الفرع", balance: 12000, status: "active" },
  ];
  const bankAccounts = [
    { id: 1, name: "حساب الجاري - CIB", bank: "CIB", number: "1002345678", balance: 185000, status: "active" },
    { id: 2, name: "حساب التوفير - الأهلي", bank: "NBE", number: "2009876543", balance: 135000, status: "active" },
  ];
  const transfers = [
    { id: 1, number: "TRF-001", fromType: "treasury", fromId: 1, toType: "bank", toId: 1, date: "2024-08-03", amount: 20000, status: "confirmed", notes: "إيداع يومي" },
  ];

  const expenseTypes = [
    { id: 1, name: "إيجار" }, { id: 2, name: "كهرباء ومياه" }, { id: 3, name: "رواتب" },
    { id: 4, name: "صيانة" }, { id: 5, name: "اتصالات" }, { id: 6, name: "نثريات" },
  ];
  const expenses = [
    { id: 1, number: "EXP-001", typeId: 1, date: "2024-08-01", amount: 8000, description: "إيجار أغسطس", status: "approved", paymentMethod: "bank" },
    { id: 2, number: "EXP-002", typeId: 2, date: "2024-08-05", amount: 2500, description: "فاتورة كهرباء", status: "approved", paymentMethod: "cash" },
    { id: 3, number: "EXP-003", typeId: 4, date: "2024-08-12", amount: 1800, description: "صيانة مكيف", status: "pending", paymentMethod: "cash" },
  ];

  const employees = [
    { id: 1, code: "E-001", name: "محمد أحمد", department: "المبيعات", job: "مندوب مبيعات", salary: 8500, phone: "01011112222", status: "active" },
    { id: 2, code: "E-002", name: "سارة محمود", department: "المحاسبة", job: "محاسبة", salary: 12000, phone: "01022223333", status: "active" },
    { id: 3, code: "E-003", name: "خالد حسن", department: "المخازن", job: "أمين مخزن", salary: 7000, phone: "01033334444", status: "active" },
    { id: 4, code: "E-004", name: "نورا علي", department: "الإدارة", job: "مديرة موارد بشرية", salary: 15000, phone: "01044445555", status: "active" },
  ];
  const departments = [
    { id: 1, name: "المبيعات", employeesCount: 1 },
    { id: 2, name: "المحاسبة", employeesCount: 1 },
    { id: 3, name: "المخازن", employeesCount: 1 },
    { id: 4, name: "الإدارة", employeesCount: 1 },
  ];

  const fixedAssets = [
    { id: 1, code: "FA-001", name: "سيارة نقل", cost: 280000, depreciation: 30000, bookValue: 250000, status: "active" },
    { id: 2, code: "FA-002", name: "أجهزة كمبيوتر", cost: 45000, depreciation: 15000, bookValue: 30000, status: "active" },
  ];

  const users = [
    { id: 1, name: "مدير النظام", email: "admin@quickdata.com", role: "مدير", status: "active" },
    { id: 2, name: "محاسب أول", email: "acc@quickdata.com", role: "محاسب", status: "active" },
    { id: 3, name: "موظف مبيعات", email: "sales@quickdata.com", role: "مبيعات", status: "active" },
  ];

  const dashboardStats = {
    salesMonth: 335331,
    purchasesMonth: 240000,
    receiptsMonth: 106097,
    expensesMonth: 12300,
    customersCount: customers.length,
    productsCount: products.length,
    lowStockCount: products.filter(p => p.qty <= p.minQty).length,
    overdueInvoices: salesInvoices.filter(i => i.status === "overdue").length,
    treasuryBalance: 57000,
    bankBalance: 320000,
    receivables: customers.reduce((s, c) => s + c.balance, 0),
    payables: suppliers.reduce((s, c) => s + c.balance, 0),
  };

  const salesChart = {
    labels: ["مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس"],
    data: [180000, 210000, 195000, 250000, 280000, 335000],
  };
  const topProducts = [
    { name: "هاتف سامسونج A54", sales: 18 },
    { name: "لابتوب ديل", sales: 9 },
    { name: "سماعات بلوتوث", sales: 45 },
  ];

  return {
    statusLabels, formatCurrency, formatDate,
    customers, suppliers, categories, units, warehouses, products,
    salesInvoices, purchaseInvoices, receipts, paymentsList,
    accounts, journalEntries, treasuries, bankAccounts, transfers,
    expenseTypes, expenses, employees, departments, fixedAssets, users,
    dashboardStats, salesChart, topProducts,
  };
})();
