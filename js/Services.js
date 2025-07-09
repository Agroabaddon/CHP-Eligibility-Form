
// Example programs; add your own or modify as needed!
const programs = [
  {
    name: "SNAP",
    description: "Supplemental Nutrition Assistance Program",
    isEligible: (data) => {
      // Example: household has SNAP or client is below 130% FPL
      return (
        data.household.some(m => m.snap) ||
        data.clientIncome < calculateFPL(130, data.household.length)
      );
    }
  },
  {
    name: "WIC",
    description: "Women, Infants, and Children",
    isEligible: (data) => {
      return (
        data.household.some(m => m.pregnant || m.age < 5)
        && data.clientIncome < calculateFPL(185, data.household.length)
      );
    }
  },
  // Add more programs below as needed!
];

// FPL calculation (match script.js if needed)
function calculateFPL(percent, size) {
  const base = 15000 + 6000 * (size - 1);
  return (base * percent) / 100;
}
