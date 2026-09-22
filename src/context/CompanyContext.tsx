import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO as DEFAULT_COMPANY_INFO } from '../data/content';

export interface CompanyInfoState {
  nameAr: string;
  nameEn: string;
  fullNameAr: string;
  fullNameEn: string;
  phone: string;
  phoneClean: string;
  whatsapp: string;
  adminNotificationPhone: string;
  email: string;
  addressAr: string;
  addressEn: string;
  crNumber: string;
  vatNumber: string;
  soundNotificationEnabled: boolean;
}

const SETTINGS_STORAGE_KEY = 'sama_burooda_company_settings_v1';

const getInitialCompanyInfo = (): CompanyInfoState => {
  try {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_COMPANY_INFO,
        adminNotificationPhone: parsed.adminNotificationPhone || DEFAULT_COMPANY_INFO.whatsapp,
        soundNotificationEnabled: parsed.soundNotificationEnabled ?? true,
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Failed to parse company settings from localStorage', e);
  }

  return {
    ...DEFAULT_COMPANY_INFO,
    adminNotificationPhone: DEFAULT_COMPANY_INFO.whatsapp,
    soundNotificationEnabled: true,
  };
};

interface CompanyContextType {
  companyInfo: CompanyInfoState;
  updateCompanySettings: (updated: Partial<CompanyInfoState>) => void;
  resetCompanySettings: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoState>(getInitialCompanyInfo);

  // Sync across tabs/windows
  useEffect(() => {
    const handleStorageChange = () => {
      setCompanyInfo(getInitialCompanyInfo());
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('company_settings_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('company_settings_updated', handleStorageChange);
    };
  }, []);

  const updateCompanySettings = (updated: Partial<CompanyInfoState>) => {
    setCompanyInfo((prev) => {
      // Clean phone numbers automatically
      let phoneClean = updated.phoneClean;
      if (updated.phone && !phoneClean) {
        phoneClean = updated.phone.replace(/[^0-9+]/g, '');
      }

      let whatsappClean = updated.whatsapp;
      if (whatsappClean) {
        whatsappClean = whatsappClean.replace(/[^0-9]/g, '');
      }

      let adminNotificationPhoneClean = updated.adminNotificationPhone;
      if (adminNotificationPhoneClean) {
        adminNotificationPhoneClean = adminNotificationPhoneClean.replace(/[^0-9]/g, '');
      }

      const next: CompanyInfoState = {
        ...prev,
        ...updated,
        phoneClean: phoneClean || prev.phoneClean,
        whatsapp: whatsappClean || prev.whatsapp,
        adminNotificationPhone: adminNotificationPhoneClean || prev.adminNotificationPhone,
      };

      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event('company_settings_updated'));
      } catch (e) {
        console.error('Failed to save company settings', e);
      }

      return next;
    });
  };

  const resetCompanySettings = () => {
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
      const defaults: CompanyInfoState = {
        ...DEFAULT_COMPANY_INFO,
        adminNotificationPhone: DEFAULT_COMPANY_INFO.whatsapp,
        soundNotificationEnabled: true,
      };
      setCompanyInfo(defaults);
      window.dispatchEvent(new Event('company_settings_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CompanyContext.Provider value={{ companyInfo, updateCompanySettings, resetCompanySettings }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

// Standalone getter for non-react or static utility files
export const getStoredCompanySettings = (): CompanyInfoState => {
  return getInitialCompanyInfo();
};
