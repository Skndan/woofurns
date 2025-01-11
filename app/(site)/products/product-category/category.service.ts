import apiClient from "@/lib/api/api-client";

export const CategoryService = {
  async getProductCategory() {
    return await apiClient.get(`/v1/product-category`);
  },
  async postProductCategory(data: any) {
    return await apiClient.post(`/v1/product-category`, data);
  },
  async putProductCategory(id: any, data: any) {
    return await apiClient.put(`/v1/product-category/${id}`, data);
  },
  async getProductCategoryById(id: string) {
    return await apiClient.get(`/v1/product-category/${id}`);
  }
}
