import BookItemSecond from '@/Components/ui/BookItemSecond'
import { fetchBooksOfCategory } from '@/lib/helpers'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'

interface Props {}

const Index = () => {
    const router = useRouter()

    const category = router.query.category as string

    const {data , isLoading , error } = useQuery(['books', category], () => fetchBooksOfCategory(category))


    const getBookSlugHandler = (slug: string) => {
        router.push(`/details/${slug}`); //pushing to details page api with the selected items SLUG
      };


  return <div>
        {isLoading && <h1>Loading</h1>}

        {data && (
            data.map((item : any , i : number)=>(
                <BookItemSecond
                key={i}
                title={item.titre}
                image={item.imageUrl1}
                rating={item.rating}
                onClick={() => getBookSlugHandler(item.slug)}
                prix={item.prix}
              />
            ))
        )}
  </div>
}

export default Index