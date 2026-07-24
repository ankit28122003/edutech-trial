import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const SESSION_KEY = 'edutech_contact_popup_shown';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [isContactOpen, setIsContactOpen] = useState(() => {
    // Auto-open on first visit per session
    return !sessionStorage.getItem(SESSION_KEY);
  });

  useEffect(() => {
    // Mark as shown once the component is mounted and modal is open
    if (isContactOpen) {
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
  }, [isContactOpen]);

  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  return (
    <ModalContext.Provider value={{ isContactOpen, openContact, closeContact }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
}

