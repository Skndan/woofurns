import apiClient from "@/lib/api/api-client";

export const TaxService = {
  async getTax() {
    return await apiClient.get(`/v1/tax-rule`);
  },
  async postTax(data: any) {
    return await apiClient.post(`/v1/tax-rule`, data);
  },
  async putTax(id: any, data: any) {
    return await apiClient.put(`/v1/tax-rule/${id}`, data);
  },
  async getTaxById(id: string) {
    return await apiClient.get(`/v1/tax-rule/${id}`);
  }
}
