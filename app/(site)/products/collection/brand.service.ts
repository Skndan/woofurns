import apiClient from "@/lib/api/api-client";

export const BrandService = {
  async getBrand() {
    return await apiClient.get(`/v1/brand`);
  },
  async postBrand(data: any) {
    return await apiClient.post(`/v1/brand`, data);
  },
  async putBrand(id: any, data: any) {
    return await apiClient.put(`/v1/brand/${id}`, data);
  },
  async getBrandById(id: string) {
    return await apiClient.get(`/v1/brand/${id}`);
  }
}
