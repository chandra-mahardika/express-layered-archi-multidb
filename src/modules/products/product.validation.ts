import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  description: z.string().optional(),
  price: z.number().positive("Harga harus lebih dari 0"),
  stock: z.number().int().min(0).default(0),
});

export const updateProductSchema = createProductSchema.partial();
