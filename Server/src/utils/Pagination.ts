import { IPagination } from "../interface/Pagination";

export const calculateOffset = ({ page, pageSize }: IPagination) =>
  (page - 1) * pageSize;

export const calculateTotalPages = (totalItems: number, pageSize: number) =>
  Math.ceil(totalItems / pageSize);
