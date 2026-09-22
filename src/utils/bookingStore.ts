import { AdminBooking, BookingStatus, AdminNotification } from '../types';
import { getStoredCompanySettings } from '../context/CompanyContext';

export const ADMIN_PASSWORD = '444123';
const STORAGE_KEY = 'sama_burooda_bookings_v1';
const NOTIFICATIONS_STORAGE_KEY = 'sama_burooda_admin_notifications_v1';
const AUTH_SESSION_KEY = 'sama_burooda_admin_authenticated';

// Browser Web Audio API Chime (Zero external network dependencies, reliable instant playback)
export const playNotificationChime = (): void => {
  try {
    const settings = getStoredCompanySettings();
    if (settings.soundNotificationEnabled === false) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass();
    
    // First note (soft chime)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    gain1.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start();
    osc1.stop(audioCtx.currentTime + 0.35);

    // Second note (harmonic alert)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
    osc2.frequency.setValueAtTime(1174.66, audioCtx.currentTime + 0.28); // D6
    gain2.gain.setValueAtTime(0.3, audioCtx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(audioCtx.currentTime + 0.15);
    osc2.stop(audioCtx.currentTime + 0.7);
  } catch (e) {
    console.log('Audio chime prevented by browser or unavailable:', e);
  }
};

// Initial realistic orders to showcase the system when first unlocked
const INITIAL_SEED_BOOKINGS: AdminBooking[] = [
  {
    id: 'SB-849201',
    customerName: 'عبدالرحمن الشهري',
    phone: '0501234567',
    service: 'صيانة وإصلاح المكيفات',
    city: 'الرياض',
    preferredDate: '2026-09-23',
    timeSlot: 'الفترة المسائية (04:00 م - 08:00 م)',
    notes: 'المكيف السبليت بالمجلس لا يبرد نهائياً ويصدر صوت أزيز خفيف عند التشغيل',
    status: 'new',
    createdAt: '2026-09-22 09:30',
    estimatedCost: 180,
  },
  {
    id: 'SB-720194',
    customerName: 'فهد العتيبي',
    phone: '0559876543',
    service: 'إصلاح وصيانة الغسالات',
    city: 'جدة',
    preferredDate: '2026-09-23',
    timeSlot: 'الفترة الصباحية (08:00 ص - 12:00 م)',
    notes: 'غسالة ال جي أوتوماتيك 10 كغ تتوقف فجأة أثناء مرحلة التنشيف وتظهر رمز خطأ OE',
    status: 'dispatched',
    technicianAssigned: 'م. أحمد كمال (فني غسالات معتمد)',
    createdAt: '2026-09-22 08:15',
    estimatedCost: 220,
  },
  {
    id: 'SB-639102',
    customerName: 'سارة الدوسري',
    phone: '0543322110',
    service: 'تنظيف وغسيل المكيفات بالضغط',
    city: 'الدمام',
    preferredDate: '2026-09-24',
    timeSlot: 'فترة الظهيرة (12:00 م - 04:00 م)',
    notes: 'غسيل 4 مكيفات سبليت في فيلا مع التعقيم وحقيبة العزل المائي',
    status: 'contacted',
    technicianAssigned: 'فريق الصيانة 3 - الشرقية',
    createdAt: '2026-09-21 16:40',
    estimatedCost: 380,
  },
  {
    id: 'SB-551029',
    customerName: 'خالد المطيري',
    phone: '0567788990',
    service: 'شحن غاز فريون أمريكي R410A / R22',
    city: 'الرياض',
    preferredDate: '2026-09-22',
    timeSlot: 'الفترة المسائية (04:00 م - 08:00 م)',
    notes: 'مكيف جري 2 طن يخرج هواء حار، تم فحص الفلتر نظيف ويحتاج فحص تسريب وشحن فريون',
    status: 'completed',
    technicianAssigned: 'م. راجيف كومار',
    createdAt: '2026-09-21 11:20',
    estimatedCost: 240,
  },
];

export const getBookings = (): AdminBooking[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_BOOKINGS));
      return INITIAL_SEED_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading bookings from localStorage', e);
    return INITIAL_SEED_BOOKINGS;
  }
};

export const saveBookings = (bookings: AdminBooking[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new Event('bookings_updated'));
  } catch (e) {
    console.error('Error saving bookings to localStorage', e);
  }
};

export const getAdminNotifications = (): AdminNotification[] => {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading notifications', e);
    return [];
  }
};

export const saveAdminNotifications = (notifications: AdminNotification[]): void => {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    window.dispatchEvent(new Event('notifications_updated'));
  } catch (e) {
    console.error('Error saving notifications', e);
  }
};

export const markNotificationsAsRead = (): void => {
  const current = getAdminNotifications();
  const updated = current.map((n) => ({ ...n, read: true }));
  saveAdminNotifications(updated);
};

export const markNotificationAsRead = (id: string): void => {
  const current = getAdminNotifications();
  const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n));
  saveAdminNotifications(updated);
};

export const deleteNotification = (id: string): void => {
  const current = getAdminNotifications();
  const updated = current.filter((n) => n.id !== id);
  saveAdminNotifications(updated);
};

export const clearNotifications = (): void => {
  saveAdminNotifications([]);
};

export const addBooking = (
  newBooking: Omit<AdminBooking, 'id' | 'createdAt' | 'status'>,
  customId?: string
): AdminBooking => {
  const current = getBookings();
  const id = customId || `SB-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const created: AdminBooking = {
    ...newBooking,
    id,
    createdAt: formattedDate,
    status: 'new',
  };

  const updated = [created, ...current];
  saveBookings(updated);

  // 1. Create instant Notification for Admin
  const newNotification: AdminNotification = {
    id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    bookingId: id,
    titleAr: `طلب صيانة جديد #${id}`,
    titleEn: `New Service Booking #${id}`,
    messageAr: `حجز العميل ${created.customerName} (${created.phone}) لخدمة ${created.service} في ${created.city}.`,
    messageEn: `Customer ${created.customerName} (${created.phone}) booked ${created.service} in ${created.city}.`,
    timestamp: formattedDate,
    read: false,
    customerName: created.customerName,
    phone: created.phone,
    service: created.service,
    city: created.city,
  };

  const currentNotifs = getAdminNotifications();
  saveAdminNotifications([newNotification, ...currentNotifs]);

  // 2. Play audible chime for immediate attention
  playNotificationChime();

  // 3. Dispatch custom event for real-time banner alerts
  window.dispatchEvent(
    new CustomEvent('new_booking_notification', { detail: { booking: created, notification: newNotification } })
  );

  return created;
};

// Generates direct WhatsApp notification message url for Admin phone
export const getAdminWhatsAppNotificationUrl = (booking: AdminBooking, targetAdminPhone?: string): string => {
  const settings = getStoredCompanySettings();
  const rawTarget = targetAdminPhone || settings.adminNotificationPhone || settings.whatsapp;
  const adminPhone = rawTarget.replace(/[^0-9]/g, '');

  const text = `🔔 *تنبيه حجز صيانة جديد من الموقع* 🔔\n\n` +
    `📋 *رقم الحجز:* ${booking.id}\n` +
    `👤 *اسم العميل:* ${booking.customerName}\n` +
    `📱 *رقم جوال العميل:* ${booking.phone}\n` +
    `🛠 *الخدمة المطلوبة:* ${booking.service}\n` +
    `📍 *المدينة:* ${booking.city}\n` +
    `📅 *الموعد المفضل:* ${booking.preferredDate} (${booking.timeSlot})\n` +
    `📝 *ملاحظات العطل:* ${booking.notes ? booking.notes : 'لا توجد تفاصيل إضافية'}\n` +
    `⏰ *وقت استلام الطلب:* ${booking.createdAt}\n\n` +
    `_سماء البرودة - لوحة الإدارة الفورية_`;

  return `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
};

export const updateBookingStatus = (id: string, status: BookingStatus): void => {
  const current = getBookings();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status } : item
  );
  saveBookings(updated);
};

export const assignTechnician = (
  id: string,
  technicianAssigned: string,
  estimatedCost?: number
): void => {
  const current = getBookings();
  const updated = current.map((item) =>
    item.id === id
      ? {
          ...item,
          technicianAssigned,
          estimatedCost: estimatedCost ?? item.estimatedCost,
          status: item.status === 'new' ? 'dispatched' : item.status,
        }
      : item
  );
  saveBookings(updated);
};

export const deleteBooking = (id: string): void => {
  const current = getBookings();
  const updated = current.filter((item) => item.id !== id);
  saveBookings(updated);
};

export const resetBookingsToDefault = (): void => {
  saveBookings(INITIAL_SEED_BOOKINGS);
};

// Admin Auth session helpers
export const isAdminAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
};

export const verifyAdminPassword = (inputPass: string): boolean => {
  // Strip whitespace and quotes if entered accidentally
  const clean = inputPass.trim().replace(/^[`'"]|[`'"]$/g, '');
  if (clean === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
    return true;
  }
  return false;
};

export const adminLogout = (): void => {
  try {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  } catch (e) {
    console.error(e);
  }
};
