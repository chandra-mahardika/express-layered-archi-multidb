import { ApiError } from "../../utils/ApiError";
import * as productRepository from "./product.repository";

export const getAll = () => productRepository.findAll();

export const getById = async (id: number) => {
  const product = await productRepository.findById(id);
  if (!product) throw new ApiError(404, "Produk tidak ditemukan");
  return product;
};

export const create = (
  data: { name: string; description?: string; price: number; stock: number },
  userId: number,
) => productRepository.create({ ...data, userId });

export const update = async (
  id: number,
  data: { name?: string; description?: string; price?: number; stock?: number },
) => {
  await getById(id);
  return productRepository.update(id, data);
};

export const remove = async (id: number) => {
  await getById(id);
  return productRepository.remove(id);
};
