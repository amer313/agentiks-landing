import { z } from 'zod';

export const pitchVideoSchema = z.object({
  clientName: z.string().default('Snowball Ventures'),
  projectName: z.string().default('Renovation Marketing Pros'),
  laborReduction: z.number().default(40),
  ambassadorCount: z.number().default(20),
  leadsPerMonth: z.string().default('100+'),
  channels: z.number().default(2),
  mvpCostLow: z.number().default(95),
  mvpCostHigh: z.number().default(140),
});

export type PitchVideoProps = z.infer<typeof pitchVideoSchema>;
