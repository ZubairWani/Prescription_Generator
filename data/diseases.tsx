import { 
    HeartPulse, 
    AlertCircle as AlertCircleIcon, 
    Dna,
    ShieldAlert,
    Activity,
    Bone,
    Eye,
    Droplet,
    TestTube2,
    ShieldCheck,
    Brain,
    Wind
} from 'lucide-react';


export const diseaseOptions = [
    {
        label: "Cardiovascular Diseases",
        icon: <HeartPulse className="h-4 w-4 text-red-500" />,
        options: [
            { value: "coronary_artery_disease", label: "Coronary artery disease (CAD)" },
            { value: "heart_attack", label: "Heart attack (myocardial infarction)" },
            { value: "stroke", label: "Stroke" },
            { value: "hypertension", label: "Hypertension (high blood pressure)" },
            { value: "high_cholesterol", label: "High cholesterol (hyperlipidemia)" },
            { value: "cardiomyopathy", label: "Cardiomyopathy (e.g., hypertrophic)" },
            { value: "arrhythmias", label: "Arrhythmias (e.g., atrial fibrillation)" },
            { value: "heart_failure", label: "Heart failure" },
            { value: "peripheral_artery", label: "Peripheral artery disease" },
            { value: "aortic_aneurysm", label: "Aortic aneurysm" },
            { value: "congenital_heart", label: "Congenital heart defects" },
        ]
    },
    {
        label: "Cancers",
        icon: <ShieldAlert className="h-4 w-4 text-purple-500" />,
        options: [
            { value: "breast_cancer", label: "Breast cancer" },
            { value: "ovarian_cancer", label: "Ovarian cancer" },
            { value: "colorectal_cancer", label: "Colorectal cancer" },
            { value: "prostate_cancer", label: "Prostate cancer" },
            { value: "pancreatic_cancer", label: "Pancreatic cancer" },
            { value: "melanoma", label: "Melanoma" },
            { value: "lung_cancer", label: "Lung cancer" },
            { value: "leukemia", label: "Leukemia" },
            { value: "lymphoma", label: "Lymphoma" },
            { value: "thyroid_cancer", label: "Thyroid cancer" },
            { value: "bladder_cancer", label: "Bladder cancer" },
            { value: "kidney_cancer", label: "Kidney cancer" },
            { value: "stomach_cancer", label: "Stomach cancer" },
            { value: "liver_cancer", label: "Liver cancer" },
            { value: "brain_tumor", label: "Brain tumors" },
        ]
    },
    {
        label: "Metabolic & Endocrine Disorders",
        icon: <Activity className="h-4 w-4 text-orange-500" />,
        options: [
            { value: "type2_diabetes", label: "Type 2 diabetes" },
            { value: "type1_diabetes", label: "Type 1 diabetes" },
            { value: "thyroid_disorders", label: "Thyroid disorders (hypo/hyper)" },
            { value: "obesity", label: "Obesity" },
            { value: "metabolic_syndrome", label: "Metabolic syndrome" },
            { value: "gout", label: "Gout" },
            { value: "pcos", label: "Polycystic ovary syndrome (PCOS)" },
            { value: "addisons", label: "Addison's disease" },
            { value: "cushings", label: "Cushing's syndrome" },
        ]
    },
    {
        label: "Neurological & Psychiatric",
        icon: <Brain className="h-4 w-4 text-blue-500" />,
        options: [
            { value: "alzheimers", label: "Alzheimer's disease" },
            { value: "parkinsons", label: "Parkinson's disease" },
            { value: "epilepsy", label: "Epilepsy" },
            { value: "migraines", label: "Migraines" },
            { value: "schizophrenia", label: "Schizophrenia" },
            { value: "bipolar", label: "Bipolar disorder" },
            { value: "depression", label: "Depression" },
            { value: "anxiety", label: "Anxiety disorders" },
            { value: "autism", label: "Autism spectrum disorder" },
            { value: "adhd", label: "ADHD" },
            { value: "huntingtons", label: "Huntington's disease" },
            { value: "als", label: "ALS (Lou Gehrig's disease)" },
            { value: "multiple_sclerosis", label: "Multiple sclerosis" },
        ]
    },
    {
        label: "Autoimmune & Inflammatory",
        icon: <ShieldCheck className="h-4 w-4 text-yellow-500" />,
        options: [
            { value: "rheumatoid_arthritis", label: "Rheumatoid arthritis" },
            { value: "lupus", label: "Lupus (SLE)" },
            { value: "multiple_sclerosis", label: "Multiple sclerosis (MS)" },
            { value: "celiac", label: "Celiac disease" },
            { value: "psoriasis", label: "Psoriasis" },
            { value: "crohns", label: "Crohn's disease" },
            { value: "ulcerative_colitis", label: "Ulcerative colitis" },
            { value: "scleroderma", label: "Scleroderma" },
            { value: "sjogrens", label: "Sjögren's syndrome" },
            { value: "vasculitis", label: "Vasculitis" },
        ]
    },
    {
        label: "Respiratory Diseases",
        icon: <Wind className="h-4 w-4 text-cyan-500" />,
        options: [
            { value: "asthma", label: "Asthma" },
            { value: "copd", label: "COPD" },
            { value: "cystic_fibrosis", label: "Cystic fibrosis" },
            { value: "pulmonary_fibrosis", label: "Pulmonary fibrosis" },
            { value: "sleep_apnea", label: "Sleep apnea" },
            { value: "tuberculosis", label: "Tuberculosis (history)" },
            { value: "lung_fibrosis", label: "Lung fibrosis" },
        ]
    },
    {
        label: "Kidney & Liver Diseases",
        icon: <Droplet className="h-4 w-4 text-indigo-500" />,
        options: [
            { value: "pkd", label: "Polycystic kidney disease" },
            { value: "ckd", label: "Chronic kidney disease" },
            { value: "hemochromatosis", label: "Hemochromatosis" },
            { value: "wilson", label: "Wilson's disease" },
            { value: "cirrhosis", label: "Cirrhosis" },
            { value: "hepatitis", label: "Chronic hepatitis B/C" },
            { value: "nephritis", label: "Glomerulonephritis" },
            { value: "stones", label: "Kidney stones (recurrent)" },
        ]
    },
    {
        label: "Blood Disorders",
        icon: <TestTube2 className="h-4 w-4 text-rose-500" />,
        options: [
            { value: "hemophilia", label: "Hemophilia" },
            { value: "thalassemia", label: "Thalassemia" },
            { value: "sickle_cell", label: "Sickle cell anemia" },
            { value: "anemia", label: "Hemolytic anemia" },
            { value: "clotting", label: "Blood clotting disorders" },
            { value: "leukemia", label: "Leukemia" },
            { value: "lymphoma", label: "Lymphoma" },
        ]
    },
    {
        label: "Eye Diseases",
        icon: <Eye className="h-4 w-4 text-teal-500" />,
        options: [
            { value: "glaucoma", label: "Glaucoma" },
            { value: "macular_degen", label: "Macular degeneration" },
            { value: "retinitis", label: "Retinitis pigmentosa" },
            { value: "cataracts", label: "Early-onset cataracts" },
            { value: "diabetic_retino", label: "Diabetic retinopathy" },
        ]
    },
    {
        label: "Bone & Joint",
        icon: <Bone className="h-4 w-4 text-gray-600" />,
        options: [
            { value: "osteoporosis", label: "Osteoporosis" },
            { value: "osteoarthritis", label: "Osteoarthritis" },
            { value: "rheumatoid", label: "Rheumatoid arthritis" },
            { value: "gout", label: "Gout" },
            { value: "scoliosis", label: "Scoliosis" },
            { value: "marfan", label: "Marfan syndrome" },
            { value: "ehlers_danlos", label: "Ehlers-Danlos syndrome" },
        ]
    },
    {
        label: "Other Hereditary Conditions",
        icon: <Dna className="h-4 w-4 text-pink-500" />,
        options: [
            { value: "down_syndrome", label: "Down syndrome" },
            { value: "fragile_x", label: "Fragile X syndrome" },
            { value: "muscular_dystrophy", label: "Muscular dystrophy" },
            { value: "neurofibromatosis", label: "Neurofibromatosis" },
            { value: "tuberous_sclerosis", label: "Tuberous sclerosis" },
            { value: "porphyria", label: "Porphyria" },
        ]
    },
];