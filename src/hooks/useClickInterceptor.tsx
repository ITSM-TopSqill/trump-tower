import { useEffect } from 'react';
import { useInquiryModal } from '@/contexts/InquiryModalContext';

export const useClickInterceptor = () => {
  const { showModalForAction, isSubmitted } = useInquiryModal();

  useEffect(() => {
    if (isSubmitted) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // NEVER interfere with form elements or modal content
      const isFormElement = 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'BUTTON' && target.closest('form') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('form') ||
        target.closest('[data-radix-dialog-content]') ||
        target.closest('[data-radix-popover-content]') ||
        target.closest('[data-sonner-toaster]') ||
        target.closest('[role="dialog"]') ||
        target.closest('[data-state="open"]');

      if (isFormElement) {
        return; // Allow normal form interaction
      }
      
      // Skip header navigation and mobile menu
      const isHeaderNavigation = 
        target.closest('header') ||
        target.closest('nav') ||
        target.getAttribute('data-scroll-to') ||
        target.closest('[data-scroll-to]');

      if (isHeaderNavigation) {
        return; // Allow normal header navigation
      }
      
      // Only intercept specific navigation links and buttons (not header ones)
      const isNavigationElement = 
        (target.tagName === 'A' && target.getAttribute('href') && !target.getAttribute('href').startsWith('#')) ||
        (target.closest('a') && target.closest('a')?.getAttribute('href') && !target.closest('a')?.getAttribute('href')?.startsWith('#')) ||
        (target.tagName === 'BUTTON' && !target.closest('form') && !target.closest('header')) ||
        (target.closest('button') && !target.closest('form') && !target.closest('header'));

      if (isNavigationElement) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log("Intercepted click, showing modal");
        
        // Simple action - just log completion
        const originalAction = () => {
          console.log("Original action would execute after form submission");
        };
        
        showModalForAction(originalAction);
      }
    };

    document.addEventListener('click', handleClick, true);
    
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [showModalForAction, isSubmitted]);
};