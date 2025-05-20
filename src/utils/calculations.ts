import { FormData, SunExposure } from '../types';

// Base BTU per square meter
const BASE_BTU_PER_SQM = 600;

// Additional BTUs
const BTU_PER_PERSON = 600;

// Sun exposure factors
const SUN_EXPOSURE_FACTORS: Record<SunExposure, number> = {
  'none': 0,
  'morning': 0.1,  // 10% increase
  'afternoon': 0.2, // 20% increase
  'allday': 0.3     // 30% increase
};

// Available AC sizes
const AC_SIZES = [7000, 9000, 12000, 18000, 24000, 30000];

/**
 * Calculate the required BTUs based on room dimensions and other factors
 */
export const calculateBTU = (data: FormData): number => {
  // Calculate room area
  const width = Number(data.width);
  const length = Number(data.length);
  const area = width * length;
  
  // Base BTU calculation
  let btuRequired = area * BASE_BTU_PER_SQM;
  
  // Add BTUs for people
  btuRequired += Number(data.peopleCount) * BTU_PER_PERSON;
  
  // Apply sun exposure factor
  const sunFactor = SUN_EXPOSURE_FACTORS[data.sunExposure as SunExposure];
  btuRequired += btuRequired * sunFactor;
  
  return btuRequired;
};

/**
 * Recommend the closest standard AC size based on the calculated BTUs
 */
export const recommendedACSize = (btuRequired: number): number => {
  // Find the first AC size that meets or exceeds the required BTUs
  const recommendedSize = AC_SIZES.find(size => size >= btuRequired) || AC_SIZES[AC_SIZES.length - 1];
  
  // If the recommended size is more than 20% larger than required,
  // and it's not the smallest size, consider the next smaller size
  const nextSmallerSize = AC_SIZES[AC_SIZES.indexOf(recommendedSize) - 1];
  
  if (nextSmallerSize && recommendedSize > btuRequired * 1.2) {
    // If the smaller size is within 10% of required BTUs, recommend it instead
    if (nextSmallerSize >= btuRequired * 0.9) {
      return nextSmallerSize;
    }
  }
  
  return recommendedSize;
};