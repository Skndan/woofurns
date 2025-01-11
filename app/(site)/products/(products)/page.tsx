import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import ProductListingPage from './_components/product-listing-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Products'
};

export default function ProfilePage({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <ProductListingPage />
}
