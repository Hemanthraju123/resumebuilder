import { jsPDF } from 'jspdf';

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

/**
 * Format a date string to Month Year format
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format a phone number to (XXX) XXX-XXXX format
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.length < 10) return phoneNumber;
  
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phoneNumber;
};

/**
 * Convert HTML to PDF using jsPDF
 */
export const generatePDF = (element: HTMLElement, filename: string): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });
  
  doc.html(element, {
    callback: function(pdf) {
      pdf.save(`${filename}.pdf`);
    },
    x: 15,
    y: 15,
    width: doc.internal.pageSize.getWidth() - 30,
    windowWidth: 1000,
  });
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Get initials from full name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

/**
 * Format date range (Start Date - End Date or Start Date - Present)
 */
export const formatDateRange = (startDate: string, endDate: string, current = false): string => {
  const formattedStart = formatDate(startDate);
  
  if (current) {
    return `${formattedStart} - Present`;
  }
  
  const formattedEnd = formatDate(endDate);
  return `${formattedStart} - ${formattedEnd}`;
};