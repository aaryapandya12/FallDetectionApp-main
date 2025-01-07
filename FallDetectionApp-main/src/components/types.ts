export interface Reminder {
    id: string;
    medicineName: string;
    medicineDescription: string;
    image: string | null;
    time: Date;
    startDate: string;
    endDate: string;
    taken: boolean;
    skipped: boolean;
    frequency?: string; // Optional
    numberOfMedications: number; // Ensure this is not optional
  }