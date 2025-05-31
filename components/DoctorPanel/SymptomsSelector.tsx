"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Stethoscope, Plus, Activity } from 'lucide-react';

const PREDEFINED_SYMPTOMS = [
  // ... (PREDEFINED_SYMPTOMS array remains the same)
  'Fever', 'Chills', 'Fatigue', 'Weakness', 'Malaise', 'Weight Loss', 'Weight Gain', 'Night Sweats', 'Loss of Appetite', 'Excessive Appetite',
  'Headache', 'Migraine', 'Back Pain', 'Neck Pain', 'Joint Pain', 'Muscle Pain', 'Abdominal Pain', 'Chest Pain', 'Pelvic Pain', 'Chronic Pain',
  'Cough', 'Shortness of Breath', 'Wheezing', 'Chest Tightness', 'Sputum Production', 'Hemoptysis', 'Sore Throat', 'Hoarseness', 'Nasal Congestion', 'Runny Nose', 'Sneezing',
  'Palpitations', 'Irregular Heartbeat', 'Leg Swelling', 'Dizziness', 'Fainting', 'High Blood Pressure', 'Low Blood Pressure',
  'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Abdominal Cramping', 'Bloating', 'Gas', 'Heartburn', 'Acid Reflux', 'Difficulty Swallowing', 'Blood in Stool', 'Black Stool',
  'Seizures', 'Tremor', 'Numbness', 'Tingling', 'Memory Loss', 'Confusion', 'Difficulty Concentrating', 'Balance Problems', 'Coordination Problems', 'Speech Difficulties',
  'Rash', 'Itching', 'Hives', 'Dry Skin', 'Oily Skin', 'Acne', 'Skin Discoloration', 'Bruising', 'Bleeding', 'Hair Loss', 'Nail Changes',
  'Joint Stiffness', 'Muscle Weakness', 'Muscle Cramps', 'Bone Pain', 'Limited Range of Motion', 'Swelling', 'Deformity',
  'Frequent Urination', 'Urgent Urination', 'Burning Urination', 'Blood in Urine', 'Difficulty Urinating', 'Incontinence', 'Cloudy Urine', 'Strong Urine Odor',
  'Irregular Menstruation', 'Heavy Menstruation', 'Painful Menstruation', 'Vaginal Discharge', 'Vaginal Bleeding', 'Erectile Dysfunction', 'Decreased Libido',
  'Insomnia', 'Excessive Sleepiness', 'Sleep Apnea', 'Restless Sleep', 'Nightmares', 'Sleepwalking',
  'Anxiety', 'Depression', 'Mood Swings', 'Irritability', 'Panic Attacks', 'Obsessive Thoughts', 'Compulsive Behaviors', 'Hallucinations', 'Delusions',
  'Blurred Vision', 'Double Vision', 'Eye Pain', 'Red Eyes', 'Dry Eyes', 'Excessive Tearing', 'Light Sensitivity', 'Night Blindness', 'Floaters',
  'Hearing Loss', 'Ringing in Ears', 'Ear Pain', 'Ear Discharge',
  'Excessive Thirst', 'Excessive Urination', 'Heat Intolerance', 'Cold Intolerance', 'Voice Changes'
];

interface SymptomsSelectorProps {
  initialSymptoms: string[];
  onSymptomsChange: (updatedSymptoms: string[]) => void;
}

const SymptomsSelector = ({ initialSymptoms, onSymptomsChange }: SymptomsSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const trimmedSearchTerm = searchTerm.trim();

  const filteredSymptoms = useMemo(() => {
    if (!trimmedSearchTerm) return [];
    return PREDEFINED_SYMPTOMS.filter(
      (symptom) =>
        symptom.toLowerCase().includes(trimmedSearchTerm.toLowerCase()) &&
        !initialSymptoms.some(is => is.toLowerCase() === symptom.toLowerCase())
    ).slice(0, 7);
  }, [trimmedSearchTerm, initialSymptoms]);

  const canAddCustom = useMemo(() => {
    if (!trimmedSearchTerm) return false;
    const isPredefined = PREDEFINED_SYMPTOMS.some(s => s.toLowerCase() === trimmedSearchTerm.toLowerCase());
    const isAlreadySelected = initialSymptoms.some(s => s.toLowerCase() === trimmedSearchTerm.toLowerCase());
    return !isPredefined && !isAlreadySelected;
  }, [trimmedSearchTerm, initialSymptoms]);

  const handleSymptomSelect = (symptom: string, isCustom = false) => {
    const symptomToAdd = symptom.trim();
    if (!symptomToAdd) return;

    const alreadyExists = initialSymptoms.some(
      (s) => s.toLowerCase() === symptomToAdd.toLowerCase()
    );

    if (!alreadyExists) {
      onSymptomsChange([...initialSymptoms, symptomToAdd]);
    }
    setSearchTerm('');
    setIsDropdownOpen(false);
    setFocusedIndex(-1);
    searchRef.current?.focus();
  };

  const handleSymptomRemove = (symptomToRemove: string) => {
    onSymptomsChange(initialSymptoms.filter(s => s !== symptomToRemove));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setIsDropdownOpen(newSearchTerm.trim().length > 0);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalItems = filteredSymptoms.length + (canAddCustom ? 1 : 0);
    if (!isDropdownOpen || totalItems === 0) {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
        setFocusedIndex(-1);
        searchRef.current?.blur();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < totalItems - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : totalItems - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredSymptoms.length) {
          handleSymptomSelect(filteredSymptoms[focusedIndex]);
        } else if (canAddCustom && focusedIndex === filteredSymptoms.length) {
          handleSymptomSelect(trimmedSearchTerm, true);
        } else if (canAddCustom && focusedIndex === -1 && trimmedSearchTerm) {
          handleSymptomSelect(trimmedSearchTerm, true);
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        setFocusedIndex(-1);
        searchRef.current?.blur();
        break;
    }
  };

  const handleSearchFocus = () => {
    if (trimmedSearchTerm.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-slate-800/40 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700/70 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="bg-white/20 p-2 sm:p-2.5 rounded-md sm:rounded-lg flex-shrink-0 shadow-inner">
              <Stethoscope className="h-5 w-5 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Symptom Assessment</h2>
              <p className="text-teal-100 text-xs sm:text-sm mt-0.5 sm:mt-1">Select all symptoms that apply</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/25 self-start sm:self-center mt-1 sm:mt-0 shadow-md">
            <span className="text-white text-xs sm:text-sm font-medium">
              {initialSymptoms.length} Selected
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="relative mb-6 sm:mb-8" ref={dropdownContainerRef}>
          <label htmlFor="symptom-search" className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3">
            Search or Add Symptoms
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            </div>
            <input
              id="symptom-search"
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onKeyDown={handleKeyDown}
              placeholder="Type to search symptoms..."
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-slate-700/50 border-2 border-slate-600 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all duration-200 text-slate-100 placeholder-slate-400 text-sm"
              autoComplete="off"
            />
          </div>

          {isDropdownOpen && trimmedSearchTerm.length > 0 && (
            <div className="absolute z-20 w-full mt-1.5 sm:mt-2 bg-slate-800 border border-slate-700 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
              <ul role="listbox" className="max-h-64 overflow-y-auto">
                {filteredSymptoms.map((symptom, index) => (
                  <li key={symptom} role="option" aria-selected={index === focusedIndex}>
                    <button
                      onClick={() => handleSymptomSelect(symptom)}
                      className={`w-full text-left px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-150 border-b border-slate-700 last:border-b-0 text-sm ${index === focusedIndex ? 'bg-teal-600/70 text-white' : 'hover:bg-slate-700/60 text-slate-200'
                        }`}
                      onMouseEnter={() => setFocusedIndex(index)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{symptom}</span>
                        <Plus className={`h-4 w-4 transition-colors flex-shrink-0 ${index === focusedIndex ? 'text-teal-200' : 'text-slate-400'}`} />
                      </div>
                    </button>
                  </li>
                ))}
                {canAddCustom && (
                  <li role="option" aria-selected={focusedIndex === filteredSymptoms.length}>
                    <button
                      onClick={() => handleSymptomSelect(trimmedSearchTerm, true)}
                      className={`w-full text-left px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-150 text-sm ${filteredSymptoms.length > 0 ? 'border-t border-slate-700' : ''} ${focusedIndex === filteredSymptoms.length ? 'bg-green-600/70 text-white' : 'hover:bg-green-700/60 text-slate-200'
                        }`}
                      onMouseEnter={() => setFocusedIndex(filteredSymptoms.length)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Add: "<em>{trimmedSearchTerm}</em>"</span>
                        <Plus className={`h-4 w-4 transition-colors flex-shrink-0 ${focusedIndex === filteredSymptoms.length ? 'text-green-200' : 'text-slate-400'}`} />
                      </div>
                    </button>
                  </li>
                )}
                {filteredSymptoms.length === 0 && !canAddCustom && trimmedSearchTerm.length > 0 && (
                  <li className="p-3 py-2.5 sm:px-4 sm:py-3 text-center text-slate-400 text-sm">
                    No matches found or already selected.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-semibold text-slate-300">Selected Symptoms</label>
              {initialSymptoms.length > 0 && (
                <button onClick={() => onSymptomsChange([])} className="text-xs sm:text-sm text-slate-400 hover:text-red-400 transition-colors duration-200 font-medium">Clear All</button>
              )}
            </div>
            
            <div className="min-h-[100px] sm:min-h-[120px] p-4 sm:p-6 bg-slate-700/30 rounded-lg sm:rounded-xl border-2 border-dashed border-slate-600">
              {initialSymptoms.length > 0 ? (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {initialSymptoms.map((symptom) => (
                    <div key={symptom} className="group inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-700/60 rounded-full border-2 border-teal-700/50 shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-500/70">
                      <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-teal-400 mr-1.5 sm:mr-2 flex-shrink-0" />
                      <span className="text-slate-100 font-medium text-xs sm:text-sm truncate">{symptom}</span>
                      <button onClick={() => handleSymptomRemove(symptom)} className="ml-1.5 sm:ml-2 p-0.5 sm:p-1 hover:bg-red-700/30 rounded-full transition-colors duration-200 group-hover:bg-red-600/40" aria-label={`Remove ${symptom}`}>
                        <X className="h-3 w-3 sm:h-3.5 text-slate-400 hover:text-red-300" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-6 sm:py-8">
                  <div className="bg-slate-700 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                    <Search className="h-6 w-6 sm:h-8 sm:w-8 text-slate-500" />
                  </div>
                  <p className="text-slate-400 font-medium text-sm sm:text-base">No symptoms selected</p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Use search to find and add symptoms</p>
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default SymptomsSelector;