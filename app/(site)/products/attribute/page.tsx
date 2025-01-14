import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers'; 
import AttributeListingPage from './_components/attribute-listing-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Attributes'
};

export default function ProfilePage({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <AttributeListingPage />
}
