'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';

export function useProductFormFilters() {

  const [tab, setTab] = useQueryState(
    'tab',
    searchParams.tab
      .withOptions({ shallow: false, throttleMs: 100 })
      .withDefault('')
  );

  return {
    tab,
    setTab
  };
}
