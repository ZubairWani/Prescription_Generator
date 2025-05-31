"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Search, X, Pill, Clock, CalendarDays, FileText, Trash2, Plus, Edit3, Save,
  AlertTriangle, Filter, Grid3X3, List, CheckCircle2, Activity,
} from "lucide-react";

export interface IMedication {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  frequency: string;
  customFrequencyDetails?: string;
  instructions?: string;
  priority?: "high" | "medium" | "low";
  status?: "active" | "completed" | "paused";
}

interface PrescribedMedicationsTableProps {
  medicationList: IMedication[];
  setMedicationList: (updatedList: IMedication[]) => void;
}

const initialNewMedicationFormState: Omit<IMedication, "id"> = {
  name: "", dosage: "", duration: "", frequency: "",
  customFrequencyDetails: "", instructions: "", priority: "medium", status: "active",
};

const frequencyOptions = [
  "1-0-0", "1-0-1", "1-1-0", "1-1-1", "0-1-0", "0-1-1", "0-0-1",
  "BID", "TID", "QID", "HS", "PRN", "Custom",
];

// Dark theme priority options (Red/Yellow are semantically distinct and kept)
const priorityOptions = [
  { value: "high", label: "High Priority", color: "bg-red-700/30 text-red-300 border-red-600" },
  { value: "medium", label: "Medium Priority", color: "bg-yellow-700/30 text-yellow-300 border-yellow-600" },
  { value: "low", label: "Low Priority", color: "bg-green-700/30 text-green-300 border-green-600" },
];

// Dark theme status options - updated "completed" to teal/emerald theme
const statusOptions = [
  { value: "active", label: "Active", color: "bg-green-700/30 text-green-300 border-green-600", icon: CheckCircle2 },
  { value: "paused", label: "Paused", color: "bg-yellow-700/30 text-yellow-300 border-yellow-600", icon: Clock },
  { value: "completed", label: "Completed", color: "bg-teal-700/30 text-teal-300 border-teal-600", icon: CheckCircle2 },
];


const PrescribedMedicationsTable = ({
  medicationList: propMedicationList,
  setMedicationList: propSetMedicationList,
}: PrescribedMedicationsTableProps) => {
  const [currentMedicationForm, setCurrentMedicationForm] = useState<Omit<IMedication, "id">>(initialNewMedicationFormState);
  const [editingMedicationId, setEditingMedicationId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMedications, setFilteredMedications] = useState<IMedication[]>(propMedicationList);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof Omit<IMedication, "id">, string>>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "priority" | "status">("name");

  const formRef = useRef<HTMLDivElement>(null);
  const instructionsTextareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = (element: HTMLTextAreaElement | null) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (isFormVisible && instructionsTextareaRef.current) {
      adjustTextareaHeight(instructionsTextareaRef.current);
    }
  }, [currentMedicationForm.instructions, isFormVisible]);

  useEffect(() => {
    let filtered = propMedicationList.filter((med) => {
      const searchMatch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (med.instructions && med.instructions.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          med.dosage.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = filterStatus === "all" || med.status === filterStatus;
      const priorityMatch = filterPriority === "all" || med.priority === filterPriority;
      return searchMatch && statusMatch && priorityMatch;
    });
    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority || "medium"] || 2) - (priorityOrder[a.priority || "medium"] || 2);
      }
      if (sortBy === "status") return (a.status || "active").localeCompare(b.status || "active");
      return 0;
    });
    setFilteredMedications(filtered);
  }, [propMedicationList, searchTerm, filterStatus, filterPriority, sortBy]);

  const validateCurrentMedicationForm = (): boolean => {
    const errors: Partial<Record<keyof Omit<IMedication, "id">, string>> = {};
    if (!currentMedicationForm.name.trim()) errors.name = "Medicine name is required";
    if (!currentMedicationForm.dosage.trim()) errors.dosage = "Dosage is required";
    if (!currentMedicationForm.duration.trim()) errors.duration = "Duration is required";
    if (!currentMedicationForm.frequency) errors.frequency = "Frequency is required";
    if (currentMedicationForm.frequency === "Custom" && !currentMedicationForm.customFrequencyDetails?.trim()) {
      errors.customFrequencyDetails = "Custom frequency details are required";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveOrUpdateMedication = () => {
    if (validateCurrentMedicationForm()) {
      if (editingMedicationId) {
        const updatedList = propMedicationList.map((med) =>
          med.id === editingMedicationId ? { ...currentMedicationForm, id: editingMedicationId } : med
        );
        propSetMedicationList(updatedList);
      } else {
        const newMedWithId: IMedication = { ...currentMedicationForm, id: Date.now().toString() + Math.random().toString(36).substring(2,7) };
        propSetMedicationList([...propMedicationList, newMedWithId]);
      }
      resetFormAndHide();
    }
  };

  const handleEditMedication = (medToEdit: IMedication) => {
    const { id, ...medData } = medToEdit;
    const formState: Omit<IMedication, "id"> = {
      name: medData.name || "", dosage: medData.dosage || "", duration: medData.duration || "",
      frequency: medData.frequency || "", customFrequencyDetails: medData.customFrequencyDetails || "",
      instructions: medData.instructions || "", priority: medData.priority || "medium", status: medData.status || "active",
    };
    setCurrentMedicationForm(formState);
    setEditingMedicationId(id);
    setValidationErrors({});
    setIsFormVisible(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleRemoveMedication = (idToRemove: string) => {
    propSetMedicationList(propMedicationList.filter((med) => med.id !== idToRemove));
    if (editingMedicationId === idToRemove) resetFormAndHide();
  };

  const resetFormAndHide = () => {
    setCurrentMedicationForm(initialNewMedicationFormState);
    setEditingMedicationId(null);
    setValidationErrors({});
    setIsFormVisible(false);
  };

  const handleInputChange = (field: keyof Omit<IMedication, "id">, value: string) => {
    setCurrentMedicationForm((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleInstructionsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange("instructions", e.target.value);
    adjustTextareaHeight(e.target);
  };

  const getFrequencyLabel = (frequency: string, customDetails?: string) => {
    if (!frequency) return "N/A";
    if (frequency === "Custom" && customDetails) return customDetails;
    const labels: Record<string, string> = {
      "1-0-0": "Morning", "0-1-0": "Afternoon", "0-0-1": "Evening",
      "1-1-0": "Morning & Afternoon", "1-0-1": "Morning & Evening", "0-1-1": "Afternoon & Evening",
      "1-1-1": "Thrice Daily", BID: "Twice Daily (BID)", TID: "Thrice Daily (TID)",
      QID: "Four Times Daily (QID)", HS: "At Bedtime (HS)", PRN: "As Needed (PRN)",
    };
    return labels[frequency] || frequency;
  };

  const activeFiltersCount = (filterStatus !== "all" ? 1 : 0) + (filterPriority !== "all" ? 1 : 0);

  return (
    <div className="pb-8 w-full">
      {/* Header */}
      <div className="bg-slate-800/40 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700/70 overflow-hidden mb-4 sm:mb-6 md:mb-8">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 px-4 py-4 sm:px-6 md:px-8 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
              <div className="bg-white/20 p-2 sm:p-2.5 rounded-md sm:rounded-lg flex-shrink-0 shadow-inner">
                <Pill className="h-5 w-5 sm:h-6 md:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                  Prescribed Medications
                </h1>
                <p className="text-teal-100 mt-0.5 text-xs sm:text-sm truncate">
                  Manage current medication schedule
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 self-start sm:self-center mt-1 sm:mt-0 flex-shrink-0">
              <div className="bg-slate-700/50 backdrop-blur-sm px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm rounded-full border border-slate-600">
                <span className="text-slate-200 font-semibold">{propMedicationList.length} Total</span>
              </div>
              <div className="bg-green-700/30 backdrop-blur-sm px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm rounded-full border border-green-600/50">
                <span className="text-green-300 font-semibold">{propMedicationList.filter((m) => m.status === "active").length} Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="px-4 py-4 sm:px-6 md:px-8 sm:py-5 bg-slate-800/60 border-b border-slate-700">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto lg:flex-grow-[2] lg:max-w-xl">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                <input
                  type="text" placeholder="Search medications..." value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-3 bg-slate-700/50 border-2 border-slate-600 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all text-slate-100 placeholder-slate-400 text-sm"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200">
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-all whitespace-nowrap w-full sm:w-auto flex-shrink-0 ${
                  showFilters || activeFiltersCount > 0 ? "bg-teal-600/30 border-teal-500 text-teal-300" : "bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500"
                }`}
              >
                <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium text-sm">Filters</span>
                {activeFiltersCount > 0 && (<div className="bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{activeFiltersCount}</div>)}
              </button>
            </div>
            <div className="flex items-center space-x-2 w-full lg:w-auto lg:flex-grow-[1] justify-between sm:justify-end flex-shrink-0">
              <div className="flex bg-slate-700 rounded-lg p-0.5 sm:p-1 flex-shrink-0">
                <button onClick={() => setViewMode("cards")} title="Card View" className={`p-1.5 sm:p-2 rounded-md transition-colors ${viewMode === "cards" ? "bg-slate-600 shadow-sm text-teal-300" : "text-slate-400 hover:bg-slate-600/70 hover:text-slate-200"}`}>
                  <Grid3X3 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button onClick={() => setViewMode("table")} title="Table View" className={`p-1.5 sm:p-2 rounded-md transition-colors ${viewMode === "table" ? "bg-slate-600 shadow-sm text-teal-300" : "text-slate-400 hover:bg-slate-600/70 hover:text-slate-200"}`}>
                  <List className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <button
                onClick={() => { setIsFormVisible(true); setCurrentMedicationForm(initialNewMedicationFormState); setEditingMedicationId(null); setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);}}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-2.5 px-3 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all shadow-md hover:shadow-lg w-auto sm:w-auto whitespace-nowrap"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm hidden xs:inline">Add New</span>
                <span className="text-sm xs:hidden">Add</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-3 sm:p-4 bg-slate-700/40 rounded-lg sm:rounded-xl border border-slate-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Status</label>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full p-2.5 sm:p-3 bg-slate-600/50 border-2 border-slate-500 text-slate-100 rounded-lg focus:border-teal-500 outline-none text-sm">
                    <option value="all">All Statuses</option>
                    {statusOptions.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Priority</label>
                  <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="w-full p-2.5 sm:p-3 bg-slate-600/50 border-2 border-slate-500 text-slate-100 rounded-lg focus:border-teal-500 outline-none text-sm">
                    <option value="all">All Priorities</option>
                    {priorityOptions.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Sort By</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "priority" | "status")} className="w-full p-2.5 sm:p-3 bg-slate-600/50 border-2 border-slate-500 text-slate-100 rounded-lg focus:border-teal-500 outline-none text-sm">
                    <option value="name">Name</option>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex justify-end">
                <button onClick={() => { setFilterStatus("all"); setFilterPriority("all"); setSortBy("name");}} className="text-xs sm:text-sm text-slate-400 hover:text-slate-200 font-medium">Clear Filters</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {isFormVisible && (
        <div ref={formRef} className="bg-slate-800/40 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700/70 overflow-hidden mb-4 sm:mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 px-4 py-4 sm:px-6 md:px-8 sm:py-5"> {/* Kept green-teal for form distinction */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-white/20 p-2 sm:p-2.5 rounded-md sm:rounded-lg flex-shrink-0 shadow-inner">
                {editingMedicationId ? <Edit3 className="h-5 w-5 sm:h-6 text-white" /> : <Plus className="h-5 w-5 sm:h-6 text-white" />}
              </div>
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">{editingMedicationId ? "Edit Medication" : "Add New Medication"}</h2>
                <p className="text-green-100 mt-0.5 text-xs sm:text-sm">{editingMedicationId ? "Update medication details" : "Fill in medication information"}</p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <div className="lg:col-span-2">
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5"><Pill className="h-4 w-4 inline mr-1.5" /> Medicine Name *</label>
                <input type="text" value={currentMedicationForm.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="e.g., Amoxicillin 250mg"
                  className={`w-full p-3 bg-slate-700/50 border-2 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-teal-500/30 outline-none transition-all text-sm text-slate-100 placeholder-slate-400 ${validationErrors.name ? "border-red-500 focus:border-red-500" : "border-slate-600 focus:border-teal-500"}`} />
                {validationErrors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertTriangle className="h-3.5 w-3.5 mr-1" />{validationErrors.name}</p>}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5"><Activity className="h-4 w-4 inline mr-1.5" />Dosage *</label>
                <input type="text" value={currentMedicationForm.dosage} onChange={(e) => handleInputChange("dosage", e.target.value)} placeholder="e.g., 1 tablet, 5ml"
                  className={`w-full p-3 bg-slate-700/50 border-2 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-teal-500/30 outline-none transition-all text-sm text-slate-100 placeholder-slate-400 ${validationErrors.dosage ? "border-red-500 focus:border-red-500" : "border-slate-600 focus:border-teal-500"}`} />
                {validationErrors.dosage && <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertTriangle className="h-3.5 w-3.5 mr-1" />{validationErrors.dosage}</p>}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5"><CalendarDays className="h-4 w-4 inline mr-1.5" />Duration *</label>
                <input type="text" value={currentMedicationForm.duration} onChange={(e) => handleInputChange("duration", e.target.value)} placeholder="e.g., 7 days"
                  className={`w-full p-3 bg-slate-700/50 border-2 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-teal-500/30 outline-none transition-all text-sm text-slate-100 placeholder-slate-400 ${validationErrors.duration ? "border-red-500 focus:border-red-500" : "border-slate-600 focus:border-teal-500"}`} />
                {validationErrors.duration && <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertTriangle className="h-3.5 w-3.5 mr-1" />{validationErrors.duration}</p>}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5"><Clock className="h-4 w-4 inline mr-1.5" />Frequency *</label>
                <select value={currentMedicationForm.frequency} onChange={(e) => handleInputChange("frequency", e.target.value)}
                  className={`w-full p-3 bg-slate-700/50 border-2 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-teal-500/30 outline-none transition-all text-sm text-slate-100 ${validationErrors.frequency ? "border-red-500 focus:border-red-500" : "border-slate-600 focus:border-teal-500"}`}>
                  <option value="">Select frequency</option>
                  {frequencyOptions.map((opt) => (<option key={opt} value={opt} className="bg-slate-700 text-slate-100">{getFrequencyLabel(opt)}</option>))}
                </select>
                {validationErrors.frequency && <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertTriangle className="h-3.5 w-3.5 mr-1" />{validationErrors.frequency}</p>}
              </div>
              {currentMedicationForm.frequency === "Custom" && (
                <div className="lg:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Custom Frequency Details *</label>
                  <input type="text" value={currentMedicationForm.customFrequencyDetails || ""} onChange={(e) => handleInputChange("customFrequencyDetails", e.target.value)} placeholder="e.g., Every Mon & Thu"
                    className={`w-full p-3 bg-slate-700/50 border-2 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-teal-500/30 outline-none transition-all text-sm text-slate-100 placeholder-slate-400 ${validationErrors.customFrequencyDetails ? "border-red-500 focus:border-red-500" : "border-slate-600 focus:border-teal-500"}`} />
                  {validationErrors.customFrequencyDetails && <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertTriangle className="h-3.5 w-3.5 mr-1" />{validationErrors.customFrequencyDetails}</p>}
                </div>
              )}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5"><FileText className="h-4 w-4 inline mr-1.5" />Special Instructions</label>
                <textarea ref={instructionsTextareaRef} value={currentMedicationForm.instructions || ""} onChange={handleInstructionsChange} placeholder="e.g., Take with food"
                  className="w-full p-3 bg-slate-700/50 border-2 border-slate-600 text-slate-100 placeholder-slate-400 rounded-lg sm:rounded-xl focus:border-teal-500 outline-none transition-all resize-none text-sm" style={{ overflowY: "hidden" }} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-700">
              <button onClick={resetFormAndHide} className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-600/70 text-slate-300 rounded-lg sm:rounded-xl font-semibold hover:bg-slate-500/70 transition-colors text-sm">Cancel</button>
              <button onClick={handleSaveOrUpdateMedication} className="w-full sm:w-auto order-1 sm:order-2 px-4 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 text-sm">
                {editingMedicationId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                <span>{editingMedicationId ? "Update Medication" : "Save Medication"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medications List */}
      <div className="bg-slate-800/40 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700/70 overflow-hidden">
        {filteredMedications.length > 0 ? (
          viewMode === "cards" ? (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredMedications.map((med) => (
                  <div key={med.id} className="bg-gradient-to-br from-slate-700/50 to-slate-800/30 border border-slate-600/70 rounded-lg sm:rounded-xl p-4 hover:shadow-lg hover:border-slate-500/70 transition-all duration-200 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                        <div className="bg-teal-600/30 p-1.5 rounded-md flex-shrink-0"><Pill className="h-4 w-4 sm:h-5 sm:w-5 text-teal-300" /></div>
                        <div className="min-w-0"><h3 className="font-bold text-slate-100 text-sm sm:text-base leading-tight truncate" title={med.name}>{med.name}</h3></div>
                      </div>
                      <div className="flex space-x-1 flex-shrink-0 ml-2">
                        <button onClick={() => handleEditMedication(med)} title="Edit" className="p-1.5 text-slate-400 hover:text-teal-400 hover:bg-teal-600/20 rounded-md transition-colors"><Edit3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></button>
                        <button onClick={() => handleRemoveMedication(med.id)} title="Delete" className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-600/20 rounded-md transition-colors"><Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></button>
                      </div>
                    </div>
                    <div className="space-y-2.5 text-xs sm:text-sm mt-auto">
                      <div className="flex items-center space-x-2"><Activity className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" /><span className="text-slate-400">Dosage:</span><span className="font-medium text-slate-200 truncate" title={med.dosage}>{med.dosage}</span></div>
                      <div className="flex items-center space-x-2"><Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" /><span className="text-slate-400">Frequency:</span><span className="font-medium text-slate-200 truncate" title={getFrequencyLabel(med.frequency, med.customFrequencyDetails)}>{getFrequencyLabel(med.frequency, med.customFrequencyDetails)}</span></div>
                      <div className="flex items-center space-x-2"><CalendarDays className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" /><span className="text-slate-400">Duration:</span><span className="font-medium text-slate-200 truncate" title={med.duration}>{med.duration}</span></div>
                      {med.instructions && (<div className="flex items-start space-x-2"><FileText className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" /><div><span className="text-slate-400">Instructions:</span><p className="text-slate-200 mt-0.5 leading-relaxed line-clamp-2" title={med.instructions}>{med.instructions}</p></div></div>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[700px] md:min-w-[800px]">
                <thead className="bg-slate-700/50 border-b border-slate-600">
                  <tr>
                    <th className="text-left px-3 py-3 sm:px-4 md:px-5 font-semibold text-slate-300 text-xs sm:text-sm whitespace-nowrap">Medication</th>
                    <th className="text-left px-3 py-3 sm:px-4 md:px-5 font-semibold text-slate-300 text-xs sm:text-sm whitespace-nowrap">Dosage</th>
                    <th className="text-left px-3 py-3 sm:px-4 md:px-5 font-semibold text-slate-300 text-xs sm:text-sm whitespace-nowrap">Frequency</th>
                    <th className="text-left px-3 py-3 sm:px-4 md:px-5 font-semibold text-slate-300 text-xs sm:text-sm whitespace-nowrap">Duration</th>
                    <th className="text-left px-3 py-3 sm:px-4 md:px-5 font-semibold text-slate-300 text-xs sm:text-sm whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredMedications.map((med) => (
                    <tr key={med.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-3 py-3.5 sm:px-4 md:px-5 text-xs sm:text-sm align-top">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="bg-teal-600/30 p-1.5 sm:p-2 rounded-md sm:rounded-lg flex-shrink-0 mt-0.5"><Pill className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-teal-300" /></div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-100 truncate" title={med.name}>{med.name}</div>
                            {med.instructions && (<div className="text-slate-400 mt-0.5 text-xs line-clamp-2 sm:line-clamp-3" title={med.instructions}>{med.instructions}</div>)}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 sm:px-4 md:px-5 font-medium text-slate-200 text-xs sm:text-sm whitespace-nowrap align-top" title={med.dosage}>{med.dosage}</td>
                      <td className="px-3 py-3.5 sm:px-4 md:px-5 text-slate-300 text-xs sm:text-sm min-w-[150px] align-top" title={getFrequencyLabel(med.frequency, med.customFrequencyDetails)}>{getFrequencyLabel(med.frequency, med.customFrequencyDetails)}</td>
                      <td className="px-3 py-3.5 sm:px-4 md:px-5 text-slate-300 text-xs sm:text-sm whitespace-nowrap align-top" title={med.duration}>{med.duration}</td>
                      <td className="px-3 py-3.5 sm:px-4 md:px-5 text-xs sm:text-sm align-top">
                        <div className="flex space-x-1">
                          <button onClick={() => handleEditMedication(med)} title="Edit" className="p-1 sm:p-1.5 text-slate-400 hover:text-teal-400 hover:bg-teal-600/20 rounded-md transition-colors"><Edit3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></button>
                          <button onClick={() => handleRemoveMedication(med.id)} title="Delete" className="p-1 sm:p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-600/20 rounded-md transition-colors"><Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-10 sm:py-12 px-4">
            <div className="bg-slate-700 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"><Pill className="h-5 w-5 sm:h-6 text-slate-500" /></div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-200 mb-1.5">{searchTerm || filterStatus !== "all" || filterPriority !== "all" ? "No medications found" : "No medications added yet"}</h3>
            <p className="text-slate-400 mb-4 sm:mb-5 text-xs sm:text-sm">{searchTerm || filterStatus !== "all" || filterPriority !== "all" ? "Try adjusting your search or filter criteria" : "Add your first medication to get started"}</p>
            {!searchTerm && filterStatus === "all" && filterPriority === "all" && (
              <button onClick={() => {setIsFormVisible(true); setCurrentMedicationForm(initialNewMedicationFormState); setEditingMedicationId(null); setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);}}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold flex items-center space-x-2 mx-auto transition-all shadow-md hover:shadow-lg text-sm">
                <Plus className="h-4 w-4" />
                <span>Add First Medication</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescribedMedicationsTable;