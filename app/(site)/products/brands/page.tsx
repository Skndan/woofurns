import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import BrandListingPage from './_components/brand-listing-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Brands'
};

export default function ProfilePage({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <BrandListingPage />
}
