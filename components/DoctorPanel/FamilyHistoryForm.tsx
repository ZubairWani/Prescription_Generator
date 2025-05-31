"use client";

import React, { useState, useMemo } from 'react';
import { IFamilyHistory, ICommonDisease } from '@/types/prescription'; // Ensure this path is correct
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import {
    X,
    Plus,
    Trash2,
    UserPlus,
    FileText,
    Users,
    AlertCircle as AlertCircleIcon,
    Info,
    Dna,
    Activity, // Default/fallback icon
    Stethoscope,
    ScrollText,
    Edit2,
    Save,
    Search,
    Check,
    ChevronsUpDown,
    Filter,
    Heart // Example for cardiovascular, ensure all icons used in diseaseOptions are imported
} from 'lucide-react';
import { diseaseOptions } from '@/data/diseases'; // CRITICAL: Ensure this file has correct data

interface FamilyHistoryFormProps {
    familyHistory: IFamilyHistory;
    setFamilyHistory: (familyHistory: IFamilyHistory) => void;
}

const initialNewDisease: Omit<ICommonDisease, 'id'> = { diseaseName: "", inheritance: "", details: "" };

// Updated relationOptions with teal/emerald theme accents where appropriate
const relationOptions = [
    { value: "Father", label: "Father", icon: <Users className="h-4 w-4 text-teal-400" /> },
    { value: "Mother", label: "Mother", icon: <Users className="h-4 w-4 text-pink-400" /> }, // Pink is fine for gender distinction
    { value: "Sibling", label: "Sibling", icon: <Users className="h-4 w-4 text-emerald-400" /> },
    { value: "Grandparent_Paternal", label: "Grandparent (Paternal)", icon: <Users className="h-4 w-4 text-teal-300" /> },
    { value: "Grandparent_Maternal", label: "Grandparent (Maternal)", icon: <Users className="h-4 w-4 text-pink-300" /> },
    { value: "Aunt_Uncle_Paternal", label: "Aunt/Uncle (Paternal)", icon: <Users className="h-4 w-4 text-teal-300" /> },
    { value: "Aunt_Uncle_Maternal", label: "Aunt/Uncle (Maternal)", icon: <Users className="h-4 w-4 text-pink-300" /> },
    { value: "Child", label: "Child", icon: <Users className="h-4 w-4 text-yellow-400" /> }, // Yellow is fine for distinction
    { value: "Other", label: "Other", icon: <Users className="h-4 w-4 text-slate-400" /> },
];

// Enhanced Disease Selector Component - Themed
const DiseaseSelector = ({ value, onValueChange, placeholder = "Select Condition" }: {
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
}) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const allDiseases = useMemo(() => {
        if (!diseaseOptions || diseaseOptions.length === 0) return []; // Guard against empty/undefined diseaseOptions
        return diseaseOptions.flatMap(group =>
            (group.options || []).map(option => ({ // Guard against group.options being undefined
                ...option,
                category: group.label,
                categoryIcon: group.icon || <Activity className="h-4 w-4 text-slate-400"/> // Default icon
            }))
        );
    }, []); // Removed diseaseOptions from dependency array as it's an import, not state/prop

    const filteredDiseases = useMemo(() => {
        let filtered = allDiseases;
        if (selectedCategory !== "all") {
            filtered = filtered.filter(disease => disease.category === selectedCategory);
        }
        if (searchTerm) {
            filtered = filtered.filter(disease =>
                disease.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [allDiseases, searchTerm, selectedCategory]);

    const groupedFilteredDiseases = useMemo(() => {
        const groups: { [key: string]: typeof filteredDiseases } = {};
        filteredDiseases.forEach(disease => {
            const categoryKey = disease.category || "Uncategorized";
            if (!groups[categoryKey]) {
                groups[categoryKey] = [];
            }
            groups[categoryKey].push(disease);
        });
        return groups;
    }, [filteredDiseases]);

    const selectedDisease = allDiseases.find(disease => disease.value === value);
    const categories = useMemo(() => { // Memoize categories as well
      if (!diseaseOptions || diseaseOptions.length === 0) return [];
      return diseaseOptions.map(group => ({ label: group.label, icon: group.icon || <Activity className="h-3 w-3 text-slate-400" /> }));
    }, []); // Removed diseaseOptions from dependency array


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-slate-700/50 border-slate-600 hover:border-teal-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 min-h-[40px] text-sm text-slate-100"
                >
                    <div className="flex items-center gap-2 truncate">
                        {selectedDisease ? (
                            <>
                                {React.cloneElement(selectedDisease.categoryIcon || <Activity className="h-4 w-4 text-slate-400"/>, { className: "h-4 w-4" })}
                                <span className="truncate text-slate-100">{selectedDisease.label}</span>
                            </>
                        ) : (
                            <>
                                <Search className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-400">{placeholder}</span>
                            </>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-slate-400" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-slate-800 border-slate-700 text-slate-200" align="start">
                <Command className="w-full">
                    <div className="border-b border-slate-700 p-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
                            <CommandInput
                                placeholder="Search conditions..."
                                value={searchTerm}
                                onValueChange={setSearchTerm}
                                className="border-none focus:ring-0 p-0 h-auto text-sm flex-grow bg-transparent text-slate-100 placeholder-slate-400"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="h-7 w-auto text-xs bg-slate-700 border-slate-600 text-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                                    <SelectItem value="all" className="text-xs focus:bg-slate-700 data-[highlighted]:bg-slate-700 data-[highlighted]:text-slate-100">
                                        <div className="flex items-center gap-1">
                                            <Activity className="h-3 w-3 text-slate-400" /> All
                                        </div>
                                    </SelectItem>
                                    {categories.map(category => (
                                        <SelectItem key={category.label} value={category.label} className="text-xs focus:bg-slate-700 data-[highlighted]:bg-slate-700 data-[highlighted]:text-slate-100">
                                            <div className="flex items-center gap-1">
                                                {React.cloneElement(category.icon || <Activity className="h-3 w-3 text-slate-400" />, { className: "h-3 w-3" })}
                                                {category.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <CommandList className="max-h-64 sm:max-h-80">
                        <CommandEmpty className="py-6 text-center text-sm text-slate-400">
                            <div className="flex flex-col items-center gap-2">
                                <Search className="h-8 w-8 text-slate-500" />
                                <div>
                                    <p>No conditions found.</p>
                                    <p className="text-xs text-slate-500 mt-1">Check `diseaseOptions` data or adjust search/filter.</p>
                                </div>
                            </div>
                        </CommandEmpty>
                        {Object.entries(groupedFilteredDiseases).map(([categoryName, diseases]) => {
                            const categoryInfo = categories.find(c => c.label === categoryName);
                            return (
                                <CommandGroup key={categoryName} heading={
                                    <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-slate-300 bg-slate-700/50 sticky top-0 z-10">
                                        {categoryInfo?.icon ? React.cloneElement(categoryInfo.icon, { className: "h-3 w-3" }) : <Activity className="h-3 w-3 text-slate-400" />}
                                        {categoryName}
                                        <Badge variant="secondary" className="ml-auto text-xs h-4 px-1.5 bg-slate-600 text-slate-200">{diseases.length}</Badge>
                                    </div>
                                }>
                                    {diseases.map((disease) => (
                                        <CommandItem
                                            key={disease.value}
                                            value={disease.value} // Used by Command for internal matching
                                            onSelect={() => {
                                                onValueChange(disease.value === value ? "" : disease.value);
                                                setOpen(false);
                                                setSearchTerm(""); // Clear search term after selection
                                                // setSelectedCategory("all"); // Optionally reset category filter
                                            }}
                                            className="px-3 py-2 text-sm hover:bg-teal-600/30 cursor-pointer data-[selected]:bg-teal-600/40"
                                        >
                                            <div className="flex items-center gap-2 flex-1">
                                                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                                                    {value === disease.value ?
                                                        <Check className="h-4 w-4 text-teal-400" /> :
                                                        <div className="w-4 h-4" /> // Placeholder for alignment
                                                    }
                                                </div>
                                                <span className={`flex-1 truncate ${value === disease.value ? 'text-teal-300 font-medium' : 'text-slate-200'}`}>
                                                    {disease.label}
                                                </span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            );
                        })}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};


export function FamilyHistoryForm({ familyHistory, setFamilyHistory }: FamilyHistoryFormProps) {
    const [currentDiseaseEntry, setCurrentDiseaseEntry] = useState<Omit<ICommonDisease, 'id'>>(initialNewDisease);
    const [editingDiseaseId, setEditingDiseaseId] = useState<string | null>(null);
    const [showHelp, setShowHelp] = useState(false);

    const handleInputChange = (field: keyof Omit<ICommonDisease, 'id'>, value: string) => {
        setCurrentDiseaseEntry(prev => ({ ...prev, [field]: value }));
    };

    const handleSelectChange = (field: 'diseaseName' | 'inheritance', value: string) => {
        setCurrentDiseaseEntry(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveOrUpdateDisease = () => {
        if (!currentDiseaseEntry.diseaseName || !currentDiseaseEntry.inheritance) {
            alert("Disease/Condition and Family Relation are required.");
            return;
        }
        if (editingDiseaseId) {
            const updatedDiseases = familyHistory.commonDiseases.map(d =>
                d.id === editingDiseaseId ? { ...currentDiseaseEntry, id: editingDiseaseId } : d
            );
            setFamilyHistory({ ...familyHistory, commonDiseases: updatedDiseases });
        } else {
            const newDiseaseWithId: ICommonDisease = { ...currentDiseaseEntry, id: Date.now().toString() + Math.random().toString(36).substring(2, 7) }; // More unique ID
            setFamilyHistory({ ...familyHistory, commonDiseases: [...familyHistory.commonDiseases, newDiseaseWithId] });
        }
        resetForm();
    };

    const handleEditDisease = (disease: ICommonDisease) => {
        setEditingDiseaseId(disease.id);
        const { id, ...diseaseData } = disease; // eslint-disable-line @typescript-eslint/no-unused-vars
        setCurrentDiseaseEntry(diseaseData);
    };

    const handleRemoveDisease = (idToRemove: string) => {
        const updatedDiseases = familyHistory.commonDiseases.filter(d => d.id !== idToRemove);
        setFamilyHistory({ ...familyHistory, commonDiseases: updatedDiseases });
        if (editingDiseaseId === idToRemove) resetForm();
    };

    const resetForm = () => {
        setCurrentDiseaseEntry(initialNewDisease);
        setEditingDiseaseId(null);
    };

    const getDiseaseInfo = (diseaseValue: string) => {
        // Assuming allDiseases is flat and contains categoryIcon
        const flatDiseaseOptions = diseaseOptions.flatMap(g => g.options.map(o => ({...o, icon: g.icon || <Activity className="h-4 w-4 text-slate-400" /> })));
        const disease = flatDiseaseOptions.find(o => o.value === diseaseValue);
        return { label: disease?.label || diseaseValue, icon: disease?.icon || <Activity className="h-4 w-4 text-slate-400" /> };
    };

    const getRelationIcon = (relationValue: string) => {
        const relation = relationOptions.find(r => r.value === relationValue);
        return relation?.icon || <Users className="h-4 w-4 text-slate-400" />;
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Dna className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400 flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-100">FAMILY MEDICAL HISTORY</h3>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="p-1 h-8 w-8 sm:h-9 sm:w-9 text-teal-400 hover:text-teal-300 hover:bg-slate-700/50" onClick={() => setShowHelp(!showHelp)} aria-expanded={showHelp} aria-controls="family-history-help">
                                <Info className="h-4 w-4 sm:h-5 sm:w-5" /> <span className="sr-only">More info</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs sm:max-w-sm p-3 bg-slate-800 border-slate-700"><p className="text-xs text-slate-300">Family medical history helps identify genetic predisposition. Include first-degree relatives (parents, siblings) for most accurate assessment.</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {showHelp && (
                <div id="family-history-help" className="rounded-md bg-teal-900/30 p-3 sm:p-4 text-sm text-teal-200 border border-teal-700/50">
                    <div className="flex">
                        <div className="flex-shrink-0"><AlertCircleIcon className="h-5 w-5 text-teal-400" aria-hidden="true" /></div>
                        <div className="ml-3">
                            <h3 className="font-medium text-sm sm:text-base text-teal-300">Why is family history important?</h3>
                            <div className="mt-2 text-xs sm:text-sm text-teal-300/90"><p>Genetic factors can significantly influence susceptibility. Adding family medical history helps identify potential risk factors for personalized care.</p></div>
                        </div>
                        <div className="ml-auto pl-3"><div className="-mx-1.5 -my-1.5"><Button variant="ghost" size="sm" className="inline-flex rounded-md p-1.5 text-teal-300 hover:bg-teal-700/40" onClick={() => setShowHelp(false)} aria-label="Close help message"><X className="h-4 w-4" /></Button></div></div>
                    </div>
                </div>
            )}

            {familyHistory.commonDiseases.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm sm:text-base font-medium text-slate-200 flex items-center gap-2"><ScrollText className="h-4 w-4 text-teal-400 flex-shrink-0" />Recorded Conditions</h4>
                        <Badge className="bg-teal-700/40 text-teal-200 hover:bg-teal-600/50 border-teal-600 text-xs">{familyHistory.commonDiseases.length} {familyHistory.commonDiseases.length === 1 ? 'Entry' : 'Entries'}</Badge>
                    </div>
                    {familyHistory.commonDiseases.map((disease) => {
                        const diseaseInfo = getDiseaseInfo(disease.diseaseName);
                        const relationIcon = getRelationIcon(disease.inheritance);
                        return (
                            <Card key={disease.id} className="bg-slate-700/30 border border-slate-600 shadow-sm hover:shadow-md hover:border-slate-500 transition-all overflow-hidden">
                                <CardContent className="p-3 sm:p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-start">
                                        <div className="flex items-start sm:items-center gap-2">
                                            <div className="flex-shrink-0 rounded-full bg-slate-600/50 p-1.5 mt-1 sm:mt-0">{React.cloneElement(diseaseInfo.icon, {className: "h-4 w-4"})}</div>
                                            <div><Label className="text-xs text-slate-400 block">Disease</Label><p className="text-sm font-medium text-slate-100 break-words">{diseaseInfo.label}</p></div>
                                        </div>
                                        <div className="flex items-start sm:items-center gap-2">
                                            <div className="flex-shrink-0 rounded-full bg-slate-600/50 p-1.5 mt-1 sm:mt-0">{React.cloneElement(relationIcon, {className: "h-4 w-4"})}</div>
                                            <div><Label className="text-xs text-slate-400 block">Relation</Label><p className="text-sm font-medium text-slate-100">{disease.inheritance}</p></div>
                                        </div>
                                        <div className="md:col-span-1"><Label className="text-xs text-slate-400 block">Details</Label><p className="text-sm text-slate-300 break-words">{disease.details || <span className="italic text-slate-500">No details</span>}</p></div>
                                    </div>
                                    <div className="mt-3 flex flex-col sm:flex-row justify-end gap-2">
                                        <Button variant="outline" size="sm" className="text-teal-300 border-teal-600 hover:bg-teal-600/20 hover:text-teal-200 hover:border-teal-500 w-full sm:w-auto text-xs sm:text-sm" onClick={() => handleEditDisease(disease)}><Edit2 className="h-3.5 w-3.5 mr-1" /> Edit</Button>
                                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-600/20 w-full sm:w-auto text-xs sm:text-sm" onClick={() => handleRemoveDisease(disease.id)}><Trash2 className="h-3.5 w-3.5 mr-1" /> Remove</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            <Card className="border border-teal-700/40 shadow-sm overflow-hidden bg-slate-700/20">
                <CardHeader className="bg-gradient-to-r from-teal-700/30 to-transparent py-3 sm:py-4 px-3 sm:px-4 border-b border-slate-600">
                    <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2 text-slate-100">
                        {editingDiseaseId ? <Edit2 className="h-4 w-4 text-teal-400 flex-shrink-0" /> : <UserPlus className="h-4 w-4 text-teal-400 flex-shrink-0" />}
                        {editingDiseaseId ? "Edit Condition" : "Add Condition"}
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs sm:text-sm">{editingDiseaseId ? "Update details." : "Record hereditary conditions."}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div>
                            <Label htmlFor="diseaseName" className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1 mb-1">Disease/Condition <span className="text-red-400">*</span></Label>
                            <DiseaseSelector value={currentDiseaseEntry.diseaseName} onValueChange={(value) => handleSelectChange('diseaseName', value)} placeholder="Select condition" />
                        </div>
                        <div>
                            <Label htmlFor="inheritance" className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1 mb-1">Family Relation <span className="text-red-400">*</span></Label>
                            <Select value={currentDiseaseEntry.inheritance} onValueChange={(value) => handleSelectChange('inheritance', value)}>
                                <SelectTrigger id="inheritance" className="w-full bg-slate-700/50 border-slate-600 text-slate-100 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 min-h-[40px] text-sm">
                                    <SelectValue placeholder="Select Relation" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                                    {relationOptions.map(option => (<SelectItem key={option.value} value={option.value} className="text-sm focus:bg-slate-700 data-[highlighted]:bg-slate-700 data-[highlighted]:text-slate-100"><div className="flex items-center gap-2">{React.cloneElement(option.icon, {className: "h-4 w-4"})} {option.label}</div></SelectItem>))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                            <Label htmlFor="details" className="text-xs sm:text-sm font-medium text-slate-300 mb-1 block">Additional Details</Label>
                            <div className="relative">
                                <Input id="details" placeholder="Age of onset, severity, etc." value={currentDiseaseEntry.details || ""} onChange={(e) => handleInputChange('details', e.target.value)}
                                       className="pl-8 bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 min-h-[40px] text-sm" />
                                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"><FileText className="h-4 w-4 text-slate-400" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 mt-3 sm:mt-4">
                        <Button onClick={handleSaveOrUpdateDisease} disabled={!currentDiseaseEntry.diseaseName || !currentDiseaseEntry.inheritance} className={`w-full sm:w-auto text-sm sm:text-base ${editingDiseaseId ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700' : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700'} text-white`}>
                            {editingDiseaseId ? <Save className="h-4 w-4 mr-1.5" /> : <Plus className="h-4 w-4 mr-1.5" />}
                            {editingDiseaseId ? "Update Entry" : "Save Entry"}
                        </Button>
                        {editingDiseaseId && (<Button variant="outline" onClick={resetForm} className="border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:border-slate-500 w-full sm:w-auto text-sm sm:text-base"><X className="h-4 w-4 mr-1.5" /> Cancel Edit</Button>)}
                    </div>
                </CardContent>
            </Card>

            <div className="bg-slate-700/20 p-3 sm:p-4 rounded-lg border border-slate-600 shadow-sm">
                <div className="flex items-center justify-between mb-2 gap-2">
                    <Label htmlFor="familyHistoryNotes" className="text-base sm:text-lg font-semibold flex items-center gap-2 text-slate-100"><Stethoscope className="h-5 w-5 text-teal-400 flex-shrink-0" />Family History Notes</Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild><div className="text-teal-400 cursor-help"><AlertCircleIcon className="h-4 w-4" /></div></TooltipTrigger>
                            <TooltipContent className="max-w-xs p-3 bg-slate-800 border-slate-700 text-slate-300"><p className="text-xs">Include any additional relevant family medical history information.</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Textarea id="familyHistoryNotes" name="familyHistoryNotes" value={familyHistory.familyHistoryNotes} onChange={(e) => setFamilyHistory({ ...familyHistory, familyHistoryNotes: e.target.value })}
                          placeholder="Enter additional family history notes..." rows={3}
                          className="resize-none bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 text-sm" />
            </div>
        </div>
    );
}