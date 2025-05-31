"use client";

import React, { useState, useEffect, ReactNode } from "react";
import {
  IPrescriptionFormData,
  IMedication,
  IFamilyHistory,
} from "@/types/prescription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FamilyHistoryForm } from "@/components/DoctorPanel/FamilyHistoryForm";

import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  User,
  Stethoscope,
  Calendar,
  Activity,
  ClipboardList,
  PillIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  ChevronRight,
  History,
  FileCheck,
  Weight,
  Ruler,
  RotateCcw,
  Check,
  XCircle,
  Download,
  Share2,
  HeartPulse,
  Edit3,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";

import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PrescriptionDocument from "@/components/DoctorPanel/Prescription/PrescriptionDocument";

import SymptomsSelector from "@/components/DoctorPanel/SymptomsSelector";
import PrescribedMedicationsTable from "@/components/DoctorPanel/PrescribedMedicationsTable";
import LabTestsSection from "@/components/DoctorPanel/Prescription/LabTestsSection";

interface NextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const NextLink = ({ href, children, className = "" }: NextLinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const initialFormData: IPrescriptionFormData = {
  fullName: "",
  gender: "",
  age: "",
  height: "",
  weight: "",
  familyHistory: { commonDiseases: [], familyHistoryNotes: "" },
  patientHistory: "",
  symptoms: [],
  diagnosis: "",
  courseOfTreatment: "",
  labTests: [],
  medicationList: [],
  followUpDate: undefined,
};

type SubmissionStatus =
  | "idle"
  | "success_generated"
  | "success_saved"
  | "error";
type SubmittingAction = "save" | "generate" | null;

const doctorInfo = {
  name: "Dr. Aamir",
  clinic: "Tabeeb Advanced Clinic",
  appBrand: "MedScript Pro",
};

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="relative z-50 flex items-center justify-between p-4 lg:px-8 bg-slate-900/70 backdrop-blur-md border-b border-slate-700/50 sticky top-0">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-teal-400 to-emerald-500 p-2 rounded-xl shadow-lg">
          <Stethoscope className="w-7 h-7 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          {doctorInfo.appBrand}
        </span>
      </div>
      <div className="hidden lg:flex items-center space-x-6">
        <NextLink href="/dashboard" className="text-slate-300 hover:text-teal-400 transition-colors">
          Dashboard
        </NextLink>
        <NextLink href="/patients" className="text-slate-300 hover:text-teal-400 transition-colors">
          Patients
        </NextLink>
        <button className="bg-teal-600 hover:bg-teal-700 px-5 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 text-white">
          Dr. Aamir <ChevronRight className="inline w-4 h-4 -mr-1 ml-1 opacity-70" />
        </button>
      </div>
      <button className="lg:hidden text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-md z-40 p-6 shadow-xl">
          <div className="flex flex-col space-y-4">
            <NextLink href="/dashboard" className="text-slate-300 hover:text-teal-400 transition-colors py-2">Dashboard</NextLink>
            <NextLink href="/patients" className="text-slate-300 hover:text-teal-400 transition-colors py-2">Patients</NextLink>
            <button className="bg-teal-600 hover:bg-teal-700 px-5 py-2.5 rounded-lg transition-all text-left w-full flex justify-between items-center text-white">
              Dr. Aamir <ChevronRight className="inline w-4 h-4 opacity-70" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const AppFooter = () => (
  <footer className="relative z-10 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-teal-400 to-emerald-500 p-2 rounded-xl"><Stethoscope className="w-6 h-6 text-white" /></div>
            <span className="text-xl font-bold text-slate-100">{doctorInfo.appBrand}</span>
          </div>
          <p className="text-slate-400 text-sm mb-4 max-w-md">Precision in every prescription. Streamlining healthcare workflows.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-2 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Product</h3>
            <div className="space-y-2">
              <NextLink href="#" className="block text-sm text-slate-400 hover:text-teal-400 transition-colors">Features</NextLink>
              <NextLink href="#" className="block text-sm text-slate-400 hover:text-teal-400 transition-colors">Integrations</NextLink>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Support</h3>
            <div className="space-y-2">
              <NextLink href="#" className="block text-sm text-slate-400 hover:text-teal-400 transition-colors">Help Center</NextLink>
              <NextLink href="#" className="block text-sm text-slate-400 hover:text-teal-400 transition-colors">API Status</NextLink>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Legal</h3>
            <div className="space-y-2">
              <NextLink href="#" className="block text-sm text-slate-400 hover:text-teal-400 transition-colors">Privacy Policy</NextLink>
              <NextLink href="#" className="block text-sm text-slate-400 hover:text-teal-400 transition-colors">Terms of Service</NextLink>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-10 pt-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} {doctorInfo.appBrand}. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function PrescriptionPage() {
  const [formData, setFormData] = useState<IPrescriptionFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittingAction, setSubmittingAction] = useState<SubmittingAction>(null);
  const [activeTab, setActiveTab] = useState<string>("patient-info");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [isClient, setIsClient] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPdfDownloadClicked, setIsPdfDownloadClicked] = useState(false); // New state for PDF download click

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const currentUrl = pdfBlobUrl;
    return () => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [pdfBlobUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submissionStatus !== "idle") setSubmissionStatus("idle");
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: keyof IPrescriptionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submissionStatus !== "idle") setSubmissionStatus("idle");
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, followUpDate: date }));
    if (submissionStatus !== "idle") setSubmissionStatus("idle");
  };

  const handleFamilyHistoryChange = (updatedFamilyHistory: IFamilyHistory) => {
    setFormData((prev) => ({ ...prev, familyHistory: updatedFamilyHistory }));
    if (submissionStatus !== "idle") setSubmissionStatus("idle");
  };

  const handleMedicationListChange = (updatedMedicationList: IMedication[]) => {
    setFormData((prev) => ({ ...prev, medicationList: updatedMedicationList }));
    if (validationErrors.medicationList && updatedMedicationList.length > 0 && !updatedMedicationList.some((med) => !med.name?.trim() || !med.dosage?.trim() || !med.duration?.trim() || !med.frequency?.trim())) {
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.medicationList;
        return newErrors;
      });
    }
    if (submissionStatus !== "idle") setSubmissionStatus("idle");
  };

  const handleSymptomsUpdate = (newSymptoms: string[]) => {
    setFormData((prev) => ({ ...prev, symptoms: newSymptoms }));
    if (submissionStatus !== "idle") setSubmissionStatus("idle");
  };

  const handleLabTestsChange = (newLabTests: string[]) => {
    setFormData((prev) => ({ ...prev, labTests: newLabTests }));
    if (submissionStatus !== "idle") setSubmissionStatus("idle");
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Patient name is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.age.toString().trim() || parseInt(formData.age.toString()) <= 0) errors.age = "Valid age is required";
    if (!formData.diagnosis.trim()) errors.diagnosis = "Diagnosis is required";
    if (formData.medicationList.length === 0) {
      errors.medicationList = "At least one medication is required for a prescription.";
    } else if (formData.medicationList.some((med) => !med.name?.trim() || !med.dosage?.trim() || !med.duration?.trim() || !med.frequency?.trim())) {
      errors.medicationList = "All medications must have name, dosage, duration, and frequency completely filled.";
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0];
      if (["fullName", "gender", "age"].includes(firstErrorKey)) setActiveTab("patient-info");
      else if (firstErrorKey === "diagnosis") setActiveTab("assessment");
      else if (firstErrorKey === "medicationList") setActiveTab("treatment");
      return false;
    }
    return true;
  };

  const saveDataToServer = async (): Promise<boolean> => {
    console.log("[Parent] Saving draft data to server:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  };

  const handleSaveData = async () => {
    setSubmissionStatus("idle");
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmittingAction("save");
    try {
      await saveDataToServer();
      setSubmissionStatus("success_saved");
    } catch (error) {
      console.error("[Parent] Error saving draft:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
      setSubmittingAction(null);
    }
  };

  const handleGenerateAndSave = async () => {
    setSubmissionStatus("idle");
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmittingAction("generate");
    try {
      console.log("[Parent] Generating PDF for preview...");
      const MyDocument = <PrescriptionDocument data={formData} />;
      const blob = await pdf(MyDocument).toBlob();
      setPdfBlobUrl(URL.createObjectURL(blob));
      setIsPreviewModalOpen(true);
    } catch (error) {
      console.error("[Parent] Error during generate & preview process:", error);
      setSubmissionStatus("error");
      if (pdfBlobUrl) setPdfBlobUrl(null);
    } finally {
      setIsSubmitting(false);
      setSubmittingAction(null);
    }
  };

  const handleEditFromPreview = () => {
    setIsPreviewModalOpen(false);
    setPdfBlobUrl(null);
  };

  const handleConfirmFromPreview = () => {
    setIsPreviewModalOpen(false);
    setPdfBlobUrl(null);
    setSubmissionStatus("success_generated");
    setIsPdfDownloadClicked(false); // Reset for next PDF generation
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setValidationErrors({});
    setActiveTab("patient-info");
    setSubmissionStatus("idle");
    setIsSubmitting(false);
    setSubmittingAction(null);
    setIsPreviewModalOpen(false);
    setPdfBlobUrl(null);
    setIsPdfDownloadClicked(false); // Reset PDF download click state
  };

  const handleSharePdf = async () => {
    if (!formData) return;
    const MyDocument = <PrescriptionDocument data={formData} />;
    const blob = await pdf(MyDocument).toBlob();
    const fileName = `Prescription-${formData.fullName.replace(/\s/g, "_") || "Patient"}.pdf`;
    const file = new File([blob], fileName, { type: "application/pdf" });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ title: `Medical Prescription for ${formData.fullName}`, text: `Attached is the medical prescription for ${formData.fullName}.`, files: [file] });
      } catch (error) {
        console.error("[Parent] Error sharing PDF:", error);
        alert("Could not share the PDF. You can download it and share manually.");
      }
    } else {
      alert("Web Share API not available or cannot share files. Please download the PDF to share.");
    }
  };

  const mainContent = (
    <>
      <main className="relative z-10 container mx-auto px-3 sm:px-4 max-w-6xl py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-2.5 rounded-xl shadow-lg"><FileCheck className="h-6 w-6 sm:h-7 sm:w-7 text-white" /></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Digital Prescription System</h1>
          </div>
          <Badge variant="outline" className="bg-slate-800/70 text-teal-300 py-1.5 px-3 sm:px-4 border-teal-700/50 text-xs sm:text-sm self-start sm:self-center rounded-full">
            <Clock className="h-3.5 w-3.5 mr-1.5" /> {new Date().toLocaleDateString()}
          </Badge>
        </div>
        {submissionStatus === "success_saved" && (
          <Alert variant="default" className="mb-6 bg-teal-900/50 border-teal-700/60 text-teal-300">
            <Check className="h-5 w-5 text-teal-400" /><AlertTitle className="font-semibold text-teal-200">Prescription Data Saved!</AlertTitle>
            <AlertDescription>Your changes have been saved. You can continue editing or generate the prescription.</AlertDescription>
          </Alert>
        )}
        {submissionStatus === "error" && (
          <Alert variant="destructive" className="mb-6 bg-red-900/50 border-red-700/60 text-red-300">
            <XCircle className="h-5 w-5 text-red-400" /><AlertTitle className="font-semibold text-red-200">Operation Failed</AlertTitle>
            <AlertDescription>There was an error processing your request. Please check the form for errors or try again.{validationErrors.medicationList && ` Medication specific error: ${validationErrors.medicationList}`}</AlertDescription>
          </Alert>
        )}
        <Card className="shadow-2xl bg-slate-800/70 backdrop-blur-md border border-slate-700/80 border-t-4 border-t-teal-500">
          <CardHeader className="bg-slate-800/50 p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2.5"><HeartPulse className="h-5 w-5 sm:h-6 sm:h-6 text-teal-400" />Create New Prescription</CardTitle>
                <CardDescription className="text-slate-400 mt-1.5 text-sm">Complete all required fields to generate a professional medical prescription.</CardDescription>
              </div>
              <Avatar className="h-9 w-9 sm:h-11 sm:w-11 bg-teal-600/30 border-2 border-teal-500"><AvatarFallback className="text-teal-300 text-sm sm:text-base font-medium">DR</AvatarFallback></Avatar>
            </div>
          </CardHeader>
          <Separator className="border-slate-700" />
          <CardContent className="py-5 sm:py-6 px-3 sm:px-4 md:px-6">
            <Tabs value={activeTab} onValueChange={(newTab) => { setActiveTab(newTab); if (submissionStatus !== "idle") setSubmissionStatus("idle"); }} className="w-full">
              <TabsList className="flex flex-col sm:flex-row w-full mb-6 p-1.5 bg-slate-700/60 rounded-lg shadow-inner">
                <TabsTrigger value="patient-info" className="flex-1 w-full sm:w-auto justify-center text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-teal-500/30 rounded-md py-2 sm:py-2.5 text-xs sm:text-sm font-medium"><User className="h-4 w-4 mr-1.5 sm:mr-2" /> Patient Info</TabsTrigger>
                <TabsTrigger value="assessment" className="flex-1 w-full sm:w-auto justify-center text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-teal-500/30 rounded-md py-2 sm:py-2.5 text-xs sm:text-sm font-medium"><Stethoscope className="h-4 w-4 mr-1.5 sm:mr-2" /> Assessment</TabsTrigger>
                <TabsTrigger value="treatment" className="flex-1 w-full sm:w-auto justify-center text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-teal-500/30 rounded-md py-2 sm:py-2.5 text-xs sm:text-sm font-medium"><PillIcon className="h-4 w-4 mr-1.5 sm:mr-2" /> Treatment Plan</TabsTrigger>
              </TabsList>
              <TabsContent value="patient-info" className="space-y-6 sm:space-y-8">
                <section className="bg-slate-800/40 p-4 sm:p-6 rounded-xl border border-slate-700/70 shadow-md">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 flex items-center text-slate-100"><User className="h-5 w-5 mr-2.5 text-teal-400" /> PATIENT DETAILS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                    <div>
                      <Label htmlFor="fullName" className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-300">Full Name {validationErrors.fullName && (<TooltipProvider><Tooltip><TooltipTrigger asChild><AlertCircle className="h-3.5 w-3.5 text-red-400" /></TooltipTrigger><TooltipContent className="bg-slate-800 border-slate-600 text-slate-200"><p>{validationErrors.fullName}</p></TooltipContent></Tooltip></TooltipProvider>)}</Label>
                      <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter full name" className={`mt-1.5 text-sm bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/30 rounded-md ${validationErrors.fullName ? "border-red-500 focus:ring-red-500/40" : ""}`} />
                    </div>
                    <div>
                      <Label htmlFor="gender" className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-300">Gender {validationErrors.gender && (<TooltipProvider><Tooltip><TooltipTrigger asChild><AlertCircle className="h-3.5 w-3.5 text-red-400" /></TooltipTrigger><TooltipContent className="bg-slate-800 border-slate-600 text-slate-200"><p>{validationErrors.gender}</p></TooltipContent></Tooltip></TooltipProvider>)}</Label>
                      <Select name="gender" value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                        <SelectTrigger id="gender" className={`mt-1.5 text-sm bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/30 rounded-md [&>span]:text-slate-100 ${validationErrors.gender ? "border-red-500 focus:ring-red-500/40" : ""}`}><SelectValue placeholder="Select Gender" /></SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                          <SelectItem value="Male" className="focus:bg-teal-600 focus:text-white data-[highlighted]:bg-slate-700 data-[highlighted]:text-slate-100">Male</SelectItem>
                          <SelectItem value="Female" className="focus:bg-teal-600 focus:text-white data-[highlighted]:bg-slate-700 data-[highlighted]:text-slate-100">Female</SelectItem>
                          <SelectItem value="Other" className="focus:bg-teal-600 focus:text-white data-[highlighted]:bg-slate-700 data-[highlighted]:text-slate-100">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="age" className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-300">Age {validationErrors.age && (<TooltipProvider><Tooltip><TooltipTrigger asChild><AlertCircle className="h-3.5 w-3.5 text-red-400" /></TooltipTrigger><TooltipContent className="bg-slate-800 border-slate-600 text-slate-200"><p>{validationErrors.age}</p></TooltipContent></Tooltip></TooltipProvider>)}</Label>
                      <div className="relative mt-1.5">
                        <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} placeholder="Years" className={`pl-7 sm:pl-8 text-sm bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/30 rounded-md ${validationErrors.age ? "border-red-500 focus:ring-red-500/40" : ""}`} />
                        <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none"><Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" /></div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-xs sm:text-sm font-medium text-slate-300">Height</Label>
                      <div className="relative mt-1.5">
                        <Input id="height" name="height" type="number" value={formData.height} onChange={handleInputChange} placeholder="cm" className="pl-7 sm:pl-8 text-sm bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/30 rounded-md" />
                        <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none"><Ruler className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" /></div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="weight" className="text-xs sm:text-sm font-medium text-slate-300">Weight</Label>
                      <div className="relative mt-1.5">
                        <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} placeholder="kg" className="pl-7 sm:pl-8 text-sm bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/30 rounded-md" />
                        <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none"><Weight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" /></div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="bg-slate-800/40 p-4 sm:p-6 rounded-xl border border-slate-700/70 shadow-md">
                  <FamilyHistoryForm familyHistory={formData.familyHistory} setFamilyHistory={handleFamilyHistoryChange} />
                </section>
                <section className="bg-slate-800/40 p-4 sm:p-6 rounded-xl border border-slate-700/70 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="patientHistory" className="text-lg sm:text-xl font-semibold flex items-center text-slate-100"><History className="h-5 w-5 mr-2.5 text-teal-400" /> Patient History Notes</Label>
                    <TooltipProvider><Tooltip><TooltipTrigger asChild><div className="text-teal-400 cursor-help"><AlertCircle className="h-4.5 w-4.5" /></div></TooltipTrigger><TooltipContent className="bg-slate-800 border-slate-600 text-slate-200"><p className="w-full max-w-[200px] sm:max-w-xs text-xs">Document any pre-existing conditions, allergies, and past medical procedures.</p></TooltipContent></Tooltip></TooltipProvider>
                  </div>
                  <Textarea id="patientHistory" name="patientHistory" value={formData.patientHistory} onChange={handleInputChange} placeholder="Enter any patient history notes here..." rows={5} className="resize-none bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/30 rounded-md text-sm" />
                </section>
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-sm sm:text-base font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all" onClick={() => setActiveTab("assessment")}>Continue to Clinical Assessment <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </TabsContent>
              <TabsContent value="assessment" className="space-y-6 sm:space-y-8">
                <SymptomsSelector onSymptomsChange={handleSymptomsUpdate} initialSymptoms={formData.symptoms} />
                <section className="bg-red-900/30 p-4 sm:p-6 rounded-xl border border-red-700/50 shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                    <Label htmlFor="diagnosis" className="text-lg sm:text-xl font-semibold flex items-center text-red-300"><Activity className="h-5 w-5 mr-2.5" /> DIAGNOSIS{validationErrors.diagnosis && (<TooltipProvider><Tooltip><TooltipTrigger asChild><AlertCircle className="h-4.5 w-4.5 text-red-400 ml-1.5" /></TooltipTrigger><TooltipContent className="bg-slate-800 border-slate-600 text-red-200"><p>{validationErrors.diagnosis}</p></TooltipContent></Tooltip></TooltipProvider>)}</Label>
                    <Badge variant="outline" className="bg-red-800/50 text-red-300 border-red-700 text-xs self-start sm:self-center px-2.5 py-1 rounded-full">Required</Badge>
                  </div>
                  <Textarea id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} placeholder="Enter diagnosis here..." rows={5} className={`mt-2 resize-none bg-slate-700/30 border-red-600 text-slate-100 placeholder:text-slate-400 focus:border-red-400 focus:ring-red-400/40 rounded-md text-sm ${validationErrors.diagnosis ? "border-red-400" : ""}`} />
                </section>
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <Button variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:border-slate-500 hover:text-white text-sm sm:text-base w-full sm:w-auto font-medium px-5 py-2.5 rounded-lg" onClick={() => setActiveTab("patient-info")}>Back to Patient Info</Button>
                  <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-sm sm:text-base w-full sm:w-auto font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all" onClick={() => setActiveTab("treatment")}>Continue to Treatment Plan <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </TabsContent>
              <TabsContent value="treatment" className="space-y-6 sm:space-y-8">
                {validationErrors.medicationList && (<Alert variant="destructive" className="mt-0 mb-4 bg-red-900/50 border-red-700/60 text-red-300"><AlertCircle className="h-4 w-4 text-red-400" /><AlertTitle className="text-red-200">Medication Error</AlertTitle><AlertDescription>{validationErrors.medicationList}</AlertDescription></Alert>)}
                <section className={`rounded-xl shadow-md border ${validationErrors.medicationList ? "border-red-600 bg-red-900/20" : "border-slate-700/70 bg-slate-800/40"}`}>
                  <PrescribedMedicationsTable medicationList={formData.medicationList} setMedicationList={handleMedicationListChange} />
                </section>
                <section className="bg-yellow-900/30 p-4 sm:p-6 rounded-xl border border-yellow-700/50 shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                    <Label htmlFor="courseOfTreatment" className="text-lg sm:text-xl font-semibold flex items-center text-yellow-300"><ClipboardList className="h-5 w-5 mr-2.5" /> COURSE OF TREATMENT / ADVICE</Label>
                    <Badge variant="outline" className="bg-yellow-800/50 text-yellow-300 border-yellow-700 text-xs self-start sm:self-center px-2.5 py-1 rounded-full">Treatment Protocol</Badge>
                  </div>
                  <Textarea id="courseOfTreatment" name="courseOfTreatment" value={formData.courseOfTreatment} onChange={handleInputChange} placeholder="Describe the course of treatment, lifestyle advice, etc..." rows={5} className="mt-2 resize-none bg-slate-700/30 border-yellow-600 text-slate-100 placeholder:text-slate-400 focus:border-yellow-400 focus:ring-yellow-400/40 rounded-md text-sm" />
                </section>
                <LabTestsSection onLabTestsChange={handleLabTestsChange} initialLabTests={formData.labTests} />
                <section className="bg-slate-800/40 p-4 sm:p-6 rounded-xl border border-slate-700/70 shadow-md">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center text-slate-100"><Calendar className="h-5 w-5 mr-2.5 text-teal-400" /> NEXT FOLLOW UP</h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <Label htmlFor="followUpDate" className="text-slate-300 font-medium whitespace-nowrap text-sm">Schedule patient follow-up:</Label>
                    <DatePicker date={formData.followUpDate} onDateChange={handleDateChange} className="border-slate-600 bg-slate-700/50 text-slate-100 rounded-md w-full sm:w-auto focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500/30" />
                  </div>
                </section>
                <div className="flex justify-start">
                  <Button variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:border-slate-500 hover:text-white text-sm sm:text-base w-full sm:w-auto font-medium px-5 py-2.5 rounded-lg" onClick={() => setActiveTab("assessment")}>Back to Assessment</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <Separator className="border-slate-700" />
          <CardFooter className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 bg-slate-800/50 border-t border-slate-700/50">
            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs sm:text-sm text-slate-400 flex items-center self-start sm:self-center">
                {Object.keys(validationErrors).length > 0 && submissionStatus === "idle" ? (<><AlertCircle className="h-4 w-4 mr-1.5 text-red-400" /><span>Please correct form errors.</span></>) : (<><CheckCircle2 className="h-4 w-4 mr-1.5 text-green-400" /><span>All information is stored securely.</span></>)}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <Button type="button" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-white text-sm sm:text-base w-full sm:w-auto font-medium px-5 py-2.5 rounded-lg" onClick={handleReset} disabled={isSubmitting}><RotateCcw className="mr-2 h-4 w-4" /> Reset Form</Button>
                {activeTab === "treatment" && (<>
                    <Button variant="outline" className="border-teal-600 text-teal-300 hover:bg-teal-600/20 hover:text-teal-200 hover:border-teal-500 text-sm sm:text-base w-full sm:w-auto font-medium px-5 py-2.5 rounded-lg" onClick={handleSaveData} disabled={isSubmitting}>
                      {isSubmitting && submittingAction === "save" ? (<><svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-teal-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Saving...</>) : (<><Save className="mr-2 h-4 w-4" />Save Draft</>)}
                    </Button>
                    <Button size="lg" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-5 sm:px-6 font-semibold text-sm sm:text-base w-full sm:w-auto rounded-lg shadow-md hover:shadow-lg transition-all" onClick={handleGenerateAndSave} disabled={isSubmitting}>
                      {isSubmitting && submittingAction === "generate" ? (<><svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating...</>) : (<><FileCheck className="mr-2 h-4 w-4" />Generate Prescription</>)}
                    </Button>
                </>)}
              </div>
            </div>
          </CardFooter>
        </Card>
        {Object.keys(validationErrors).length > 0 && submissionStatus === "idle" && activeTab !== "treatment" && (
          <Alert variant="destructive" className="mt-6 bg-red-900/50 border-red-700/60 text-red-300">
            <AlertCircle className="h-4 w-4 text-red-400" /> <AlertTitle className="text-red-200">Validation Errors</AlertTitle>
            <AlertDescription>Please correct the highlighted errors on the form before proceeding. The first error is likely on the '{["fullName", "gender", "age"].includes(Object.keys(validationErrors)[0]) ? "Patient Info" : Object.keys(validationErrors)[0] === "diagnosis" ? "Assessment" : "current"}' tab.</AlertDescription>
          </Alert>
        )}
      </main>
    </>
  );

  if (submissionStatus === "success_generated" && formData && isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 text-white overflow-hidden relative flex flex-col">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="fixed w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300" style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}></div>
        <AppHeader />
        <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-8">
          <div className="container mx-auto w-full max-w-2xl">
            <Card className="shadow-xl bg-slate-800/80 backdrop-blur-md border border-slate-700">
              <CardHeader className="text-center bg-slate-800/50 pb-4 px-4 sm:px-6">
                <div className="mx-auto bg-green-500/20 p-3 rounded-full w-fit mb-4 shadow-lg"><CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" /></div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-slate-100">Prescription Generated Successfully!</CardTitle>
                <CardDescription className="text-slate-400 mt-1.5 text-sm sm:text-base">Powered by <span className="font-semibold text-teal-400">{doctorInfo.appBrand}</span></CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-5">
                <div className="text-center space-y-1.5">
                  <p className="text-base sm:text-lg font-medium text-slate-200">For Patient: <span className="text-teal-400 font-semibold">{formData.fullName}</span></p>
                  <p className="text-xs sm:text-sm text-slate-400">Prescribed by: <span className="font-medium text-slate-300">{doctorInfo.name}</span></p>
                  <p className="text-xs sm:text-sm text-slate-400">Clinic: <span className="font-medium text-slate-300">{doctorInfo.clinic}</span></p>
                </div>
                <Separator className="my-4 sm:my-6 border-slate-700" />
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <PDFDownloadLink document={<PrescriptionDocument data={formData} />} fileName={`Prescription-${formData.fullName.replace(/\s/g, "_") || "Patient"}.pdf`}>
                    {({ loading, error }) => {
                      const showClickedLoadingState = isPdfDownloadClicked && loading;
                      const showActualLoadingState = !isPdfDownloadClicked && loading;

                      if (showClickedLoadingState) {
                        return (
                          <Button variant="default" size="lg" disabled className="bg-teal-700 w-full sm:w-auto text-sm sm:text-base font-medium text-white">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Loading PDF...
                          </Button>
                        );
                      } else if (error) {
                        return (
                          <Button variant="destructive" size="lg" disabled className="w-full sm:w-auto text-sm sm:text-base font-medium bg-red-700 hover:bg-red-800">Error PDF</Button>
                        );
                      } else {
                        return (
                          <Button variant="default" size="lg" onClick={() => { if (!loading) { setIsPdfDownloadClicked(true); } }} disabled={showActualLoadingState} className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white w-full sm:w-auto text-sm sm:text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all">
                            {showActualLoadingState ? (
                              <><svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Preparing...</>
                            ) : (
                              <><Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />Download PDF</>
                            )}
                          </Button>
                        );
                      }
                    }}
                  </PDFDownloadLink>
                  {isClient && typeof navigator.share === "function" && formData && typeof navigator.canShare === "function" && navigator.canShare({ files: [new File([], "dummy.pdf", { type: "application/pdf" })] }) && (
                    <Button variant="outline" size="lg" onClick={handleSharePdf} className="border-teal-500 text-teal-300 hover:bg-teal-500/10 hover:text-teal-200 hover:border-teal-400 w-full sm:w-auto text-sm sm:text-base font-medium rounded-lg">
                      <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />Share PDF
                    </Button>
                  )}
                </div>
              </CardContent>
              <CardFooter className="py-4 sm:py-6 px-4 sm:px-6 bg-slate-800/50 border-t border-slate-700 flex justify-center">
                <Button variant="outline" onClick={handleReset} className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:border-slate-500 hover:text-white text-sm sm:text-base w-full sm:w-auto font-medium px-5 py-2.5 rounded-lg">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Prescription
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 text-white overflow-x-hidden relative flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="fixed w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300" style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}></div>
      <AppHeader />
      {mainContent}
      <AppFooter />
      <Dialog open={isPreviewModalOpen} onOpenChange={(isOpen) => { if (!isOpen) handleEditFromPreview(); }}>
        <DialogContent className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl w-[95vw] sm:w-full h-[85vh] sm:h-[90vh] flex flex-col p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 bg-slate-900/90 backdrop-blur-md border-slate-700 text-white shadow-2xl rounded-xl">
          <DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-3 border-b border-slate-700"><DialogTitle className="text-lg sm:text-xl md:text-2xl text-slate-100">Prescription Preview</DialogTitle></DialogHeader>
          <div className="flex-grow p-3 sm:p-4 md:p-6 pt-2 overflow-auto">
            {pdfBlobUrl && isClient ? (<iframe src={pdfBlobUrl} width="100%" height="100%" title="Prescription Preview" className="border border-slate-700 rounded-md" />) : (<div className="flex items-center justify-center h-full"><p className="text-slate-400">Loading preview...</p></div>)}
          </div>
          <DialogFooter className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-slate-700 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <Button variant="outline" onClick={handleEditFromPreview} className="w-full sm:w-auto text-sm sm:text-base font-medium border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-white rounded-lg"><Edit3 className="mr-2 h-4 w-4" /> Edit</Button>
            <Button onClick={handleConfirmFromPreview} className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white w-full sm:w-auto text-sm sm:text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all"><CheckCircle2 className="mr-2 h-4 w-4" /> Confirm & Proceed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}