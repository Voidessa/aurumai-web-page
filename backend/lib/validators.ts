import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email().max(150),
  telegram: z.string().min(2).max(64).optional(),
  experience: z.string().min(2).max(40).optional(),
  goal: z.string().min(2).max(200).optional(),
  source: z.string().optional(),
  utm: z.any().optional(),
  turnstileToken: z.string().optional()
});

export const inquirySchema = z.object({
  kind: z.enum(["QUESTION", "PARTNERSHIP"]),
  name: z.string().min(2).max(60),
  email: z.string().email().max(150),
  telegram: z.string().min(2).max(64).optional(),
  company: z.string().max(120).optional(),
  message: z.string().min(5).max(800),
  source: z.string().optional(),
  utm: z.any().optional(),
  turnstileToken: z.string().optional()
});

