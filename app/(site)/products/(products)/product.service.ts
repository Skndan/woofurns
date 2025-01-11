import apiClient from "@/lib/api/api-client";

export const ProductService = {
  async getProduct() {
    return await apiClient.get(`/v1/product`);
  },
  async postProduct(data: any) {
    return await apiClient.post(`/v1/product`, data);
  },
  async putProduct(id: any, data: any) {
    return await apiClient.put(`/v1/product/${id}`, data);
  },
  async getProductById(id: string) {
    return await apiClient.get(`/v1/product/${id}`);
  }
}
