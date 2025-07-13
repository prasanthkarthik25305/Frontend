
// Custom type definitions for the Health Hub application

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  experience: string;
  description: string;
}

interface Hospital {
  id: number;
  name: string;
  distance: string;
  address: string;
  specialties: string[];
}

interface AppointmentDetails {
  name: string;
  phone: string;
  systolic: string;
  diastolic: string;
  hospitalId: string;
  appointmentDate: Date;
  appointmentTime: string;
}

// Add global color theme variables
declare global {
  interface Window {
    // Add any browser globals here
  }
}

export {};
