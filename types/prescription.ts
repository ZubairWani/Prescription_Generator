// types/prescription.ts

export interface IMedication {
  id: string; // Add an ID for list management
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface IFamilyHistory {
  commonDiseases: string[];
  familyHistoryNotes: string;
}

export interface IPrescriptionFormData {
  fullName: string;
  gender: string;
  age: string | number; // Can be string from input, then parsed
  height: string | number;
  weight: string | number;
  familyHistory: IFamilyHistory;
  patientHistory: string;
  symptoms: string[];
  diagnosis: string;
  courseOfTreatment: string;
  labTests: string[];
  medicationList: IMedication[];
  followUpDate?: Date;
}
