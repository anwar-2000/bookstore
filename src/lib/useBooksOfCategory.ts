import { useQuery } from 'react-query';
import { fetchBooksOfCategory } from './helpers';

export function useBooksOfCategory(categorie: string) {
  return useQuery(['books', categorie], () => fetchBooksOfCategory(categorie));
}