
import BookItemSecond from '@/Components/ui/BookItemSecond'
import { fetchBooksOfCategory } from '@/lib/helpers'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

interface Props {}

const Index = () => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
    const router = useRouter()
    const category = router.query.category as string
    if(category === "vetements"){
      const {data , isLoading } = useQuery(['articles', category], () => fetchBooksOfCategory(category))
      setloading(isLoading)
      setarticles(data);
    }else if (category === "materiaux"){
      const {data , isLoading } = useQuery(['articles', category], () => fetchBooksOfCategory(category))
      setloading(isLoading)
      setarticles(data);
    }else {
      const {data , isLoading } = useQuery(['articles', category], () => fetchBooksOfCategory(category))
      setloading(isLoading)
      setarticles(data);
    }
    


    const getBookSlugHandler = (slug: string) => {
        router.push(`/details/${slug}`); //pushing to details page api with the selected items SLUG
      };


  return <div>
        {loading && <h1>Loading</h1>}

        {articles && (
            articles.map((item : any , i : number)=>(
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