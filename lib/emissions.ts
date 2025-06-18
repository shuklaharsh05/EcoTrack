// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  // Transportation (kg CO2 per mile)
  transport: {
    'small': 0.31,      // Small car
    'medium': 0.39,     // Medium car
    'large': 0.53,      // Large car/SUV
    'hybrid': 0.20,     // Hybrid vehicle
    'electric': 0.05,   // Electric vehicle (accounting for grid emissions)
    'bus': 0.14,        // Bus per mile
    'train': 0.09,      // Train per mile
    'mixed': 0.12,      // Mixed public transport
    'flight': 0.21      // Flight per mile
  },
  
  // Home energy (kg CO2 per dollar spent)
  home: {
    electricity: 0.85,    // kg CO2 per dollar
    'natural-gas': 0.53,  // kg CO2 per dollar
    'electric': 0.85,     // Electric heating
    'oil': 0.74,          // Heating oil
    'propane': 0.63,      // Propane
    'wood': 0.38,         // Wood heating
    'other': 0.60,        // Other heating
    water: 0.43           // Water usage
  },
  
  // Food (kg CO2 per person per week)
  food: {
    dietType: {
      'omnivore': 70,     // High meat diet
      'pescatarian': 46,  // Fish but no meat
      'vegetarian': 42,   // No meat or fish
      'vegan': 30         // No animal products
    },
    meatFrequency: {
      'daily': 1.5,
      'frequent': 1.3,
      'moderate': 1.0,
      'occasional': 0.7,
      'rare': 0.4
    },
    dairyFrequency: {
      'high': 1.4,
      'moderate': 1.0,
      'low': 0.6,
      'very-low': 0.3
    },
    localFood: {
      'high': 0.8,    // 20% reduction for local food
      'moderate': 0.9, // 10% reduction
      'low': 1.0,
      'none': 1.1     // 10% increase for non-local
    },
    organicFood: {
      'high': 0.9,    // 10% reduction
      'moderate': 0.95,
      'low': 1.0,
      'none': 1.0
    },
    foodWaste: {
      'low': 0.9,     // 10% reduction
      'moderate': 1.0,
      'high': 1.3     // 30% increase
    },
    diningOut: {
      'daily': 1.4,
      'frequent': 1.3,
      'moderate': 1.1,
      'occasional': 1.0,
      'rare': 0.95
    }
  },
  
  // Shopping (kg CO2 per dollar spent)
  shopping: {
    clothing: 0.021,      // kg CO2 per dollar
    electronics: 0.015,   // kg CO2 per dollar
    general: 0.012,       // kg CO2 per dollar
    secondHand: {
      'frequently': 0.7,  // 30% reduction
      'sometimes': 0.85,  // 15% reduction
      'rarely': 0.95,     // 5% reduction
      'never': 1.0
    }
  }
};

// Flight distance estimates (miles per year)
const FLIGHT_DISTANCES = {
  '0': 0,
  '1-2': 2500,      // 1-2 round trips
  '3-5': 6000,      // 3-5 round trips
  '6-10': 12000,    // 6-10 round trips
  '10+': 20000      // 10+ round trips
};

export function calculateEmissions(data: any) {
  let totalEmissions = 0;
  const breakdown = {
    transport: 0,
    home: 0,
    food: 0,
    shopping: 0
  };

  // Calculate transportation emissions
  if (data.transport) {
    const { carType, carMiles, carDays, publicTransport, publicMiles, flights } = data.transport;
    
    // Car emissions
    if (carType && carMiles && carDays) {
      const dailyMiles = parseFloat(carMiles) || 0;
      const daysPerWeek = parseFloat(carDays) || 0;
      const weeklyMiles = dailyMiles * daysPerWeek;
      const annualMiles = weeklyMiles * 52;
      breakdown.transport += annualMiles * EMISSION_FACTORS.transport[carType as keyof typeof EMISSION_FACTORS.transport];
    }
    
    // Public transport emissions
    if (publicTransport && publicTransport !== 'none' && publicMiles) {
      const weeklyMiles = parseFloat(publicMiles) || 0;
      const annualMiles = weeklyMiles * 52;
      breakdown.transport += annualMiles * EMISSION_FACTORS.transport[publicTransport as keyof typeof EMISSION_FACTORS.transport];
    }
    
    // Flight emissions
    if (flights && flights !== '0') {
      const annualFlightMiles = FLIGHT_DISTANCES[flights as keyof typeof FLIGHT_DISTANCES];
      breakdown.transport += annualFlightMiles * EMISSION_FACTORS.transport.flight;
    }
  }

  // Calculate home emissions
  if (data.home) {
    const { electricityBill, heatingType, heatingBill, waterBill, residents } = data.home;
    const numResidents = parseFloat(residents) || 1;
    
    // Electricity emissions
    if (electricityBill) {
      const monthlyBill = parseFloat(electricityBill) || 0;
      const annualBill = monthlyBill * 12;
      breakdown.home += (annualBill * EMISSION_FACTORS.home.electricity) / numResidents;
    }
    
    // Heating emissions
    if (heatingType && heatingBill) {
      const monthlyBill = parseFloat(heatingBill) || 0;
      const annualBill = monthlyBill * 12;
      const factor = EMISSION_FACTORS.home[heatingType as keyof typeof EMISSION_FACTORS.home] || EMISSION_FACTORS.home.other;
      breakdown.home += (annualBill * factor) / numResidents;
    }
    
    // Water emissions
    if (waterBill) {
      const monthlyBill = parseFloat(waterBill) || 0;
      const annualBill = monthlyBill * 12;
      breakdown.home += (annualBill * EMISSION_FACTORS.home.water) / numResidents;
    }
  }

  // Calculate food emissions
  if (data.food) {
    const { 
      dietType, 
      meatFrequency, 
      dairyFrequency, 
      localFood, 
      organicFood, 
      foodWaste, 
      diningOut 
    } = data.food;
    
    // Base emissions from diet type
    let foodEmissions = EMISSION_FACTORS.food.dietType[dietType as keyof typeof EMISSION_FACTORS.food.dietType] || 50;
    
    // Adjust for meat frequency (if omnivore)
    if (dietType === 'omnivore' && meatFrequency) {
      foodEmissions *= EMISSION_FACTORS.food.meatFrequency[meatFrequency as keyof typeof EMISSION_FACTORS.food.meatFrequency];
    }
    
    // Adjust for dairy frequency
    if (dairyFrequency && (dietType === 'omnivore' || dietType === 'pescatarian' || dietType === 'vegetarian')) {
      foodEmissions *= EMISSION_FACTORS.food.dairyFrequency[dairyFrequency as keyof typeof EMISSION_FACTORS.food.dairyFrequency];
    }
    
    // Adjust for local food
    if (localFood) {
      foodEmissions *= EMISSION_FACTORS.food.localFood[localFood as keyof typeof EMISSION_FACTORS.food.localFood];
    }
    
    // Adjust for organic food
    if (organicFood) {
      foodEmissions *= EMISSION_FACTORS.food.organicFood[organicFood as keyof typeof EMISSION_FACTORS.food.organicFood];
    }
    
    // Adjust for food waste
    if (foodWaste) {
      foodEmissions *= EMISSION_FACTORS.food.foodWaste[foodWaste as keyof typeof EMISSION_FACTORS.food.foodWaste];
    }
    
    // Adjust for dining out
    if (diningOut) {
      foodEmissions *= EMISSION_FACTORS.food.diningOut[diningOut as keyof typeof EMISSION_FACTORS.food.diningOut];
    }
    
    // Convert weekly emissions to annual
    breakdown.food = foodEmissions * 52;
  }

  // Calculate shopping emissions
  if (data.shopping) {
    const { 
      clothingSpending, 
      electronicsSpending, 
      generalShopping, 
      secondHand 
    } = data.shopping;
    
    // Clothing emissions
    if (clothingSpending) {
      const monthlySpending = parseFloat(clothingSpending) || 0;
      const annualSpending = monthlySpending * 12;
      breakdown.shopping += annualSpending * EMISSION_FACTORS.shopping.clothing;
    }
    
    // Electronics emissions
    if (electronicsSpending) {
      const annualSpending = parseFloat(electronicsSpending) || 0;
      breakdown.shopping += annualSpending * EMISSION_FACTORS.shopping.electronics;
    }
    
    // General shopping emissions
    if (generalShopping) {
      const monthlySpending = parseFloat(generalShopping) || 0;
      const annualSpending = monthlySpending * 12;
      breakdown.shopping += annualSpending * EMISSION_FACTORS.shopping.general;
    }
    
    // Adjust for second-hand shopping
    if (secondHand) {
      const factor = EMISSION_FACTORS.shopping.secondHand[secondHand as keyof typeof EMISSION_FACTORS.shopping.secondHand];
      breakdown.shopping *= factor;
    }
  }

  // Calculate total emissions
  totalEmissions = breakdown.transport + breakdown.home + breakdown.food + breakdown.shopping;

  return {
    total: Math.round(totalEmissions),
    breakdown: {
      transport: Math.round(breakdown.transport),
      home: Math.round(breakdown.home),
      food: Math.round(breakdown.food),
      shopping: Math.round(breakdown.shopping)
    },
    // Additional metrics
    dailyAverage: Math.round(totalEmissions / 365),
    monthlyAverage: Math.round(totalEmissions / 12),
    comparedToAverage: Math.round((totalEmissions / 16000) * 100) // US average is ~16 tons CO2/year
  };
}