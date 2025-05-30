// // types/prescription.ts

// export interface IMedication {
//   id: string; // Add an ID for list management
//   name: string;
//   dosage: string;
//   frequency: string;
//   duration: string;
//   notes?: string;
// }

// export interface IFamilyHistory {
//   commonDiseases: string[];
//   familyHistoryNotes: string;
// }

// export interface ICommonDisease {
//   id: string;
//   diseaseName: string;   // Matches usage in FamilyHistoryForm
//   inheritance: string;   // Matches usage in FamilyHistoryForm (e.g., relation)
//   details?: string;      // Matches usage in FamilyHistoryForm, make it optional if appropriate
// }

// export interface IPrescriptionFormData {
//   fullName: string;
//   gender: string;
//   age: string | number; // Can be string from input, then parsed
//   height: string | number;
//   weight: string | number;
//   familyHistory: IFamilyHistory;
//   patientHistory: string;
//   symptoms: string[];
//   diagnosis: string;
//   courseOfTreatment: string;
//   labTests: string[];
//   medicationList: IMedication[];
//   followUpDate?: Date;
// }


// types/prescription.ts

export interface IMedication {
  id: string; // Add an ID for list management
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

// Define ICommonDisease first (or ensure it's defined before IFamilyHistory uses it, though order doesn't strictly matter for interfaces in the same file)
export interface ICommonDisease {
  id: string;
  diseaseName: string;   // Matches usage in FamilyHistoryForm
  inheritance: string;   // Matches usage in FamilyHistoryForm (e.g., relation)
  details?: string;      // Matches usage in FamilyHistoryForm, make it optional if appropriate
}

export interface IFamilyHistory {
  commonDiseases: ICommonDisease[]; // <--- CORRECTED: Use ICommonDisease here
  familyHistoryNotes: string;
}

export interface IPrescriptionFormData {
  fullName: string;
  gender: string;
  age: string | number; // Can be string from input, then parsed
  height: string | number;
  weight: string | number;
  familyHistory: IFamilyHistory; // This will now correctly use the IFamilyHistory with ICommonDisease[]
  patientHistory: string;
  symptoms: string[];
  diagnosis: string;
  courseOfTreatment: string;
  labTests: string[];
  medicationList: IMedication[];
  followUpDate?: Date;
}