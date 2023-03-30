import { useQuery } from 'react-query';
import { fetchBooksOfCategory } from './helpers';

export function fetchBooksOfCat(categorie: string) {
    return useQuery(['books', categorie], () => fetchBooksOfCategory(categorie));
}