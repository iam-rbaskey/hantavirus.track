import { z } from 'zod';
import { NormalizedOutbreakData } from '../normalizers/hantaOneNormalizer';

// Reusable validation schema for outbreak data
export const outbreakValidationSchema = z.object({
  countryCode: z.string().min(2).max(3),
  confirmedCases: z.number().int().min(0, "Confirmed cases cannot be negative"),
  suspectedCases: z.number().int().min(0, "Suspected cases cannot be negative"),
  deaths: z.number().int().min(0, "Deaths cannot be negative"),
  recovered: z.number().int().min(0, "Recovered cases cannot be negative"),
  reportedAt: z.date().refine((date) => date <= new Date(), {
    message: "Reported date cannot be in the future",
  }),
});

export class OutbreakValidator {
  /**
   * Validates normalized data before it hits the database.
   */
  public static validate(data: NormalizedOutbreakData): boolean {
    const result = outbreakValidationSchema.safeParse(data);
    
    if (!result.success) {
      console.error(`[Validation Error] Invalid outbreak data:`, result.error.format());
      return false;
    }
    
    return true;
  }
}
