// resources.js

const resources = [
  {
    name: "SNAP (Food Assistance)",
    description: "Helps with food purchases for low-income households.",
    isEligible: (data) => data.income <= data.snapAnnualThreshold
  },
  {
    name: "Medicaid (Health Coverage)",
    description: "Low-income health insurance.",
    isEligible: (data) => data.income <= data.medThreshold
  },
  {
    name: "TANF (Cash Assistance for Families)",
    description: "Temporary financial assistance for families in need.",
    isEligible: (data) => data.household > 1 && data.income <= data.fpl
  },
  {
    name: "LIHEAP (Energy Bill Assistance)",
    description: "Help with energy bills for low-income households.",
    isEligible: (data) => data.income <= data.fpl * 1.5
  },
  {
    name: "WIC (Women, Infants & Children Nutrition)",
    description: "Nutrition support for pregnant women, infants, and young children.",
    isEligible: (data) => data.pregnant || data.age < 5 || data.income <= data.snapAnnualThreshold
  },
  {
    name: "Section 8 (Housing Choice Vouchers)",
    description: "Rental assistance for low-income households.",
    isEligible: (data) => data.income <= data.fpl * 2
  },
  {
    name: "HUD-VASH (Veterans Housing Assistance)",
    description: "Housing support for homeless veterans.",
    isEligible: (data) => data.veteran
  },
  {
    name: "Senior Helpers (Home Care Support)",
    description: "In-home care and assistance for seniors.",
    isEligible: (data) => data.age >= 60
  },
  {
    name: "Hope PACE (All-Inclusive Care for the Elderly)",
    description: "Comprehensive health care for seniors aged 55+.",
    isEligible: (data) => data.age >= 55
  },
  {
    name: "Hope Hospice (End-of-Life & Palliative Care)",
    description: "Compassionate end-of-life care and support.",
    isEligible: (data) => data.age >= 18 // You can add more detailed criteria if needed
  },
  {
    name: "VA Benefits (Veterans Affairs)",
    description: "Federal benefits for U.S. military veterans.",
    isEligible: (data) => data.veteran
  },
  {
    name: "Area Agency on Aging for SWFL",
    description: "Advocacy and support for older adults and caregivers.",
    isEligible: (data) => data.age >= 60
  },
  {
    name: "Community Health Services (Lee County Clinics & Outreach)",
    description: "Access to local health clinics and outreach programs.",
    isEligible: (_data) => true // Available to all
  },
  {
    name: "Local Emergency Shelters",
    description: "Safe shelter for those experiencing homelessness.",
    isEligible: (_data) => true // Available to all
  },
  {
    name: "Food Pantry / Food Bank",
    description: "Free food assistance for anyone in need.",
    isEligible: (_data) => true // Available to all
  }
];
