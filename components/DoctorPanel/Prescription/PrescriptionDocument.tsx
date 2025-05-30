// "use client";

// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Svg,
//   Path,
//   Circle,
//   Rect,
//   Line,
// } from "@react-pdf/renderer";

// import {
//   IPrescriptionFormData,
//   IMedication,
//   // IFamilyHistory, // IFamilyHistory from types is { commonDiseases: string[], familyHistoryNotes: string }
//   // ICommonDisease, // ICommonDisease is not directly used here as commonDiseases is string[]
// } from "@/types/prescription"; // Assuming this path is correct

// const FONT_FAMILY_REGULAR = "Helvetica";
// const FONT_FAMILY_BOLD = "Helvetica-Bold";

// // Template Types
// export type PrescriptionTemplate =
//   | "dental"
//   | "orthopedic"
//   | "modern"
//   | "classic"
//   | "professional";

// // Custom SVG Icons (retained as is)
// const MedicalIcon = () => (
//   <Svg width="12" height="12" viewBox="0 0 24 24">
//     <Path
//       d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
//       fill="#2563eb"
//     />
//   </Svg>
// );

// const UserIcon = () => (
//   <Svg width="12" height="12" viewBox="0 0 24 24">
//     <Circle cx="12" cy="8" r="4" fill="#059669" />
//     <Path d="M20 20c0-4.4-3.6-8-8-8s-8 3.6-8 8" fill="#059669" />
//   </Svg>
// );

// const PillIcon = () => (
//   <Svg width="12" height="12" viewBox="0 0 24 24">
//     <Path
//       d="M4.22 11.29l6.36-6.36a4 4 0 015.66 5.66l-6.36 6.36a4 4 0 01-5.66-5.66z"
//       fill="#dc2626"
//     />
//     <Path d="M8.12 15.19l6.36-6.36" stroke="#ffffff" strokeWidth="1" />
//   </Svg>
// );

// const SymptomIcon = () => (
//   <Svg width="12" height="12" viewBox="0 0 24 24">
//     <Circle cx="12" cy="12" r="10" fill="#f59e0b" />
//     <Path
//       d="M12 8v4M12 16h.01"
//       stroke="#ffffff"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//   </Svg>
// );

// const DiagnosisIcon = () => (
//   <Svg width="12" height="12" viewBox="0 0 24 24">
//     <Path
//       d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
//       stroke="#10b981"
//       strokeWidth="2"
//       fill="none"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// const CalendarIcon = () => (
//   <Svg width="12" height="12" viewBox="0 0 24 24">
//     <Rect
//       x="3"
//       y="4"
//       width="18"
//       height="18"
//       rx="2"
//       ry="2"
//       stroke="#6366f1"
//       strokeWidth="2"
//       fill="none"
//     />
//     <Line x1="16" y1="2" x2="16" y2="6" stroke="#6366f1" strokeWidth="2" />
//     <Line x1="8" y1="2" x2="8" y2="6" stroke="#6366f1" strokeWidth="2" />
//     <Line x1="3" y1="10" x2="21" y2="10" stroke="#6366f1" strokeWidth="2" />
//   </Svg>
// );

// const TestIcon = () => (
//   <Svg width="12" height="12" viewBox="0 0 24 24">
//     <Path
//       d="M9 11H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-2M9 11V9a2 2 0 112 0v2M9 11h6"
//       stroke="#8b5cf6"
//       strokeWidth="1.5"
//       fill="none"
//     />
//   </Svg>
// );

// const HistoryIcon = () => (
//   <Svg width="12" height="12" viewBox="0 0 24 24">
//     <Circle
//       cx="12"
//       cy="12"
//       r="10"
//       stroke="#ef4444"
//       strokeWidth="1.5"
//       fill="none"
//     />
//     <Path
//       d="M12 6v6l4 2"
//       stroke="#ef4444"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//     />
//   </Svg>
// );

// const NotesIcon = () => ( // Added an icon for notes/history if needed
//   <Svg width="12" height="12" viewBox="0 0 24 24">
//     <Path d="M3 7h18M3 12h18M3 17h12" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" />
//   </Svg>
// );

// // Template-specific icons (retained as is)
// const ToothIcon = () => ( <Svg width="16" height="16" viewBox="0 0 24 24"><Path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1s1-.45 1-1v-1.5c.31.09.64.15 1 .15s.69-.06 1-.15V17c0 .55.45 1 1 1s1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" fill="#0ea5e9" /></Svg>);
// const StethoscopeIcon = () => ( <Svg width="16" height="16" viewBox="0 0 24 24"><Path d="M19 14c1.49 0 3 1.51 3 3s-1.51 3-3 3-3-1.51-3-3 1.51-3 3-3m0 2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1m-8 0c0-1.5.5-2.9 1.3-4l-2.6-5.2c-.2-.4-.1-.9.2-1.2.4-.2.9-.1 1.2.2L13 9.5c.9-.3 1.9-.3 2.8 0l2.9-2.7c.3-.3.8-.4 1.2-.2.3.3.4.8.2 1.2L17.7 13c.8 1.1 1.3 2.5 1.3 4 0 3.9-3.1 7-7 7s-7-3.1-7-7z" fill="#10b981" /></Svg>);
// const CaduceusIcon = () => ( <Svg width="16" height="16" viewBox="0 0 24 24"><Path d="M12 2L12 22M8 6L16 6M8 18L16 18M6 10C6 8 8 8 8 10C8 12 6 12 6 10M18 10C18 8 16 8 16 10C16 12 18 12 18 10M6 14C6 16 8 16 8 14C8 12 6 12 6 14M18 14C18 16 16 16 16 14C16 12 18 12 18 14" stroke="#0ea5e9" strokeWidth="1.5" fill="none" /></Svg>);
// const HeartbeatIcon = () => ( <Svg width="16" height="16" viewBox="0 0 24 24"><Path d="M2 12H5L7 8L10 16L12 12H15L17 8L20 16L22 12" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></Svg>);
// const BoneIcon = () => ( <Svg width="16" height="16" viewBox="0 0 24 24"><Path d="M17 6C17.55 6 18 5.55 18 5S17.55 4 17 4 16 4.45 16 5 16.45 6 17 6M7 6C7.55 6 8 5.55 8 5S7.55 4 7 4 6 4.45 6 5 6.45 6 7 6M17 20C17.55 20 18 19.55 18 19S17.55 18 17 18 16 18.45 16 19 16.45 20 17 20M7 20C7.55 20 8 19.55 8 19S7.55 18 7 18 6 18.45 6 19 6.45 20 7 20M8.5 12C8.5 11.17 7.83 10.5 7 10.5S5.5 11.17 5.5 12 6.17 13.5 7 13.5 8.5 12.83 8.5 12M18.5 12C18.5 11.17 17.83 10.5 17 10.5S15.5 11.17 15.5 12 16.17 13.5 17 13.5 18.5 12.83 18.5 12M7.5 6.5L16.5 17.5M16.5 6.5L7.5 17.5" stroke="#3b82f6" strokeWidth="1.5" /></Svg>);

// // Template Configurations (retained as is)
// const getTemplateConfig = (template: PrescriptionTemplate) => {
//   const configs = {
//     dental: { primaryColor: '#0ea5e9', secondaryColor: '#bae6fd', accentColor: '#0284c7', icon: <ToothIcon />, headerBg: '#0ea5e9', footerBg: '#0ea5e9', borderColor: '#0ea5e9', hasTopBorder: false, hasBottomBorder: true, gradientFooter: true },
//     orthopedic: { primaryColor: '#3b82f6', secondaryColor: '#dbeafe', accentColor: '#2563eb', icon: <BoneIcon />, headerBg: '#3b82f6', footerBg: '#3b82f6', borderColor: '#3b82f6', hasTopBorder: false, hasBottomBorder: true, gradientFooter: false },
//     modern: { primaryColor: '#10b981', secondaryColor: '#d1fae5', accentColor: '#059669', icon: <StethoscopeIcon />, headerBg: '#10b981', footerBg: '#10b981', borderColor: '#10b981', hasTopBorder: true, hasBottomBorder: true, gradientFooter: false },
//     classic: { primaryColor: '#0ea5e9', secondaryColor: '#e0f2fe', accentColor: '#0284c7', icon: <CaduceusIcon />, headerBg: '#0ea5e9', footerBg: '#0ea5e9', borderColor: '#0ea5e9', hasTopBorder: false, hasBottomBorder: true, gradientFooter: true },
//     professional: { primaryColor: '#0ea5e9', secondaryColor: '#e0f2fe', accentColor: '#0284c7', icon: <HeartbeatIcon />, headerBg: '#0ea5e9', footerBg: '#0ea5e9', borderColor: '#0ea5e9', hasTopBorder: true, hasBottomBorder: true, gradientFooter: true }
//   };
//   return configs[template];
// };

// // Dynamic Styles Function (retained, but with small adjustments if needed for new sections)
// const createDynamicStyles = (template: PrescriptionTemplate) => {
//   const config = getTemplateConfig(template);
//   // Styles (mostly retained, ensure section styles are generic enough)
//   return StyleSheet.create({
//     page: { fontFamily: FONT_FAMILY_REGULAR, fontSize: 10, paddingTop: 30, paddingLeft: 40, paddingRight: 40, paddingBottom: 40, lineHeight: 1.4, color: "#1f2937", backgroundColor: "#ffffff", },
//     headerContainer: { backgroundColor: "#ffffff", borderTopWidth: config.hasTopBorder ? 8 : 0, borderTopColor: config.headerBg, borderBottomWidth: 2, borderBottomColor: config.borderColor, paddingHorizontal: 20, paddingVertical: 20, marginBottom: 20, },
//     headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, },
//     leftHeaderSection: { flex: 1, paddingRight: 20, },
//     hospitalName: { fontSize: 20, fontFamily: FONT_FAMILY_BOLD, color: config.primaryColor, marginBottom: 4, letterSpacing: 0.5, },
//     hospitalSlogan: { fontSize: 10, color: "#6b7280", fontStyle: "italic", marginBottom: 8, },
//     doctorName: { fontSize: 14, fontFamily: FONT_FAMILY_BOLD, color: "#111827", },
//     doctorQualification: { fontSize: 10, color: "#6b7280", },
//     rightHeaderSection: { alignItems: 'flex-end', justifyContent: 'flex-start', },
//     headerIcon: { marginBottom: 8, },
//     patientInfoLine: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: "#e5e7eb", paddingTop: 12, marginTop: 12, },
//     patientInfoText: { fontSize: 9, color: "#374151", borderBottomWidth: 1, borderBottomColor: "#d1d5db", paddingBottom: 2, minWidth: 100, },
//     rxSymbol: { fontSize: 28, fontFamily: FONT_FAMILY_BOLD, color: config.accentColor, marginTop: 15, marginBottom: 5, },
//     contentContainer: { flex: 1, minHeight: 400, },
//     contentArea: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, minHeight: 350, padding: 15, backgroundColor: "#fafafa", },
//     footerContainer: { backgroundColor: config.hasBottomBorder ? config.footerBg : "#ffffff", borderTopWidth: config.hasBottomBorder ? 0 : 1, borderTopColor: "#e5e7eb", paddingVertical: config.hasBottomBorder ? 12 : 8, paddingHorizontal: 20, marginTop: 20, marginHorizontal: -40, marginBottom: -40, },
//     footerText: { fontSize: 8, color: config.hasBottomBorder ? "#ffffff" : "#6b7280", textAlign: "center", lineHeight: 1.3, },
//     addressText: { fontSize: 8, color: config.hasBottomBorder ? "#ffffff" : "#6b7280", textAlign: "center", marginBottom: 4, },
//     contactText: { fontSize: 8, color: config.hasBottomBorder ? "#ffffff" : "#6b7280", textAlign: "center", },
//     section: { marginBottom: 18, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, overflow: "hidden", },
//     sectionHeader: { flexDirection: "row", alignItems: "center", backgroundColor: "#f8fafc", paddingVertical: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#e5e7eb", },
//     sectionTitle: { fontSize: 11, fontFamily: FONT_FAMILY_BOLD, color: "#374151", marginLeft: 6, textTransform: "uppercase", letterSpacing: 0.3, },
//     sectionContent: { padding: 12, },
//     patientGrid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -4, },
//     patientField: { width: "33.333%", paddingHorizontal: 4, marginBottom: 12, },
//     patientFieldWide: { width: "50%", paddingHorizontal: 4, marginBottom: 12, },
//     fieldContainer: { backgroundColor: "#f9fafb", padding: 8, borderRadius: 6, borderLeftWidth: 3, borderLeftColor: config.primaryColor, },
//     fieldLabel: { fontFamily: FONT_FAMILY_BOLD, color: "#6b7280", fontSize: 8, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2, },
//     fieldValue: { color: "#111827", fontSize: 10, fontFamily: FONT_FAMILY_BOLD, },
//     badgeContainer: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -3, },
//     badge: { backgroundColor: "#fef3c7", color: "#92400e", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, fontSize: 9, fontFamily: FONT_FAMILY_BOLD, borderWidth: 1, borderColor: "#f59e0b", marginHorizontal: 3, marginVertical: 3, },
//     medicationTable: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, overflow: "hidden", },
//     tableHeader: { backgroundColor: "#374151", paddingVertical: 10, },
//     tableHeaderRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 8, },
//     tableHeaderText: { color: "#ffffff", fontFamily: FONT_FAMILY_BOLD, fontSize: 9, textAlign: "center", textTransform: "uppercase", letterSpacing: 0.5, },
//     tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#e5e7eb", minHeight: 40, alignItems: "center", paddingHorizontal: 8, paddingVertical: 6, },
//     tableRowAlt: { backgroundColor: "#f9fafb", },
//     tableCell: { fontSize: 9, color: "#374151", paddingHorizontal: 4, textAlign: "center", },
//     tableCellLeft: { textAlign: "left", },
//     tableCellBold: { fontFamily: FONT_FAMILY_BOLD, },
//     colMedicine: { width: "25%" }, colDosage: { width: "15%" }, colFrequency: { width: "20%" }, colDuration: { width: "15%" }, colInstructions: { width: "25%" },
//     diagnosisContainer: { backgroundColor: "#ecfdf5", padding: 12, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: "#10b981", },
//     diagnosisText: { fontSize: 12, color: "#111827", fontFamily: FONT_FAMILY_BOLD, lineHeight: 1.5, },
//     contentText: { fontSize: 10, color: "#374151", lineHeight: 1.6, backgroundColor: "#f8fafc", padding: 12, borderRadius: 6, borderLeftWidth: 3, borderLeftColor: config.primaryColor, },
//     notesText: { fontSize: 10, color: "#374151", lineHeight: 1.6, marginTop: 4}, // For family history notes
//     noData: { fontStyle: "italic", color: "#9ca3af", fontSize: 9, },
//   });
// };

// interface PrescriptionDocumentProps {
//   data: IPrescriptionFormData;
//   template?: PrescriptionTemplate;
//   doctorName?: string;
//   hospitalName?: string;
//   hospitalSlogan?: string;
//   doctorQualification?: string;
//   addressLine1?: string;
//   addressLine2?: string;
//   addressLine3?: string;
//   phone?: string;
//   email?: string;
//   website?: string;
//   prescriptionId?: string;
//   showDetailedView?: boolean;
// }

// const PrescriptionDocument: React.FC<PrescriptionDocumentProps> = ({
//   data,
//   template = "classic",
//   doctorName = "Dr Zubair wani",
//   hospitalName = "Tabeeb Medical Solutions",
//   hospitalSlogan = "Your Slogan",
//   doctorQualification = "Qualification",
//   addressLine1 = "Address Line 1",
//   addressLine2 = "Address Line 2",
//   addressLine3 = "Address Line 3",
//   phone = "0123456789",
//   email = "tabeeb@email.com",
//   website = "www.tabeeb.co.in",
//   prescriptionId,
//   showDetailedView = true, // Default to detailed view as per typical use case
// }) => {
//   const styles = createDynamicStyles(template);
//   const config = getTemplateConfig(template);

//   const generatePrescriptionId = () => {
//     return (
//       prescriptionId ||
//       `RX-${new Date().getFullYear()}-${Math.random()
//         .toString(36)
//         .substr(2, 8)
//         .toUpperCase()}`
//     );
//   };

//   const formatDate = (date: Date | string | undefined) => {
//     if (!date) return "N/A";
//     try {
//       return new Date(date).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//     } catch {
//       return "Invalid Date";
//     }
//   };

//   const renderTextOrNA = (text: string | number | undefined | null, defaultText = "Not specified") => {
//     if (text === undefined || text === null || text.toString().trim() === "") {
//       return <Text style={styles.noData}>{defaultText}</Text>;
//     }
//     return <Text style={styles.fieldValue}>{text.toString()}</Text>;
//   };

//   const renderStringOrNA = (text: string | number | undefined | null, defaultText = "Not specified") => {
//      if (text === undefined || text === null || text.toString().trim() === "") {
//       return defaultText;
//     }
//     return text.toString();
//   }

//   const calculateBMI = (weightStr?: string, heightStr?: string) => {
//     const weight = parseFloat(weightStr || "");
//     const height = parseFloat(heightStr || "");
//     if (isNaN(weight) || isNaN(height) || height === 0 || weight <=0 || height <=0) return null;
//     const heightInM = height / 100;
//     const bmi = weight / (heightInM * heightInM);
//     return bmi.toFixed(1);
//   };

//   const currentDate = new Date();

//   // Simple Template View (mostly for placeholder)
//   const renderSimpleTemplate = () => (
//     <Page size="A4" style={styles.page}>
//       <View style={styles.headerContainer}>
//         <View style={styles.headerTop}>
//           <View style={styles.leftHeaderSection}>
//             <Text style={styles.hospitalName}>{hospitalName}</Text>
//             <Text style={styles.hospitalSlogan}>{hospitalSlogan}</Text>
//             <Text style={styles.doctorName}>{doctorName}</Text>
//             <Text style={styles.doctorQualification}>{doctorQualification}</Text>
//           </View>
//           <View style={styles.rightHeaderSection}>
//             <View style={styles.headerIcon}>{config.icon}</View>
//           </View>
//         </View>
//         <View style={styles.patientInfoLine}>
//           <Text style={styles.patientInfoText}>Name: {renderStringOrNA(data.fullName, ".........................")}</Text>
//           <Text style={styles.patientInfoText}>Age: {data.age ? `${data.age}` : "......"}</Text>
//           <Text style={styles.patientInfoText}>Sex: {data.gender || "......"}</Text>
//           <Text style={styles.patientInfoText}>Date: {formatDate(currentDate)}</Text>
//         </View>
//       </View>
//       <Text style={styles.rxSymbol}>℞</Text>
//       <View style={styles.contentContainer}>
//         <View style={styles.contentArea}>
//            {/* This area is traditionally for handwritten prescriptions in a simple template */}
//            {/* Or could display a summary if needed */}
//         </View>
//       </View>
//       <View style={styles.footerContainer}>
//         <Text style={styles.addressText}>{addressLine1} | {addressLine2} | {addressLine3}</Text>
//         <Text style={styles.contactText}>Phone: {phone}, {email}, {website}</Text>
//       </View>
//     </Page>
//   );

//   // Detailed Template View
//   const renderDetailedTemplate = () => (
//     <Page size="A4" style={styles.page}>
//       <View style={styles.headerContainer}>
//         <View style={styles.headerTop}>
//           <View style={styles.leftHeaderSection}>
//             <Text style={styles.hospitalName}>{hospitalName}</Text>
//             <Text style={styles.hospitalSlogan}>{hospitalSlogan}</Text>
//           </View>
//           <View style={styles.rightHeaderSection}>
//             <View style={styles.headerIcon}>{config.icon}</View>
//           </View>
//         </View>
//         <View style={styles.patientInfoLine}>
//           <Text style={styles.patientInfoText}>Doctor: {doctorName}</Text>
//           <Text style={styles.patientInfoText}>Date: {formatDate(currentDate)}</Text>
//           <Text style={styles.patientInfoText}>ID: {generatePrescriptionId()}</Text>
//         </View>
//       </View>

//       <View style={styles.contentContainer}>
//         {/* Patient Information */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}><UserIcon /><Text style={styles.sectionTitle}>Patient Information</Text></View>
//           <View style={styles.sectionContent}>
//             <View style={styles.patientGrid}>
//               <View style={styles.patientFieldWide}><View style={styles.fieldContainer}><Text style={styles.fieldLabel}>Full Name</Text>{renderTextOrNA(data.fullName)}</View></View>
//               <View style={styles.patientField}><View style={styles.fieldContainer}><Text style={styles.fieldLabel}>Age</Text>{data.age ? renderTextOrNA(`${data.age} years`) : renderTextOrNA(null)}</View></View>
//               <View style={styles.patientField}><View style={styles.fieldContainer}><Text style={styles.fieldLabel}>Gender</Text>{renderTextOrNA(data.gender)}</View></View>
//             </View>
//           </View>
//         </View>

//         {/* Vital Signs from IPrescriptionFormData */}
//         {(data.height || data.weight) && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}><MedicalIcon /><Text style={styles.sectionTitle}>Vital Signs</Text></View>
//             <View style={styles.sectionContent}>
//               <View style={styles.patientGrid}>
//                 {data.height && (<View style={styles.patientField}><View style={styles.fieldContainer}><Text style={styles.fieldLabel}>Height</Text>{renderTextOrNA(`${data.height} cm`)}</View></View>)}
//                 {data.weight && (<View style={styles.patientField}><View style={styles.fieldContainer}><Text style={styles.fieldLabel}>Weight</Text>{renderTextOrNA(`${data.weight} kg`)}</View></View>)}
//                 {calculateBMI(data.weight, data.height) && (
//                   <View style={styles.patientField}><View style={styles.fieldContainer}><Text style={styles.fieldLabel}>BMI</Text>{renderTextOrNA(calculateBMI(data.weight, data.height))}</View></View>
//                 )}
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Patient History */}
//         {data.patientHistory && data.patientHistory.trim() && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}><NotesIcon /><Text style={styles.sectionTitle}>Patient History Notes</Text></View>
//             <View style={styles.sectionContent}><Text style={styles.contentText}>{data.patientHistory}</Text></View>
//           </View>
//         )}

//         {/* Family History */}
//         {/* {(data.familyHistory?.commonDiseases?.length > 0 || (data.familyHistory?.familyHistoryNotes && data.familyHistory.familyHistoryNotes.trim() !== "")) && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}><HistoryIcon /><Text style={styles.sectionTitle}>Family Medical History</Text></View>
//             <View style={styles.sectionContent}>
//               {data.familyHistory.commonDiseases && data.familyHistory.commonDiseases.length > 0 && (
//                 <>
//                   <Text style={styles.fieldLabel}>Common Diseases:</Text>
//                   <View style={styles.badgeContainer}>
//                     {data.familyHistory.commonDiseases.filter(d => d && d.trim()).map((disease, index) => (
//                       <Text key={`disease-${index}`} style={styles.badge}>{disease}</Text>
//                     ))}
//                   </View>
//                 </>
//               )}
//               {data.familyHistory.familyHistoryNotes && data.familyHistory.familyHistoryNotes.trim() && (
//                  <>
//                   <Text style={[styles.fieldLabel, {marginTop: data.familyHistory.commonDiseases?.length > 0 ? 8 : 0 }]}>Notes:</Text>
//                   <Text style={styles.notesText}>{data.familyHistory.familyHistoryNotes}</Text>
//                  </>
//               )}
//             </View>
//           </View>
//         )} */}

//           {/* Family History */}
//         {(data.familyHistory?.commonDiseases?.length > 0 || (data.familyHistory?.familyHistoryNotes && data.familyHistory.familyHistoryNotes.trim() !== "")) && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}><HistoryIcon /><Text style={styles.sectionTitle}>Family Medical History</Text></View>
//             <View style={styles.sectionContent}>
//               {data.familyHistory.commonDiseases && data.familyHistory.commonDiseases.length > 0 && (
//                 <>
//                   <Text style={styles.fieldLabel}>Common Diseases:</Text>
//                   <View style={styles.badgeContainer}>
//                     {data.familyHistory.commonDiseases
//                       .filter(d => typeof d === 'string' && d.trim() !== "") // <-- CORRECTED LINE
//                       .map((disease, index) => (
//                         <Text key={`disease-${index}`} style={styles.badge}>{disease}</Text>
//                       ))}
//                   </View>
//                 </>
//               )}
//               {data.familyHistory.familyHistoryNotes && data.familyHistory.familyHistoryNotes.trim() && (
//                  <>
//                   <Text style={[styles.fieldLabel, {marginTop: (data.familyHistory.commonDiseases?.filter(d => typeof d === 'string' && d.trim() !== "").length > 0) ? 8 : 0 }]}>Notes:</Text>
//                   {/* Also ensure notesText is styled correctly */}
//                   <Text style={styles.notesText}>{data.familyHistory.familyHistoryNotes}</Text>
//                  </>
//               )}
//             </View>
//           </View>
//         )}

//         {/* Symptoms */}
//         {data.symptoms && data.symptoms.filter(s => s && s.trim()).length > 0 && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}><SymptomIcon /><Text style={styles.sectionTitle}>Reported Symptoms</Text></View>
//             <View style={styles.sectionContent}>
//               <View style={styles.badgeContainer}>
//                 {data.symptoms.filter(s => s && s.trim()).map((symptom, index) => (
//                   <Text key={`symptom-${index}`} style={styles.badge}>{symptom}</Text>
//                 ))}
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Diagnosis */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}><DiagnosisIcon /><Text style={styles.sectionTitle}>Clinical Diagnosis</Text></View>
//           <View style={styles.sectionContent}>
//             <View style={styles.diagnosisContainer}>
//               {data.diagnosis && data.diagnosis.trim() ? <Text style={styles.diagnosisText}>{data.diagnosis}</Text> : <Text style={styles.noData}>No diagnosis provided.</Text>}
//             </View>
//           </View>
//         </View>

//         {/* Medications */}
//         {data.medicationList && data.medicationList.filter(m => m?.name?.trim()).length > 0 && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}><PillIcon /><Text style={styles.sectionTitle}>Prescribed Medications</Text></View>
//             <View style={styles.sectionContent}>
//               <View style={styles.medicationTable}>
//                 <View style={styles.tableHeader}><View style={styles.tableHeaderRow}>
//                     <Text style={[styles.tableHeaderText, styles.colMedicine]}>Medicine</Text>
//                     <Text style={[styles.tableHeaderText, styles.colDosage]}>Dosage</Text>
//                     <Text style={[styles.tableHeaderText, styles.colFrequency]}>Frequency</Text>
//                     <Text style={[styles.tableHeaderText, styles.colDuration]}>Duration</Text>
//                     <Text style={[styles.tableHeaderText, styles.colInstructions]}>Instructions</Text>
//                 </View></View>
//                 {data.medicationList.filter(m => m?.name?.trim()).map((medication, index) => (
//                   <View key={`medication-${index}`} style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}>
//                     <Text style={[styles.tableCell, styles.tableCellLeft, styles.tableCellBold, styles.colMedicine]}>{medication.name || "N/A"}</Text>
//                     <Text style={[styles.tableCell, styles.colDosage]}>{medication.dosage || "N/A"}</Text>
//                     <Text style={[styles.tableCell, styles.colFrequency]}>{medication.frequency || "N/A"}</Text>
//                     <Text style={[styles.tableCell, styles.colDuration]}>{medication.duration || "N/A"}</Text>
//                     <Text style={[styles.tableCell, styles.tableCellLeft, styles.colInstructions]}>{medication.instructions || "As directed"}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Course of Treatment / Advice */}
//         {data.courseOfTreatment && data.courseOfTreatment.trim() && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}><MedicalIcon /><Text style={styles.sectionTitle}>Course of Treatment / Advice</Text></View>
//             <View style={styles.sectionContent}><Text style={styles.contentText}>{data.courseOfTreatment}</Text></View>
//           </View>
//         )}

//         {/* Lab Tests */}
//         {data.labTests && data.labTests.filter(t => t && t.trim()).length > 0 && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}><TestIcon /><Text style={styles.sectionTitle}>Recommended Lab Tests</Text></View>
//             <View style={styles.sectionContent}>
//               <View style={styles.badgeContainer}>
//                 {data.labTests.filter(t => t && t.trim()).map((test, index) => (
//                   <Text key={`test-${index}`} style={styles.badge}>{test}</Text>
//                 ))}
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Follow-up */}
//         {data.followUpDate && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}><CalendarIcon /><Text style={styles.sectionTitle}>Follow-up Appointment</Text></View>
//             <View style={styles.sectionContent}><Text style={styles.contentText}>Next appointment scheduled for: {formatDate(data.followUpDate)}</Text></View>
//           </View>
//         )}
//       </View>

//       <View style={styles.footerContainer}>
//         <Text style={styles.addressText}>{addressLine1} | {addressLine2} | {addressLine3}</Text>
//         <Text style={styles.contactText}>Phone: {phone} | Email: {email} | Website: {website}</Text>
//         <Text style={styles.footerText}>Generated on {formatDate(currentDate)} | {doctorQualification}</Text>
//       </View>
//     </Page>
//   );

//   return (
//     <Document>
//       {showDetailedView ? renderDetailedTemplate() : renderSimpleTemplate()}
//     </Document>
//   );
// };

// export default PrescriptionDocument;

"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  Circle,
  Rect,
  Line,
} from "@react-pdf/renderer";

import {
  IPrescriptionFormData,
  ICommonDisease, // Now IFamilyHistory.commonDiseases is ICommonDisease[]
} from "@/types/prescription";

const FONT_FAMILY_REGULAR = "Helvetica";
const FONT_FAMILY_BOLD = "Helvetica-Bold";

// Template Types
export type PrescriptionTemplate =
  | "dental"
  | "orthopedic"
  | "modern"
  | "classic"
  | "professional";

// Custom SVG Icons
const MedicalIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
      fill="#2563eb" // Blue-600
    />
  </Svg>
);

const UserIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Circle cx="12" cy="8" r="4" fill="#059669" />
    <Path d="M20 20c0-4.4-3.6-8-8-8s-8 3.6-8 8" fill="#059669" />
  </Svg>
);

const PillIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M4.22 11.29l6.36-6.36a4 4 0 015.66 5.66l-6.36 6.36a4 4 0 01-5.66-5.66z"
      fill="#dc2626" // Red-600
    />
    <Path d="M8.12 15.19l6.36-6.36" stroke="#ffffff" strokeWidth="1" />
  </Svg>
);

const SymptomIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="#f59e0b" />
    <Path
      d="M12 8v4M12 16h.01"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const DiagnosisIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
      stroke="#10b981" // Green-500
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
      stroke="#6366f1" // Indigo-500
      strokeWidth="2"
      fill="none"
    />
    <Line x1="16" y1="2" x2="16" y2="6" stroke="#6366f1" strokeWidth="2" />
    <Line x1="8" y1="2" x2="8" y2="6" stroke="#6366f1" strokeWidth="2" />
    <Line x1="3" y1="10" x2="21" y2="10" stroke="#6366f1" strokeWidth="2" />
  </Svg>
);

const TestIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M9 11H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-2M9 11V9a2 2 0 112 0v2M9 11h6"
      stroke="#8b5cf6" // Purple-500
      strokeWidth="1.5"
      fill="none"
    />
  </Svg>
);

const HistoryIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Circle
      cx="12"
      cy="12"
      r="10"
      stroke="#ef4444" // Red-500
      strokeWidth="1.5"
      fill="none"
    />
    <Path
      d="M12 6v6l4 2"
      stroke="#ef4444"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

const NotesIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M3 7h18M3 12h18M3 17h12"
      stroke="#4b5563"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Template-specific icons
const ToothIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1s1-.45 1-1v-1.5c.31.09.64.15 1 .15s.69-.06 1-.15V17c0 .55.45 1 1 1s1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
      fill="#0ea5e9"
    />
  </Svg>
);
const StethoscopeIconPdf = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24">
    <Path
      d="M19 14c1.49 0 3 1.51 3 3s-1.51 3-3 3-3-1.51-3-3 1.51-3 3-3m0 2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1m-8 0c0-1.5.5-2.9 1.3-4l-2.6-5.2c-.2-.4-.1-.9.2-1.2.4-.2.9-.1 1.2.2L13 9.5c.9-.3 1.9-.3 2.8 0l2.9-2.7c.3-.3.8-.4 1.2-.2.3.3.4.8.2 1.2L17.7 13c.8 1.1 1.3 2.5 1.3 4 0 3.9-3.1 7-7 7s-7-3.1-7-7z"
      fill="#10b981"
    />
  </Svg>
);
const CaduceusIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24">
    <Path
      d="M12 2L12 22M8 6L16 6M8 18L16 18M6 10C6 8 8 8 8 10C8 12 6 12 6 10M18 10C18 8 16 8 16 10C16 12 18 12 18 10M6 14C6 16 8 16 8 14C8 12 6 12 6 14M18 14C18 16 16 16 16 14C16 12 18 12 18 14"
      stroke="#0ea5e9"
      strokeWidth="1.5"
      fill="none"
    />
  </Svg>
);
const HeartbeatIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24">
    <Path
      d="M2 12H5L7 8L10 16L12 12H15L17 8L20 16L22 12"
      stroke="#0ea5e9"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const BoneIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24">
    <Path
      d="M17 6C17.55 6 18 5.55 18 5S17.55 4 17 4 16 4.45 16 5 16.45 6 17 6M7 6C7.55 6 8 5.55 8 5S7.55 4 7 4 6 4.45 6 5 6.45 6 7 6M17 20C17.55 20 18 19.55 18 19S17.55 18 17 18 16 18.45 16 19 16.45 20 17 20M7 20C7.55 20 8 19.55 8 19S7.55 18 7 18 6 18.45 6 19 6.45 20 7 20M8.5 12C8.5 11.17 7.83 10.5 7 10.5S5.5 11.17 5.5 12 6.17 13.5 7 13.5 8.5 12.83 8.5 12M18.5 12C18.5 11.17 17.83 10.5 17 10.5S15.5 11.17 15.5 12 16.17 13.5 17 13.5 18.5 12.83 18.5 12M7.5 6.5L16.5 17.5M16.5 6.5L7.5 17.5"
      stroke="#3b82f6"
      strokeWidth="1.5"
    />
  </Svg>
);

// Template Configurations
const getTemplateConfig = (template: PrescriptionTemplate) => {
  const configs = {
    dental: {
      primaryColor: "#0ea5e9",
      secondaryColor: "#bae6fd",
      accentColor: "#0284c7",
      icon: <ToothIcon />,
      headerBg: "#0ea5e9",
      footerBg: "#0ea5e9",
      borderColor: "#0ea5e9",
      hasTopBorder: false,
      hasBottomBorder: true,
      gradientFooter: true,
    },
    orthopedic: {
      primaryColor: "#3b82f6",
      secondaryColor: "#dbeafe",
      accentColor: "#2563eb",
      icon: <BoneIcon />,
      headerBg: "#3b82f6",
      footerBg: "#3b82f6",
      borderColor: "#3b82f6",
      hasTopBorder: false,
      hasBottomBorder: true,
      gradientFooter: false,
    },
    modern: {
      primaryColor: "#10b981",
      secondaryColor: "#d1fae5",
      accentColor: "#059669",
      icon: <StethoscopeIconPdf />,
      headerBg: "#10b981",
      footerBg: "#10b981",
      borderColor: "#10b981",
      hasTopBorder: true,
      hasBottomBorder: true,
      gradientFooter: false,
    },
    classic: {
      primaryColor: "#0ea5e9",
      secondaryColor: "#e0f2fe",
      accentColor: "#0284c7",
      icon: <CaduceusIcon />,
      headerBg: "#0ea5e9",
      footerBg: "#0ea5e9",
      borderColor: "#0ea5e9",
      hasTopBorder: false,
      hasBottomBorder: true,
      gradientFooter: true,
    },
    professional: {
      primaryColor: "#0ea5e9",
      secondaryColor: "#e0f2fe",
      accentColor: "#0284c7",
      icon: <HeartbeatIcon />,
      headerBg: "#0ea5e9",
      footerBg: "#0ea5e9",
      borderColor: "#0ea5e9",
      hasTopBorder: true,
      hasBottomBorder: true,
      gradientFooter: true,
    },
  };
  return configs[template];
};

// Dynamic Styles Function
const createDynamicStyles = (template: PrescriptionTemplate) => {
  const config = getTemplateConfig(template);
  return StyleSheet.create({
    page: {
      fontFamily: FONT_FAMILY_REGULAR,
      fontSize: 10,
      paddingTop: 30,
      paddingLeft: 40,
      paddingRight: 40,
      paddingBottom: 40,
      lineHeight: 1.4,
      color: "#1f2937",
      backgroundColor: "#ffffff",
    },
    headerContainer: {
      backgroundColor: "#ffffff",
      borderTopWidth: config.hasTopBorder ? 8 : 0,
      borderTopColor: config.headerBg,
      borderBottomWidth: 2,
      borderBottomColor: config.borderColor,
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginBottom: 20,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    leftHeaderSection: { flex: 1, paddingRight: 20 },
    hospitalName: {
      fontSize: 20,
      fontFamily: FONT_FAMILY_BOLD,
      color: config.primaryColor,
      marginBottom: 4,
      letterSpacing: 0.5,
    },
    hospitalSlogan: {
      fontSize: 10,
      color: "#6b7280",
      fontStyle: "italic",
      marginBottom: 8,
    },
    doctorName: {
      fontSize: 14,
      fontFamily: FONT_FAMILY_BOLD,
      color: "#111827",
    },
    doctorQualification: { fontSize: 10, color: "#6b7280" },
    rightHeaderSection: {
      alignItems: "flex-end",
      justifyContent: "flex-start",
    },
    headerIcon: { marginBottom: 8 },
    patientInfoLine: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: "#e5e7eb",
      paddingTop: 12,
      marginTop: 12,
    },
    patientInfoText: {
      fontSize: 9,
      color: "#374151",
      borderBottomWidth: 1,
      borderBottomColor: "#d1d5db",
      paddingBottom: 2,
      minWidth: 100,
    },
    rxSymbol: {
      fontSize: 28,
      fontFamily: FONT_FAMILY_BOLD,
      color: config.accentColor,
      marginTop: 15,
      marginBottom: 5,
    },
    contentContainer: { flex: 1, minHeight: 400 },
    contentArea: {
      borderWidth: 1,
      borderColor: "#e5e7eb",
      borderRadius: 8,
      minHeight: 350,
      padding: 15,
      backgroundColor: "#fafafa",
    },
    footerContainer: {
      backgroundColor: config.hasBottomBorder ? config.footerBg : "#ffffff",
      borderTopWidth: config.hasBottomBorder ? 0 : 1,
      borderTopColor: "#e5e7eb",
      paddingVertical: config.hasBottomBorder ? 12 : 8,
      paddingHorizontal: 20,
      marginTop: 20,
      marginHorizontal: -40,
      marginBottom: -40,
    },
    footerText: {
      fontSize: 8,
      color: config.hasBottomBorder ? "#ffffff" : "#6b7280",
      textAlign: "center",
      lineHeight: 1.3,
    },
    addressText: {
      fontSize: 8,
      color: config.hasBottomBorder ? "#ffffff" : "#6b7280",
      textAlign: "center",
      marginBottom: 4,
    },
    contactText: {
      fontSize: 8,
      color: config.hasBottomBorder ? "#ffffff" : "#6b7280",
      textAlign: "center",
    },
    section: {
      marginBottom: 18,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#e5e7eb",
      borderRadius: 8,
      overflow: "hidden",
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f8fafc",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
    },
    sectionTitle: {
      fontSize: 11,
      fontFamily: FONT_FAMILY_BOLD,
      color: "#374151",
      marginLeft: 6,
      textTransform: "uppercase",
      letterSpacing: 0.3,
    },
    sectionContent: { padding: 12 },
    patientGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -4,
    },
    patientField: { width: "33.333%", paddingHorizontal: 4, marginBottom: 12 },
    patientFieldWide: { width: "50%", paddingHorizontal: 4, marginBottom: 12 },
    fieldContainer: {
      backgroundColor: "#f9fafb",
      padding: 8,
      borderRadius: 6,
      borderLeftWidth: 3,
      borderLeftColor: config.primaryColor,
    },
    fieldLabel: {
      fontFamily: FONT_FAMILY_BOLD,
      color: "#6b7280",
      fontSize: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    fieldValue: {
      color: "#111827",
      fontSize: 10,
      fontFamily: FONT_FAMILY_BOLD,
    },
    badgeContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -3,
    },
    badge: {
      backgroundColor: "#fef3c7",
      color: "#92400e",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      fontSize: 9,
      fontFamily: FONT_FAMILY_BOLD,
      borderWidth: 1,
      borderColor: "#f59e0b",
      marginHorizontal: 3,
      marginVertical: 3,
    },
    medicationTable: {
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
      overflow: "hidden",
    },
    tableHeader: { backgroundColor: "#374151", paddingVertical: 10 },
    tableHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
    },
    tableHeaderText: {
      color: "#ffffff",
      fontFamily: FONT_FAMILY_BOLD,
      fontSize: 9,
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      minHeight: 40,
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 6,
    },
    tableRowAlt: { backgroundColor: "#f9fafb" },
    tableCell: {
      fontSize: 9,
      color: "#374151",
      paddingHorizontal: 4,
      textAlign: "center",
    },
    tableCellLeft: { textAlign: "left" },
    tableCellBold: { fontFamily: FONT_FAMILY_BOLD },
    colMedicine: { width: "25%" },
    colDosage: { width: "15%" },
    colFrequency: { width: "20%" },
    colDuration: { width: "15%" },
    colInstructions: { width: "25%" },
    diagnosisContainer: {
      backgroundColor: "#ecfdf5",
      padding: 12,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: "#10b981",
    },
    diagnosisText: {
      fontSize: 12,
      color: "#111827",
      fontFamily: FONT_FAMILY_BOLD,
      lineHeight: 1.5,
    },
    contentText: {
      fontSize: 10,
      color: "#374151",
      lineHeight: 1.6,
      backgroundColor: "#f8fafc",
      padding: 12,
      borderRadius: 6,
      borderLeftWidth: 3,
      borderLeftColor: config.primaryColor,
    },
    notesText: {
      fontSize: 10,
      color: "#374151",
      lineHeight: 1.6,
      marginTop: 4,
    },
    noData: { fontStyle: "italic", color: "#9ca3af", fontSize: 9 },
    familyDiseaseItem: { marginBottom: 6 },
    familyDiseaseName: {
      fontFamily: FONT_FAMILY_BOLD,
      fontSize: 9,
      color: "#374151",
    },
    familyDiseaseRelation: {
      fontStyle: "italic",
      fontSize: 8,
      color: "#6b7280",
      marginLeft: 5,
    },
    familyDiseaseDetails: {
      fontSize: 9,
      color: "#4b5563",
      marginLeft: 10,
      marginTop: 2,
    },
  });
};

interface PrescriptionDocumentProps {
  data: IPrescriptionFormData;
  template?: PrescriptionTemplate;
  doctorName?: string;
  hospitalName?: string;
  hospitalSlogan?: string;
  doctorQualification?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  phone?: string;
  email?: string;
  website?: string;
  prescriptionId?: string;
  showDetailedView?: boolean;
}

const PrescriptionDocument: React.FC<PrescriptionDocumentProps> = ({
  data,
  template = "classic",
  doctorName = "Dr Zubair wani",
  hospitalName = "Tabeeb Medical Solutions",
  hospitalSlogan = "Your Slogan",
  doctorQualification = "Qualification",
  addressLine1 = "Address Line 1",
  addressLine2 = "Address Line 2",
  addressLine3 = "Address Line 3",
  phone = "0123456789",
  email = "tabeeb@email.com",
  website = "www.tabeeb.co.in",
  prescriptionId,
  showDetailedView = true,
}) => {
  const styles = createDynamicStyles(template);
  const config = getTemplateConfig(template);

  const generatePrescriptionId = () => {
    return (
      prescriptionId ||
      `RX-${new Date().getFullYear()}-${Math.random()
        .toString(36)
        .substr(2, 8)
        .toUpperCase()}`
    );
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const renderTextOrNA = (
    text: string | number | undefined | null,
    defaultText = "Not specified"
  ) => {
    if (text === undefined || text === null || text.toString().trim() === "") {
      return <Text style={styles.noData}>{defaultText}</Text>;
    }
    return <Text style={styles.fieldValue}>{text.toString()}</Text>;
  };

  const renderStringOrNA = (
    text: string | number | undefined | null,
    defaultText = "Not specified"
  ) => {
    if (text === undefined || text === null || text.toString().trim() === "") {
      return defaultText;
    }
    return text.toString();
  };

  const calculateBMI = (weightStr?: string, heightStr?: string) => {
    const weight = parseFloat(weightStr || "");
    const height = parseFloat(heightStr || "");
    if (
      isNaN(weight) ||
      isNaN(height) ||
      height === 0 ||
      weight <= 0 ||
      height <= 0
    )
      return null;
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const currentDate = new Date();

  const renderSimpleTemplate = () => (
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <View style={styles.leftHeaderSection}>
            <Text style={styles.hospitalName}>{hospitalName}</Text>
            <Text style={styles.hospitalSlogan}>{hospitalSlogan}</Text>
            <Text style={styles.doctorName}>{doctorName}</Text>
            <Text style={styles.doctorQualification}>
              {doctorQualification}
            </Text>
          </View>
          <View style={styles.rightHeaderSection}>
            <View style={styles.headerIcon}>{config.icon}</View>
          </View>
        </View>
        <View style={styles.patientInfoLine}>
          <Text style={styles.patientInfoText}>
            Name: {renderStringOrNA(data.fullName, ".........................")}
          </Text>
          <Text style={styles.patientInfoText}>
            Age: {data.age ? `${data.age}` : "......"}
          </Text>
          <Text style={styles.patientInfoText}>
            Sex: {data.gender || "......"}
          </Text>
          <Text style={styles.patientInfoText}>
            Date: {formatDate(currentDate)}
          </Text>
        </View>
      </View>
      <Text style={styles.rxSymbol}>℞</Text>
      <View style={styles.contentContainer}>
        <View style={styles.contentArea}></View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.addressText}>
          {addressLine1} | {addressLine2} | {addressLine3}
        </Text>
        <Text style={styles.contactText}>
          Phone: {phone}, {email}, {website}
        </Text>
      </View>
    </Page>
  );

  const renderDetailedTemplate = () => (
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <View style={styles.leftHeaderSection}>
            <Text style={styles.hospitalName}>{hospitalName}</Text>
            <Text style={styles.hospitalSlogan}>{hospitalSlogan}</Text>
          </View>
          <View style={styles.rightHeaderSection}>
            <View style={styles.headerIcon}>{config.icon}</View>
          </View>
        </View>
        <View style={styles.patientInfoLine}>
          <Text style={styles.patientInfoText}>Doctor: {doctorName}</Text>
          <Text style={styles.patientInfoText}>
            Date: {formatDate(currentDate)}
          </Text>
          <Text style={styles.patientInfoText}>
            ID: {generatePrescriptionId()}
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Patient Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <UserIcon />
            <Text style={styles.sectionTitle}>Patient Information</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.patientGrid}>
              <View style={styles.patientFieldWide}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  {renderTextOrNA(data.fullName)}
                </View>
              </View>
              <View style={styles.patientField}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Age</Text>
                  {data.age
                    ? renderTextOrNA(`${data.age} years`)
                    : renderTextOrNA(null)}
                </View>
              </View>
              <View style={styles.patientField}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Gender</Text>
                  {renderTextOrNA(data.gender)}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Vital Signs from IPrescriptionFormData */}
        {/* {(data.height || data.weight) && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}><MedicalIcon /><Text style={styles.sectionTitle}>Vital Signs</Text></View>
            <View style={styles.sectionContent}>
              <View style={styles.patientGrid}>
                {data.height && (<View style={styles.patientField}><View style={styles.fieldContainer}><Text style={styles.fieldLabel}>Height</Text>{renderTextOrNA(`${data.height} cm`)}</View></View>)}
                {data.weight && (<View style={styles.patientField}><View style={styles.fieldContainer}><Text style={styles.fieldLabel}>Weight</Text>{renderTextOrNA(`${data.weight} kg`)}</View></View>)}
                {calculateBMI(data.weight, data.height) && (
                  <View style={styles.patientField}><View style={styles.fieldContainer}><Text style={styles.fieldLabel}>BMI</Text>{renderTextOrNA(calculateBMI(data.weight, data.height))}</View></View>
                )}
              </View>
            </View>
          </View>
        )} */}

        {(data.height || data.weight) && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MedicalIcon />
              <Text style={styles.sectionTitle}>Vital Signs</Text>
            </View>
            <View style={styles.sectionContent}>
              <View style={styles.patientGrid}>
                {data.height && (
                  <View style={styles.patientField}>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Height</Text>
                      {renderTextOrNA(`${data.height} cm`)}
                    </View>
                  </View>
                )}
                {data.weight && (
                  <View style={styles.patientField}>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Weight</Text>
                      {renderTextOrNA(`${data.weight} kg`)}
                    </View>
                  </View>
                )}

                {/* Corrected call to calculateBMI */}
                {(() => {
                  const weightStr =
                    data.weight !== undefined && data.weight !== null
                      ? String(data.weight)
                      : undefined;
                  const heightStr =
                    data.height !== undefined && data.height !== null
                      ? String(data.height)
                      : undefined;
                  const bmiResult = calculateBMI(weightStr, heightStr);
                  return (
                    bmiResult && (
                      <View style={styles.patientField}>
                        <View style={styles.fieldContainer}>
                          <Text style={styles.fieldLabel}>BMI</Text>
                          {renderTextOrNA(bmiResult)}
                        </View>
                      </View>
                    )
                  );
                })()}
              </View>
            </View>
          </View>
        )}

        {/* Patient History */}
        {data.patientHistory && data.patientHistory.trim() && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <NotesIcon />
              <Text style={styles.sectionTitle}>Patient History Notes</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.contentText}>{data.patientHistory}</Text>
            </View>
          </View>
        )}

        {/* Family History */}
        {(data.familyHistory?.commonDiseases?.length > 0 ||
          (data.familyHistory?.familyHistoryNotes &&
            data.familyHistory.familyHistoryNotes.trim() !== "")) && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <HistoryIcon />
              <Text style={styles.sectionTitle}>Family Medical History</Text>
            </View>
            <View style={styles.sectionContent}>
              {data.familyHistory.commonDiseases &&
                data.familyHistory.commonDiseases.length > 0 && (
                  <>
                    <Text style={styles.fieldLabel}>Reported Conditions:</Text>
                    {data.familyHistory.commonDiseases
                      .filter((d) => d?.diseaseName?.trim()) // Filter out entries without a disease name
                      .map((disease: ICommonDisease, index: number) => (
                        <View
                          key={`family-disease-${index}`}
                          style={styles.familyDiseaseItem}
                        >
                          <Text style={styles.familyDiseaseName}>
                            {disease.diseaseName}
                            {disease.inheritance && (
                              <Text style={styles.familyDiseaseRelation}>
                                {" "}
                                ({disease.inheritance})
                              </Text>
                            )}
                          </Text>
                          {disease.details && disease.details.trim() && (
                            <Text style={styles.familyDiseaseDetails}>
                              {" "}
                              - {disease.details}
                            </Text>
                          )}
                        </View>
                      ))}
                  </>
                )}
              {data.familyHistory.familyHistoryNotes &&
                data.familyHistory.familyHistoryNotes.trim() && (
                  <>
                    <Text
                      style={[
                        styles.fieldLabel,
                        {
                          marginTop:
                            data.familyHistory.commonDiseases?.filter((d) =>
                              d?.diseaseName?.trim()
                            ).length > 0
                              ? 8
                              : 0,
                        },
                      ]}
                    >
                      Additional Notes:
                    </Text>
                    <Text style={styles.notesText}>
                      {data.familyHistory.familyHistoryNotes}
                    </Text>
                  </>
                )}
            </View>
          </View>
        )}

        {/* Symptoms */}
        {data.symptoms &&
          data.symptoms.filter((s) => s && s.trim()).length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <SymptomIcon />
                <Text style={styles.sectionTitle}>Reported Symptoms</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.badgeContainer}>
                  {data.symptoms
                    .filter((s) => s && s.trim())
                    .map((symptom, index) => (
                      <Text key={`symptom-${index}`} style={styles.badge}>
                        {symptom}
                      </Text>
                    ))}
                </View>
              </View>
            </View>
          )}

        {/* Diagnosis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <DiagnosisIcon />
            <Text style={styles.sectionTitle}>Clinical Diagnosis</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.diagnosisContainer}>
              {data.diagnosis && data.diagnosis.trim() ? (
                <Text style={styles.diagnosisText}>{data.diagnosis}</Text>
              ) : (
                <Text style={styles.noData}>No diagnosis provided.</Text>
              )}
            </View>
          </View>
        </View>

        {/* Medications */}
        {data.medicationList &&
          data.medicationList.filter((m) => m?.name?.trim()).length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <PillIcon />
                <Text style={styles.sectionTitle}>Prescribed Medications</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.medicationTable}>
                  <View style={styles.tableHeader}>
                    <View style={styles.tableHeaderRow}>
                      <Text
                        style={[styles.tableHeaderText, styles.colMedicine]}
                      >
                        Medicine
                      </Text>
                      <Text style={[styles.tableHeaderText, styles.colDosage]}>
                        Dosage
                      </Text>
                      <Text
                        style={[styles.tableHeaderText, styles.colFrequency]}
                      >
                        Frequency
                      </Text>
                      <Text
                        style={[styles.tableHeaderText, styles.colDuration]}
                      >
                        Duration
                      </Text>
                      <Text
                        style={[styles.tableHeaderText, styles.colInstructions]}
                      >
                        Instructions
                      </Text>
                    </View>
                  </View>
                  {data.medicationList
                    .filter((m) => m?.name?.trim())
                    .map((medication, index) => (
                      <View
                        key={`medication-${index}`}
                        style={[
                          styles.tableRow,
                          ...(index % 2 === 1 ? [styles.tableRowAlt] : [])
                        ]}
                      >
                        <Text
                          style={[
                            styles.tableCell,
                            styles.tableCellLeft,
                            styles.tableCellBold,
                            styles.colMedicine,
                          ]}
                        >
                          {medication.name || "N/A"}
                        </Text>
                        <Text style={[styles.tableCell, styles.colDosage]}>
                          {medication.dosage || "N/A"}
                        </Text>
                        <Text style={[styles.tableCell, styles.colFrequency]}>
                          {medication.frequency || "N/A"}
                        </Text>
                        <Text style={[styles.tableCell, styles.colDuration]}>
                          {medication.duration || "N/A"}
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            styles.tableCellLeft,
                            styles.colInstructions,
                          ]}
                        >
                          {medication.instructions || "As directed"}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            </View>
          )}

        {/* Course of Treatment / Advice */}
        {data.courseOfTreatment && data.courseOfTreatment.trim() && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MedicalIcon />
              <Text style={styles.sectionTitle}>
                Course of Treatment / Advice
              </Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.contentText}>{data.courseOfTreatment}</Text>
            </View>
          </View>
        )}

        {/* Lab Tests */}
        {data.labTests &&
          data.labTests.filter((t) => t && t.trim()).length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TestIcon />
                <Text style={styles.sectionTitle}>Recommended Lab Tests</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.badgeContainer}>
                  {data.labTests
                    .filter((t) => t && t.trim())
                    .map((test, index) => (
                      <Text key={`test-${index}`} style={styles.badge}>
                        {test}
                      </Text>
                    ))}
                </View>
              </View>
            </View>
          )}

        {/* Follow-up */}
        {data.followUpDate && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CalendarIcon />
              <Text style={styles.sectionTitle}>Follow-up Appointment</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.contentText}>
                Next appointment scheduled for: {formatDate(data.followUpDate)}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.addressText}>
          {addressLine1} | {addressLine2} | {addressLine3}
        </Text>
        <Text style={styles.contactText}>
          Phone: {phone} | Email: {email} | Website: {website}
        </Text>
        <Text style={styles.footerText}>
          Generated on {formatDate(currentDate)} | {doctorQualification}
        </Text>
      </View>
    </Page>
  );

  return (
    <Document>
      {showDetailedView ? renderDetailedTemplate() : renderSimpleTemplate()}
    </Document>
  );
};

export default PrescriptionDocument;
