export type Language = 'ar' | 'en';

export interface ServiceItem {
  id: string;
  category: 'ac-maintenance' | 'washing-machine' | 'ac-cleaning' | 'ac-installation';
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  shortDescEn: string;
  fullDescAr: string;
  fullDescEn: string;
  priceFrom: number;
  priceUnitAr: string;
  priceUnitEn: string;
  warrantyPeriodAr: string;
  warrantyPeriodEn: string;
  featuresAr: string[];
  featuresEn: string[];
  image: string;
  badgeAr?: string;
  badgeEn?: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  service: string;
  city: string;
  preferredDate: string;
  timeSlot: string;
  message: string;
}

export interface ReviewItem {
  id: string;
  nameAr: string;
  nameEn: string;
  cityAr: string;
  cityEn: string;
  rating: number;
  dateAr: string;
  dateEn: string;
  serviceTypeAr: string;
  serviceTypeEn: string;
  commentAr: string;
  commentEn: string;
  avatar: string;
  verified: boolean;
}

export interface CityCoverage {
  id: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  regionEn: string;
  responseTimeAr: string;
  responseTimeEn: string;
  techniciansCount: number;
  districtsAr: string[];
  districtsEn: string[];
}

export type BookingStatus = 'new' | 'contacted' | 'dispatched' | 'completed' | 'cancelled';

export interface AdminBooking {
  id: string;
  customerName: string;
  phone: string;
  service: string;
  city: string;
  preferredDate: string;
  timeSlot: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
  technicianAssigned?: string;
  estimatedCost?: number;
}

export interface AdminNotification {
  id: string;
  bookingId: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  timestamp: string;
  read: boolean;
  customerName: string;
  phone: string;
  service: string;
  city: string;
}
