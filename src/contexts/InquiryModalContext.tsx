import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InquiryModalContextType {
  shouldShowModal: boolean;
  pendingAction: (() => void) | null;
  showModalForAction: (action: () => void) => void;
  handleModalSuccess: () => void;
  hideModal: () => void;
  isSubmitted: boolean;
}

const InquiryModalContext = createContext<InquiryModalContextType | undefined>(undefined);

export const useInquiryModal = () => {
  const context = useContext(InquiryModalContext);
  if (!context) {
    throw new Error('useInquiryModal must be used within an InquiryModalProvider');
  }
  return context;
};

interface InquiryModalProviderProps {
  children: ReactNode;
}

export const InquiryModalProvider = ({ children }: InquiryModalProviderProps) => {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(() => {
    return sessionStorage.getItem('mandatoryInquirySubmitted') === 'true';
  });

  // Auto-show modal every 3 seconds until submitted
  React.useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      if (!shouldShowModal) {
        setShouldShowModal(true);
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [isSubmitted, shouldShowModal]);

  const showModalForAction = (action: () => void) => {
    if (isSubmitted) {
      // If already submitted, execute action immediately
      action();
      return;
    }
    
    setPendingAction(() => action);
    setShouldShowModal(true);
  };

  const handleModalSuccess = () => {
    setIsSubmitted(true);
    setShouldShowModal(false);
    
    // Execute the pending action
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const hideModal = () => {
    setShouldShowModal(false);
    setPendingAction(null);
  };

  return (
    <InquiryModalContext.Provider
      value={{
        shouldShowModal,
        pendingAction,
        showModalForAction,
        handleModalSuccess,
        hideModal,
        isSubmitted,
      }}
    >
      {children}
    </InquiryModalContext.Provider>
  );
};