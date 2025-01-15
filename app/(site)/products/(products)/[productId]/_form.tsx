'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import GeneralForm from './form/general-tab';
import { useProductFormFilters } from '../_components/product-table/use-product-form-filters';
import SeoForm from './form/seo-tab';
import StatusForm from './form/status-form';
export default function ProductForm({
  initialData,
}: {
  initialData: null;
}) {

  const {
    tab,
  } = useProductFormFilters();

  return (
    <>
      <div style={{ display: tab === "general" ? "block" : "none" }}>
        <GeneralForm initialData={null} />
      </div>
      <div style={{ display: tab === "inventory" ? "block" : "none" }}>
        <Label>inventory</Label>
      </div>
      <div style={{ display: tab === "setup" ? "block" : "none" }}>
        <Label>setup</Label>
      </div>
      <div style={{ display: tab === "images" ? "block" : "none" }}>
        <Label>images</Label>
      </div>
      <div style={{ display: tab === "seo" ? "block" : "none" }}>
        <SeoForm initialData={null} />
      </div>
      <div style={{ display: tab === "shipping" ? "block" : "none" }}>
        <Label>shipping</Label>
      </div>
      <div style={{ display: tab === "status" ? "block" : "none" }}>
        <StatusForm initialData={null} />
      </div>
    </>
  );

}
