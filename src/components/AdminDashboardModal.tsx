import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  X, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Phone, 
  MessageCircle, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  LogOut, 
  UserCheck, 
  Calendar, 
  MapPin, 
  Wrench, 
  Download, 
  RotateCcw,
  Shield,
  Layers,
  Check,
  Bell,
  Settings,
  Volume2,
  Send,
  ShieldCheck,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Language, AdminBooking, BookingStatus, AdminNotification } from '../types';
import { 
  ADMIN_PASSWORD, 
  getBookings, 
  updateBookingStatus, 
  deleteBooking, 
  addBooking, 
  assignTechnician, 
  isAdminAuthenticated, 
  verifyAdminPassword, 
  adminLogout,
  resetBookingsToDefault,
  getAdminNotifications,
  markNotificationsAsRead,
  markNotificationAsRead,
  deleteNotification,
  clearNotifications,
  playNotificationChime,
  getAdminWhatsAppNotificationUrl
} from '../utils/bookingStore';
import { useCompany } from '../context/CompanyContext';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type AdminTab = 'bookings' | 'notifications' | 'settings';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const { companyInfo, updateCompanySettings, resetCompanySettings } = useCompany();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('bookings');

  // Bookings state
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  // Notifications state
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  // Manual booking drawer state
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    customerName: '',
    phone: '',
    service: 'صيانة وإصلاح المكيفات',
    city: 'الرياض',
    preferredDate: new Date().toISOString().split('T')[0],
    timeSlot: 'الفترة المسائية (04:00 م - 08:00 م)',
    notes: '',
    estimatedCost: 200,
  });

  // Assign technician dialog
  const [editingTechId, setEditingTechId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState('');

  // Settings form state (mirrors companyInfo)
  const [settingsForm, setSettingsForm] = useState({
    phone: companyInfo.phone,
    whatsapp: companyInfo.whatsapp,
    adminNotificationPhone: companyInfo.adminNotificationPhone,
    soundNotificationEnabled: companyInfo.soundNotificationEnabled,
  });
  const [settingsSavedMessage, setSettingsSavedMessage] = useState(false);

  // Sync settingsForm when companyInfo changes
  useEffect(() => {
    setSettingsForm({
      phone: companyInfo.phone,
      whatsapp: companyInfo.whatsapp,
      adminNotificationPhone: companyInfo.adminNotificationPhone,
      soundNotificationEnabled: companyInfo.soundNotificationEnabled,
    });
  }, [companyInfo]);

  // Initial authentication check & data loading
  useEffect(() => {
    if (isOpen) {
      const authed = isAdminAuthenticated();
      setIsAuthenticated(authed);
      if (authed) {
        setBookings(getBookings());
        setNotifications(getAdminNotifications());
      }
    }
  }, [isOpen]);

  // Listen to bookings and notifications update events
  useEffect(() => {
    const handleBookingsUpdate = () => {
      setBookings(getBookings());
    };
    const handleNotificationsUpdate = () => {
      setNotifications(getAdminNotifications());
    };

    window.addEventListener('bookings_updated', handleBookingsUpdate);
    window.addEventListener('notifications_updated', handleNotificationsUpdate);
    return () => {
      window.removeEventListener('bookings_updated', handleBookingsUpdate);
      window.removeEventListener('notifications_updated', handleNotificationsUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPassword(passwordInput)) {
      setIsAuthenticated(true);
      setErrorMsg('');
      setPasswordInput('');
      setBookings(getBookings());
      setNotifications(getAdminNotifications());
    } else {
      setErrorMsg(
        lang === 'ar'
          ? 'كلمة المرور غير صحيحة. يرجى التأكد من كلمة مرور الإدارة والمحاولة مجدداً.'
          : 'Incorrect password. Please verify the admin credentials and try again.'
      );
    }
  };

  const handleLogout = () => {
    adminLogout();
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    updateBookingStatus(id, newStatus);
    setBookings(getBookings());
  };

  const handleDelete = (id: string) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الحجز نهائياً؟' : 'Are you sure you want to delete this booking?')) {
      deleteBooking(id);
      setBookings(getBookings());
    }
  };

  const handleSaveTechnician = (id: string) => {
    if (!techInput.trim()) return;
    assignTechnician(id, techInput.trim());
    setEditingTechId(null);
    setTechInput('');
    setBookings(getBookings());
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.customerName || !manualForm.phone) return;

    addBooking({
      customerName: manualForm.customerName,
      phone: manualForm.phone,
      service: manualForm.service,
      city: manualForm.city,
      preferredDate: manualForm.preferredDate,
      timeSlot: manualForm.timeSlot,
      notes: manualForm.notes,
      estimatedCost: Number(manualForm.estimatedCost) || 200,
    });

    setShowAddModal(false);
    setManualForm({
      customerName: '',
      phone: '',
      service: 'صيانة وإصلاح المكيفات',
      city: 'الرياض',
      preferredDate: new Date().toISOString().split('T')[0],
      timeSlot: 'الفترة المسائية (04:00 م - 08:00 م)',
      notes: '',
      estimatedCost: 200,
    });
    setBookings(getBookings());
    setNotifications(getAdminNotifications());
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings({
      phone: settingsForm.phone,
      whatsapp: settingsForm.whatsapp,
      adminNotificationPhone: settingsForm.adminNotificationPhone,
      soundNotificationEnabled: settingsForm.soundNotificationEnabled,
    });
    setSettingsSavedMessage(true);
    setTimeout(() => setSettingsSavedMessage(false), 4000);
  };

  const handleResetSettings = () => {
    if (window.confirm(lang === 'ar' ? 'هل تريد استعادة الأرقام الرسمية الافتراضية؟' : 'Reset to default numbers?')) {
      resetCompanySettings();
      setSettingsSavedMessage(true);
      setTimeout(() => setSettingsSavedMessage(false), 3000);
    }
  };

  const handleSendTestBookingNotification = () => {
    const testRef = `SB-${Math.floor(100000 + Math.random() * 900000)}`;
    addBooking({
      customerName: 'فهد الشمري (حجز تجريبي)',
      phone: '0501234567',
      service: 'صيانة وإصلاح المكيفات',
      city: 'الرياض',
      preferredDate: new Date().toISOString().split('T')[0],
      timeSlot: 'الفترة المسائية (04:00 م - 08:00 م)',
      notes: 'تجربة إشعار وتنبيه لوحة الإدارة الفورية',
      estimatedCost: 250,
    }, testRef);

    setBookings(getBookings());
    setNotifications(getAdminNotifications());
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Customer', 'Phone', 'Service', 'City', 'Date', 'Time Slot', 'Status', 'Technician', 'Estimated Cost', 'Created At'];
    const rows = bookings.map(b => [
      b.id,
      `"${b.customerName}"`,
      b.phone,
      `"${b.service}"`,
      `"${b.city}"`,
      b.preferredDate,
      `"${b.timeSlot}"`,
      b.status,
      `"${b.technicianAssigned || '-'}"`,
      b.estimatedCost || 0,
      b.createdAt,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesCity = cityFilter === 'all' || b.city.includes(cityFilter);

    return matchesSearch && matchesStatus && matchesCity;
  });

  // Analytics KPIs
  const totalCount = bookings.length;
  const newCount = bookings.filter(b => b.status === 'new').length;
  const dispatchedCount = bookings.filter(b => b.status === 'dispatched').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const totalRevenueSAR = bookings.reduce((sum, b) => sum + (b.estimatedCost || 200), 0);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'new':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">🟡 {lang === 'ar' ? 'طلب جديد' : 'New'}</span>;
      case 'contacted':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">📞 {lang === 'ar' ? 'تم التواصل' : 'Contacted'}</span>;
      case 'dispatched':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-900 border border-cyan-300">🚗 {lang === 'ar' ? 'الفني في الطريق' : 'Dispatched'}</span>;
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">✅ {lang === 'ar' ? 'مكتمل بنجاح' : 'Completed'}</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 border border-slate-300">❌ {lang === 'ar' ? 'ملغي' : 'Cancelled'}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-6xl shadow-2xl border border-slate-200 overflow-hidden relative my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#071329] text-white px-6 py-4 flex items-center justify-between border-b border-cyan-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  {lang === 'ar' ? 'لوحة تحكم وإدارة سماء البرودة' : 'Sama Al-Burooda Admin Portal'}
                </h3>
                <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {lang === 'ar' ? 'نظام الإدارة الفوري' : 'Live Operations'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'إدارة بلاغات الصيانة، توجيه الفنيين، وتحديث أرقام الموقع وإشعارات الإدارة' : 'Dispatch coordination, notifications dispatch, and phone configuration'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-colors cursor-pointer border border-red-500/30"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'خروج' : 'Logout'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={lang === 'ar' ? 'إغلاق' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ===================== VIEW 1: AUTHENTICATION LOCK SCREEN ===================== */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-3xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center mb-6 shadow-md">
              <Lock className="w-8 h-8" />
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-[#0B1B3D] mb-2">
              {lang === 'ar' ? 'تسجيل دخول مسؤول النظام' : 'Administrator Authorization'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              {lang === 'ar'
                ? 'يرجى إدخال كلمة المرور المعتمدة للوصول إلى لوحة إدارة الحجوزات وإشعارات الطلبات وتعديل أرقام التواصل.'
                : 'Please enter authorized administrative password to manage bookings, notifications, and company contact numbers.'}
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder={lang === 'ar' ? '••••••••' : '••••••••'}
                  className="w-full px-4 py-3.5 text-center text-base font-mono tracking-widest rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all shadow-inner text-slate-800"
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 rtl:left-3 ltr:right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  title={showPassword ? (lang === 'ar' ? 'إخفاء' : 'Hide') : (lang === 'ar' ? 'إظهار' : 'Show')}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0B1B3D] hover:bg-[#122A5E] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Unlock className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ar' ? 'دخول لوحة التحكم' : 'Unlock Dashboard'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* ===================== VIEW 2: UNLOCKED ADMIN DASHBOARD ===================== */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            
            {/* Primary Navigation Tabs */}
            <div className="px-6 bg-slate-900 text-white flex items-center gap-2 border-b border-slate-800 overflow-x-auto">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'bookings'
                    ? 'border-cyan-400 text-cyan-300 bg-slate-800/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{lang === 'ar' ? 'جدول وبلاغات الحجوزات' : 'Bookings & Orders'}</span>
                <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
                  {totalCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'notifications'
                    ? 'border-cyan-400 text-cyan-300 bg-slate-800/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span>{lang === 'ar' ? 'إشعارات الرسائل والحجوزات' : 'Incoming Alerts'}</span>
                {unreadNotificationsCount > 0 ? (
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    {unreadNotificationsCount} {lang === 'ar' ? 'جديد' : 'new'}
                  </span>
                ) : (
                  <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
                    {notifications.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-cyan-400 text-cyan-300 bg-slate-800/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Settings className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ar' ? 'أرقام التواصل وإشعارات الإدارة' : 'Phone & Alert Settings'}</span>
              </button>
            </div>

            {/* ================= TAB 1: BOOKINGS ================= */}
            {activeTab === 'bookings' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* KPI Metrics Ribbon */}
                <div className="p-4 sm:p-5 bg-white border-b border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                      <span>{lang === 'ar' ? 'إجمالي الحجوزات' : 'Total Bookings'}</span>
                      <Layers className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#0B1B3D]">{totalCount}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{lang === 'ar' ? 'مسجلة بالنظام' : 'In database'}</div>
                  </div>

                  <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                    <div className="flex items-center justify-between text-xs text-amber-800 font-semibold mb-1">
                      <span>{lang === 'ar' ? 'طلبات جديدة بانتظار الاتصال' : 'New Pending'}</span>
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-amber-900">{newCount}</div>
                    <div className="text-[11px] text-amber-700 mt-0.5">{lang === 'ar' ? 'تتطلب رد فوري' : 'Requires dispatch'}</div>
                  </div>

                  <div className="bg-cyan-50 p-3.5 rounded-2xl border border-cyan-200">
                    <div className="flex items-center justify-between text-xs text-cyan-800 font-semibold mb-1">
                      <span>{lang === 'ar' ? 'الفني في الطريق' : 'Active Dispatches'}</span>
                      <Wrench className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-cyan-950">{dispatchedCount}</div>
                    <div className="text-[11px] text-cyan-700 mt-0.5">{lang === 'ar' ? 'فنيون ميدانيون' : 'Active on site'}</div>
                  </div>

                  <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
                    <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                      <span>{lang === 'ar' ? 'القيمة التقديرية' : 'Est. Revenue'}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-950">
                      {totalRevenueSAR.toLocaleString()} <span className="text-xs font-semibold text-emerald-700">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-0.5">{completedCount} {lang === 'ar' ? 'طلبات مكتملة' : 'completed'}</div>
                  </div>
                </div>

                {/* Filter & Action Toolbar */}
                <div className="p-3.5 sm:px-6 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  {/* Search input */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 rtl:right-3 ltr:left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={lang === 'ar' ? 'بحث بالاسم، الجوال، رقم الحجز...' : 'Search customer, phone, ID...'}
                      className="w-full pr-9 pl-4 rtl:pr-9 rtl:pl-4 ltr:pl-9 ltr:pr-4 py-2 bg-slate-100 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none border border-transparent focus:border-cyan-500 transition-all"
                    />
                  </div>

                  {/* Status filter */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 outline-none cursor-pointer"
                    >
                      <option value="all">{lang === 'ar' ? 'كافة الحالات' : 'All Statuses'}</option>
                      <option value="new">{lang === 'ar' ? 'جديد (New)' : 'New'}</option>
                      <option value="contacted">{lang === 'ar' ? 'تم التواصل' : 'Contacted'}</option>
                      <option value="dispatched">{lang === 'ar' ? 'الفني في الطريق' : 'Dispatched'}</option>
                      <option value="completed">{lang === 'ar' ? 'مكتمل' : 'Completed'}</option>
                      <option value="cancelled">{lang === 'ar' ? 'ملغي' : 'Cancelled'}</option>
                    </select>

                    {/* City filter */}
                    <select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 outline-none cursor-pointer"
                    >
                      <option value="all">{lang === 'ar' ? 'كافة المدن' : 'All Cities'}</option>
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="الدمام">الدمام والخبر</option>
                      <option value="مكة">مكة المكرمة</option>
                      <option value="المدينة">المدينة المنورة</option>
                      <option value="القصيم">القصيم</option>
                    </select>
                  </div>

                  {/* Toolbar action buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-3.5 py-2 bg-[#0B1B3D] hover:bg-[#122A5E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{lang === 'ar' ? 'حجز يدوي' : 'New Booking'}</span>
                    </button>

                    <button
                      onClick={handleExportCSV}
                      className="p-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title={lang === 'ar' ? 'تصدير البيانات بصيغة CSV' : 'Export to CSV'}
                    >
                      <Download className="w-4 h-4 text-cyan-600" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(lang === 'ar' ? 'هل تريد استعادة بيانات العرض التجريبية الأولية؟' : 'Reset to sample bookings?')) {
                          resetBookingsToDefault();
                          setBookings(getBookings());
                          setNotifications(getAdminNotifications());
                        }
                      }}
                      className="p-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title={lang === 'ar' ? 'استعادة البيانات الافتراضية' : 'Reset defaults'}
                    >
                      <RotateCcw className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                </div>

                {/* Bookings List Cards / Table */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                      <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-slate-700">
                        {lang === 'ar' ? 'لا توجد حجوزات مطابقة لمعايير البحث' : 'No bookings found matching filters'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {lang === 'ar' ? 'جرب تغيير فلاتر الحالة أو المدينة أو كتابة اسم آخر.' : 'Try changing status or search filters.'}
                      </p>
                    </div>
                  ) : (
                    filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-cyan-400 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                      >
                        {/* Booking Details */}
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-black text-xs text-cyan-900 bg-cyan-100 px-2.5 py-1 rounded-lg">
                              {booking.id}
                            </span>
                            {getStatusBadge(booking.status)}
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {booking.createdAt}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                            <span className="font-black text-slate-900 text-sm">{booking.customerName}</span>
                            <span className="text-slate-400">•</span>
                            <span className="font-bold text-cyan-700">{booking.service}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                              <span>{booking.city}</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-medium">
                              <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                              <span>{booking.preferredDate} ({booking.timeSlot.split(' ')[0]})</span>
                            </div>
                          </div>

                          {/* Notes if any */}
                          {booking.notes && (
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                              <span className="font-bold text-slate-700">{lang === 'ar' ? 'وصف العطل: ' : 'Issue notes: '}</span>
                              {booking.notes}
                            </div>
                          )}

                          {/* Assigned technician display */}
                          {booking.technicianAssigned && (
                            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>{lang === 'ar' ? 'الفني المكلف: ' : 'Technician: '}<strong>{booking.technicianAssigned}</strong></span>
                            </div>
                          )}
                        </div>

                        {/* Actions and Status Updater */}
                        <div className="flex flex-wrap lg:flex-col items-center lg:items-end justify-between gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                          {/* Direct Communication Buttons */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {/* Send direct WhatsApp notification to Admin number */}
                            <a
                              href={getAdminWhatsAppNotificationUrl(booking, companyInfo.adminNotificationPhone)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                              title={lang === 'ar' ? 'إرسال إشعار فوري لواتساب الإدارة' : 'Send WhatsApp to Admin'}
                            >
                              <Bell className="w-3.5 h-3.5 text-amber-300" />
                              <span>{lang === 'ar' ? 'إشعار الإدارة' : 'Admin Alert'}</span>
                            </a>

                            <a
                              href={`https://wa.me/966${booking.phone.replace(/^0/, '')}?text=${encodeURIComponent(
                                lang === 'ar'
                                  ? `مرحباً أخي الكريم ${booking.customerName}، معكم شركة سماء البرودة بخصوص طلب الصيانة رقم (${booking.id}) لخدمة ${booking.service} في ${booking.city}. هل الوقت مناسب لحضور الفني؟`
                                  : `Hello ${booking.customerName}, this is Sama Al-Burooda regarding your service request (${booking.id}) for ${booking.service}. Is this time convenient for the technician?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                              title="WhatsApp Customer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>واتساب</span>
                            </a>

                            <a
                              href={`tel:${booking.phone}`}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                              title="Call Customer"
                            >
                              <Phone className="w-3.5 h-3.5 text-cyan-400" />
                              <span dir="ltr">{booking.phone}</span>
                            </a>

                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                              title={lang === 'ar' ? 'حذف الحجز' : 'Delete'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Status quick select */}
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400 font-medium">
                              {lang === 'ar' ? 'تحديث الحالة:' : 'Change:'}
                            </span>
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingStatus)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-1 px-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer"
                            >
                              <option value="new">جديد (New)</option>
                              <option value="contacted">تم الاتصال</option>
                              <option value="dispatched">إرسال فني</option>
                              <option value="completed">مكتمل</option>
                              <option value="cancelled">ملغي</option>
                            </select>
                          </div>

                          {/* Assign Technician quick button */}
                          {editingTechId === booking.id ? (
                            <div className="flex items-center gap-1 mt-1">
                              <input
                                type="text"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                placeholder={lang === 'ar' ? 'اسم الفني...' : 'Tech name...'}
                                className="text-xs px-2 py-1 border border-cyan-400 rounded-lg outline-none w-32"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveTechnician(booking.id)}
                                className="bg-cyan-600 text-white p-1 rounded-lg text-xs hover:bg-cyan-700"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingTechId(null)}
                                className="bg-slate-200 text-slate-600 p-1 rounded-lg text-xs"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingTechId(booking.id);
                                setTechInput(booking.technicianAssigned || '');
                              }}
                              className="text-[11px] text-cyan-700 hover:underline flex items-center gap-1 mt-0.5 cursor-pointer font-semibold"
                            >
                              <UserCheck className="w-3 h-3" />
                              <span>{booking.technicianAssigned ? (lang === 'ar' ? 'تعديل الفني' : 'Edit tech') : (lang === 'ar' ? '+ تعيين فني' : '+ Assign Tech')}</span>
                            </button>
                          )}

                        </div>

                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB 2: NOTIFICATIONS ================= */}
            {activeTab === 'notifications' && (
              <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6">
                {/* Header Actions for Notifications */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-500" />
                      <span>{lang === 'ar' ? 'سجل إشعارات الحجوزات والرسائل الواردة' : 'Booking Notifications Log'}</span>
                      {unreadNotificationsCount > 0 && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                          {unreadNotificationsCount} {lang === 'ar' ? 'غير مقروء' : 'unread'}
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === 'ar'
                        ? 'تنبيهات فورية تصل عند قيام أي عميل بطلب صيانة مكيفات أو غسالات عبر الموقع.'
                        : 'Real-time booking submissions received directly from site visitors.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleSendTestBookingNotification}
                      className="px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Test Audio Chime & Notification Alert"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{lang === 'ar' ? 'إرسال إشعار تجريبي لاختبار الصوت' : 'Send Test Alert'}</span>
                    </button>

                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={() => {
                          markNotificationsAsRead();
                          setNotifications(getAdminNotifications());
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'ar' ? 'تعليم الكل كمقروء' : 'Mark All Read'}</span>
                      </button>
                    )}

                    {notifications.length > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من مسح جميع سجلات الإشعارات؟' : 'Clear all notifications?')) {
                            clearNotifications();
                            setNotifications([]);
                          }
                        }}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'مسح السجل' : 'Clear All'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto space-y-3">
                  {notifications.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                      <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-slate-700">
                        {lang === 'ar' ? 'لا توجد إشعارات جديدة حالياً' : 'No notifications yet'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        {lang === 'ar'
                          ? 'عند قيام أي عميل بملء استمارة الحجز في الموقع، سيظهر الإشعار فوراً هنا مع نغمة تنبيه صوتية.'
                          : 'When visitors submit maintenance bookings, notifications will appear here with audio chime.'}
                      </p>
                      <button
                        onClick={handleSendTestBookingNotification}
                        className="mt-4 px-4 py-2 bg-[#0B1B3D] text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Volume2 className="w-4 h-4 text-cyan-400" />
                        <span>{lang === 'ar' ? 'إنشاء إشعار تجريبي الآن' : 'Create Sample Notification'}</span>
                      </button>
                    </div>
                  ) : (
                    notifications.map((notif) => {
                      // Find matching booking if available
                      const matchingBooking = bookings.find(b => b.id === notif.bookingId);

                      return (
                        <div
                          key={notif.id}
                          className={`rounded-2xl p-4 sm:p-5 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                            notif.read
                              ? 'bg-white border-slate-200 shadow-2xs'
                              : 'bg-amber-50/50 border-amber-300 shadow-xs'
                          }`}
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              {!notif.read && (
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                              )}
                              <span className="font-bold text-sm text-slate-900">
                                {lang === 'ar' ? notif.titleAr : notif.titleEn}
                              </span>
                              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3" />
                                {notif.timestamp}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 font-medium">
                              {lang === 'ar' ? notif.messageAr : notif.messageEn}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                              {notif.customerName && (
                                <span className="font-bold text-slate-800">👤 {notif.customerName}</span>
                              )}
                              {notif.phone && (
                                <span dir="ltr" className="font-mono text-cyan-800 font-bold bg-cyan-50 px-2 py-0.5 rounded">
                                  📱 {notif.phone}
                                </span>
                              )}
                              {notif.city && <span>📍 {notif.city}</span>}
                              {notif.service && <span className="text-cyan-700 font-semibold">🛠 {notif.service}</span>}
                            </div>
                          </div>

                          {/* Notification Actions */}
                          <div className="flex items-center gap-2 flex-wrap pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                            {/* Forward / Send direct WhatsApp alert to Admin phone */}
                            {matchingBooking && (
                              <a
                                href={getAdminWhatsAppNotificationUrl(matchingBooking, companyInfo.adminNotificationPhone)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-[#0B1B3D] hover:bg-[#122A5E] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                                title={lang === 'ar' ? 'إرسال رسالة التنبيه المنسقة إلى واتساب الإدارة' : 'Send to Admin WhatsApp'}
                              >
                                <Send className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{lang === 'ar' ? 'إرسال لواتساب الإدارة' : 'Send to Admin'}</span>
                              </a>
                            )}

                            {/* Contact Customer WhatsApp */}
                            {notif.phone && (
                              <a
                                href={`https://wa.me/966${notif.phone.replace(/^0/, '')}?text=${encodeURIComponent(
                                  `مرحباً بكم، معكم إدارة سماء البرودة بخصوص طلب الصيانة (${notif.bookingId || ''}). يسعدنا تأكيد الموعد.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>{lang === 'ar' ? 'واتساب العميل' : 'Customer WhatsApp'}</span>
                              </a>
                            )}

                            {/* Mark as read single */}
                            {!notif.read && (
                              <button
                                onClick={() => {
                                  markNotificationAsRead(notif.id);
                                  setNotifications(getAdminNotifications());
                                }}
                                className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                                title={lang === 'ar' ? 'تعليم كمقروء' : 'Mark as read'}
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}

                            {/* Delete single notification */}
                            <button
                              onClick={() => {
                                deleteNotification(notif.id);
                                setNotifications(getAdminNotifications());
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                              title={lang === 'ar' ? 'حذف الإشعار' : 'Delete'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB 3: SETTINGS (PHONE & ADMIN NOTIFICATION NUMBERS) ================= */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-3xl mx-auto w-full">
                
                {/* Header description */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-2">
                    <Settings className="w-3.5 h-3.5 text-cyan-700" />
                    <span>{lang === 'ar' ? 'إدارة أرقام الموقع وإشعارات الإدارة' : 'Website & Notification Settings'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1B3D]">
                    {lang === 'ar' ? 'تعديل أرقام التواصل وتوجيه الإشعارات' : 'Manage Contact & Admin Alert Numbers'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    {lang === 'ar'
                      ? 'يمكنك من هنا تغيير رقم الاتصال المباشر ورقم الواتساب المعروضين في الموقع للزوار، بالإضافة إلى تحديد رقم واتساب الإدارة الذي يستلم إشعارات وتنبيهات الحجوزات فورياً.'
                      : 'Customize customer contact numbers shown across the website, and configure the dedicated Admin WhatsApp number for booking notification alerts.'}
                  </p>
                </div>

                {/* Success feedback banner */}
                {settingsSavedMessage && (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs sm:text-sm text-emerald-800 font-bold flex items-center gap-2 mb-6 animate-in fade-in duration-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? '✅ تم حفظ وتحديث أرقام الموقع بنجاح! جميع أزرار الاتصال والواتساب وقنوات الإشعارات بالموقع تم تحديثها فوراً.'
                        : '✅ Settings updated successfully! All website buttons and alert channels are now synchronized.'}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                  
                  {/* Field 1: Phone number shown on web */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      {lang === 'ar' ? 'رقم الاتصال الهاتفي المعروض في الموقع للعملاء *' : 'Customer Hotline Phone (Shown on Website) *'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4 text-cyan-600" />
                      </div>
                      <input
                        type="text"
                        required
                        value={settingsForm.phone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                        placeholder="+966 50 123 4567 أو 0501234567"
                        dir="ltr"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-900 font-mono font-bold focus:outline-none transition-all"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {lang === 'ar' ? 'يظهر في شريط الهيدر، الفوتر، بطاقات الخدمات، والأزرار العائمة للاتصال السريع.' : 'Used for tap-to-call buttons across header, footer, and floating bar.'}
                    </p>
                  </div>

                  {/* Field 2: Customer WhatsApp shown on web */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      {lang === 'ar' ? 'رقم واتساب خدمة العملاء المعروض في الموقع *' : 'Customer Support WhatsApp Number *'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <input
                        type="text"
                        required
                        value={settingsForm.whatsapp}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                        placeholder="966501234567"
                        dir="ltr"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-900 font-mono font-bold focus:outline-none transition-all"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {lang === 'ar' ? 'الرقم الذي يفتح محادثة الواتساب عندما يضغط الزائر على "تواصل معنا عبر واتساب".' : 'The number opened when customers click WhatsApp consultation buttons.'}
                    </p>
                  </div>

                  {/* Field 3: Admin Notification Phone Number */}
                  <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50/60 rounded-2xl border-2 border-cyan-200">
                    <label className="block text-xs font-black text-cyan-950 mb-2 flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-amber-500" />
                      <span>{lang === 'ar' ? 'رقم واتساب الإدارة المخصص لاستقبال إشعارات ورسائل الحجوزات 🔔' : 'Admin Alert WhatsApp (Receives Booking Notifications) 🔔'}</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Send className="w-4 h-4 text-cyan-700" />
                      </div>
                      <input
                        type="text"
                        required
                        value={settingsForm.adminNotificationPhone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, adminNotificationPhone: e.target.value })}
                        placeholder="966501234567"
                        dir="ltr"
                        className="w-full bg-white border border-cyan-300 focus:border-cyan-600 rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-900 font-mono font-bold focus:outline-none transition-all shadow-inner"
                      />
                    </div>
                    <p className="text-[11px] text-cyan-800 font-medium mt-1.5 leading-relaxed">
                      {lang === 'ar'
                        ? '📌 عندما يقوم أي عميل بحجز موعد صيانة، يمكنك بنقرة واحدة إرسال تفاصيل الحجز كاملة إلى هذا الرقم عبر الواتساب، كما يُستخدم لإرسال رسائل الإدارة الفورية.'
                        : '📌 The dedicated phone receiving formatted service booking tickets and staff dispatches.'}
                    </p>

                    {/* Test alert button */}
                    <div className="mt-3 flex gap-2">
                      <a
                        href={`https://wa.me/${settingsForm.adminNotificationPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `🔔 *رسالة تجريبية من نظام سماء البرودة* 🔔\n\nتم التحقق من ربط رقم واتساب الإدارة بنجاح لاستقبال إشعارات الحجوزات وبلاغات الصيانة.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'تجربة إرسال رسالة إلى واتساب الإدارة' : 'Send Test WhatsApp to Admin'}</span>
                      </a>
                    </div>
                  </div>

                  {/* Sound notifications toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center">
                        <Volume2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          {lang === 'ar' ? 'نغمة التنبيه الصوتي عند استلام حجز جديد' : 'Audio Chime on New Bookings'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {lang === 'ar' ? 'تشغيل رنين فوري لتنبيه الموظف فور إرسال العميل للطلب' : 'Synthesize audible chime on incoming request'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => playNotificationChime()}
                        className="px-3 py-1.5 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-colors cursor-pointer"
                      >
                        {lang === 'ar' ? 'تجربة الصوت' : 'Play Chime'}
                      </button>

                      <input
                        type="checkbox"
                        checked={settingsForm.soundNotificationEnabled}
                        onChange={(e) => setSettingsForm({ ...settingsForm, soundNotificationEnabled: e.target.checked })}
                        className="w-5 h-5 text-cyan-600 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#0B1B3D] hover:bg-[#122A5E] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer text-sm"
                    >
                      <Check className="w-4 h-4 text-cyan-400" />
                      <span>{lang === 'ar' ? 'حفظ وتطبيق التغييرات على الموقع' : 'Save & Update Website'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetSettings}
                      className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'استعادة الأرقام الافتراضية' : 'Reset to Default'}</span>
                    </button>
                  </div>

                </form>

              </div>
            )}

          </div>
        )}

        {/* ===================== VIEW 3: MANUAL BOOKING POPUP ===================== */}
        {showAddModal && (
          <div className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-black text-[#0B1B3D]">
                  {lang === 'ar' ? 'تسجيل حجز مكالمة هاتفية جديدة' : 'Add Direct Phone Booking'}
                </h4>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleManualSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{lang === 'ar' ? 'اسم العميل' : 'Customer Name'}</label>
                  <input
                    type="text"
                    required
                    value={manualForm.customerName}
                    onChange={(e) => setManualForm({ ...manualForm, customerName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 outline-none focus:border-cyan-500"
                    placeholder="محمد عبدالله"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">{lang === 'ar' ? 'رقم الجوال' : 'Phone'}</label>
                    <input
                      type="tel"
                      required
                      value={manualForm.phone}
                      onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 outline-none focus:border-cyan-500"
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">{lang === 'ar' ? 'المدينة' : 'City'}</label>
                    <select
                      value={manualForm.city}
                      onChange={(e) => setManualForm({ ...manualForm, city: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 outline-none focus:border-cyan-500 bg-white"
                    >
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="الدمام">الدمام والخبر</option>
                      <option value="مكة المكرمة">مكة المكرمة</option>
                      <option value="المدينة المنورة">المدينة المنورة</option>
                      <option value="القصيم">القصيم</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{lang === 'ar' ? 'نوع الخدمة' : 'Service'}</label>
                  <select
                    value={manualForm.service}
                    onChange={(e) => setManualForm({ ...manualForm, service: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 outline-none focus:border-cyan-500 bg-white"
                  >
                    <option value="صيانة وإصلاح المكيفات">صيانة وإصلاح المكيفات</option>
                    <option value="إصلاح وصيانة الغسالات">إصلاح وصيانة الغسالات</option>
                    <option value="تنظيف وغسيل المكيفات بالضغط">تنظيف وغسيل المكيفات بالضغط</option>
                    <option value="فك وتركيب ونقل المكيفات">فك وتركيب ونقل المكيفات</option>
                    <option value="شحن غاز فريون أمريكي R410A / R22">شحن غاز فريون أمريكي R410A / R22</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">{lang === 'ar' ? 'التاريخ المفضل' : 'Date'}</label>
                    <input
                      type="date"
                      value={manualForm.preferredDate}
                      onChange={(e) => setManualForm({ ...manualForm, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">{lang === 'ar' ? 'التكلفة التقديرية (ر.س)' : 'Est. Cost (SAR)'}</label>
                    <input
                      type="number"
                      value={manualForm.estimatedCost}
                      onChange={(e) => setManualForm({ ...manualForm, estimatedCost: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-200 outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{lang === 'ar' ? 'ملاحظات العطل' : 'Notes'}</label>
                  <textarea
                    rows={2}
                    value={manualForm.notes}
                    onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 outline-none focus:border-cyan-500 resize-none"
                    placeholder="تفاصيل العطل وملاحظات العميل..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'حفظ وتأكيد الطلب' : 'Save Booking'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="py-2.5 px-4 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-100"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
