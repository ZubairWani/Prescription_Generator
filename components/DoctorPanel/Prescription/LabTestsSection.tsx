"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FlaskConical, Search, X, ChevronDown, Plus } from 'lucide-react';

// Predefined lab tests (keep this array as is)
const predefinedTests = [
    // Blood Tests
    'Complete Blood Count (CBC)',
    'Basic Metabolic Panel (BMP)',
    'Comprehensive Metabolic Panel (CMP)',
    'Lipid Panel',
    'Liver Function Tests (LFTs)',
    'Thyroid Function Tests (TSH, T3, T4)',
    'Hemoglobin A1C',
    'Fasting Blood Glucose',
    'Blood Urea Nitrogen (BUN)',
    'Creatinine',
    'Electrolyte Panel',
    'Coagulation Studies (PT/PTT/INR)',
    'D-Dimer',
    'Troponin',
    'BNP/NT-proBNP',
    'CRP (C-Reactive Protein)',
    'ESR (Erythrocyte Sedimentation Rate)',
    'Procalcitonin',
    'Vitamin D',
    'Vitamin B12',
    'Folate',
    'Iron Studies',
    'PSA (Prostate Specific Antigen)',

    // Cardiac Tests
    'ECG/EKG',
    'Echocardiogram',
    'Stress Test',
    'Holter Monitor',
    'Cardiac Catheterization',

    // Imaging Studies
    'Chest X-Ray',
    'CT Scan - Head',
    'CT Scan - Chest',
    'CT Scan - Abdomen/Pelvis',
    'MRI - Brain',
    'MRI - Spine',
    'MRI - Knee',
    'MRI - Shoulder',
    'Ultrasound - Abdominal',
    'Ultrasound - Pelvic',
    'Ultrasound - Carotid',
    'Mammography',
    'DEXA Scan',
    'PET Scan',
    'Nuclear Stress Test',

    // Specialized Tests
    'Colonoscopy',
    'Upper Endoscopy',
    'Pulmonary Function Tests',
    'Sleep Study',
    'Bone Marrow Biopsy',
    'Skin Biopsy',
    'Lumbar Puncture',
    'Arthroscopy',

    // Urine Tests
    'Urinalysis',
    'Urine Culture',
    '24-Hour Urine Collection',

    // Microbiology
    'Blood Culture',
    'Sputum Culture',
    'Wound Culture',
    'Stool Culture',
    'Hepatitis Panel',
    'HIV Test',
    'STD Panel'
];


interface LabTestsSectionProps {
  initialLabTests: string[];
  onLabTestsChange: (updatedTests: string[]) => void;
}

const LabTestsSection = ({ initialLabTests, onLabTestsChange }: LabTestsSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customTest, setCustomTest] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredTests = predefinedTests.filter(test =>
    test.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !initialLabTests.includes(test)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTestSelect = (test: string) => {
    if (!initialLabTests.includes(test)) {
      const newSelectedTests = [...initialLabTests, test];
      onLabTestsChange(newSelectedTests);
    }
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const handleTestRemove = (testToRemove: string) => {
    const newSelectedTests = initialLabTests.filter(test => test !== testToRemove);
    onLabTestsChange(newSelectedTests);
  };

  const handleCustomTestAdd = () => {
    const trimmedCustomTest = customTest.trim();
    if (trimmedCustomTest && !initialLabTests.includes(trimmedCustomTest)) {
      const newSelectedTests = [...initialLabTests, trimmedCustomTest];
      onLabTestsChange(newSelectedTests);
      setCustomTest('');
    } else if (trimmedCustomTest && initialLabTests.includes(trimmedCustomTest)) {
      setCustomTest(''); // Clear if already added, though UI doesn't explicitly show error
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTests.length > 0) {
        handleTestSelect(filteredTests[0]);
      } else if (searchQuery.trim() && !initialLabTests.includes(searchQuery.trim()) && !predefinedTests.some(pt => pt.toLowerCase() === searchQuery.trim().toLowerCase())) {
        const newSelectedTests = [...initialLabTests, searchQuery.trim()];
        onLabTestsChange(newSelectedTests);
        setSearchQuery('');
        setIsDropdownOpen(false);
      }
    }
  };

  const handleCustomKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomTestAdd();
    }
  };

  return (
    <section className="bg-slate-800/40 p-4 sm:p-6 rounded-xl border border-slate-700/70 shadow-md">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <label className="text-lg sm:text-xl font-semibold flex items-center text-slate-100">
          <FlaskConical className="h-5 w-5 mr-2.5 text-teal-400" />
          MEDICAL LAB TESTS / IMAGING SUGGESTED
        </label>
      </div>

      {/* Search and Dropdown Section */}
      <div className="mb-4 sm:mb-5" ref={dropdownRef}>
        <div className="relative">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(e.target.value.length > 0 || filteredTests.length > 0);
                }}
                onFocus={() => setIsDropdownOpen(searchQuery.length > 0 || filteredTests.length > 0)}
                onKeyDown={handleSearchKeyPress}
                placeholder="Search for lab tests or imaging..."
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 rounded-lg sm:rounded-xl focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
                aria-label="Toggle dropdown"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (searchQuery.length > 0 || filteredTests.length > 0) && (
            <div className="absolute z-10 w-full mt-1.5 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <div
                    key={test}
                    onClick={() => handleTestSelect(test)}
                    className="px-3 py-2 hover:bg-teal-600/30 cursor-pointer text-sm text-slate-200 border-b border-slate-700 last:border-b-0"
                  >
                    {test}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-slate-400 text-sm">
                  {searchQuery ? 'No tests found for "' + searchQuery + '"' : 'Start typing to search...'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Custom Test Input */}
      <div className="mb-4 sm:mb-5">
        <label htmlFor="customLabTest" className="block text-sm font-medium text-slate-300 mb-1.5">Add Custom Test:</label>
        <div className="flex gap-2">
          <input
            id="customLabTest"
            type="text"
            value={customTest}
            onChange={(e) => setCustomTest(e.target.value)}
            onKeyDown={handleCustomKeyPress}
            placeholder="Type custom test and press Enter or click Add"
            className="flex-1 px-3 py-2.5 sm:py-3 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 rounded-lg sm:rounded-xl focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 outline-none text-sm"
          />
          <button
            type="button"
            onClick={handleCustomTestAdd}
            disabled={!customTest.trim()}
            className="px-4 py-2.5 sm:py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed flex items-center gap-1 text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {/* Selected Tests Tags */}
      {initialLabTests.length > 0 && (
        <div className="mb-4 sm:mb-5">
          <h4 className="text-sm font-medium text-slate-300 mb-2">Selected Tests ({initialLabTests.length}):</h4>
          <div className="flex flex-wrap gap-2">
            {initialLabTests.map((test) => (
              <span
                key={test}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-teal-700/40 text-teal-200 border border-teal-600/50 shadow-sm"
              >
                {test}
                <button
                  type="button"
                  onClick={() => handleTestRemove(test)}
                  className="ml-2 hover:bg-teal-500/30 rounded-full p-0.5"
                  aria-label={`Remove ${test}`}
                >
                  <X className="h-3 w-3 text-teal-200" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Clear All Button */}
      {initialLabTests.length > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onLabTestsChange([])}
            className="px-4 py-2 text-sm bg-slate-600/70 text-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-500/70 border border-slate-500 font-medium transition-colors"
          >
            Clear All Tests
          </button>
        </div>
      )}
    </section>
  );
};

export default LabTestsSection;