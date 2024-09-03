import { z } from "zod";
// Formschema is where we define what goes into a form
export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  portfolioLink: z.union([z.literal(""), z.string().trim().url()]),
  location: z.union([z.literal(""), z.string().trim().max(50)]),
  bio: z.union([z.literal(""), z.string().trim().max(150)]),
});
