import apiClient from "@/lib/api/api-client";

export const AttributeService = {
  async getAttribute() {
    return await apiClient.get(`/v1/attribute`);
  },
  async postAttribute(data: any) {
    return await apiClient.post(`/v1/attribute`, data);
  },
  async createAttribute() {
    return await apiClient.get(`/v1/attribute/create`);
  },
  async createAttributeValue(data: any) {
    return await apiClient.post(`/v1/attribute/value`, data);
  },
  async putAttribute(id: any, data: any) {
    return await apiClient.put(`/v1/attribute/${id}`, data);
  },
  async getAttributeById(id: string) {
    return await apiClient.get(`/v1/attribute/${id}`);
  },
  async deleteAttributeValue(id: string) {
    return await apiClient.delete(`/v1/attribute/value/${id}`);
  }
}
