export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
    //console.log("the session is " ,session)
     if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return { props: { session } };
  }
  

import RetourCard from '@/Components/ui/RetourCard';
  import { checkAdminStatus, getAllRetour } from '@/lib/helpers';
  import { GetServerSidePropsContext , NextPage} from 'next';
  import { getSession } from 'next-auth/react';
  import { useRouter } from 'next/router';
  import React, { useEffect, useState } from 'react'
  import { useQuery } from 'react-query';
  import { ClipLoader } from 'react-spinners';
  import { toast } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
  import styled from 'styled-components';
  
  
  interface MyPageProps {
      session: any;
      
    }
  
  const Retours: NextPage<MyPageProps>= ({ session }) => {
      const [isAdmin, setIsAdmin] = useState<boolean>();
      /** CHECK IF USER IN SESSION IS ADMIN */
          const router = useRouter();
          useEffect(() => {
          const checkAdmin = async () => {
          const email = session.user.email;
          const response = await checkAdminStatus(email);
        if (!response) {
          toast.error('Vous êtes pas un Admin',{
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored"
          });
          router.push("/");
        }
          checkAdmin();}
        }, [session.user.email]);
  
  
        /** fetching FUNDS */
        const { isLoading, data, isError, error, refetch } = useQuery(
          ["dons"],
          () => getAllRetour()
        );
  /**
   * 
   * refetching if there is new data 
   */
        useEffect(() => {
          refetch();
          if (error) {
              toast.error(`${error}`,{
                  position: toast.POSITION.TOP_RIGHT,
                  theme: "colored"
                });
          }
        }, [data]);
  
        return <> {!isAdmin && <Container>
          {isLoading ? (
            <Spiner>
              <ClipLoader
                color="blue"
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Spiner>
          ) : (
            <>
              <Items>
              {data.map((retour:any , i : number) =>(
                      <RetourCard  id={retour._id}  key={i} name={retour.nom}  email={retour.email} address={retour.address} numero={retour.numero} cause={retour.cause} retour={retour.retour} />
              ))}
              </Items>
            </>
          )}
        </Container>}
        </>
      }

export default Retours

const Container = styled.div`
  display: flex;
  min-height : 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-bottom : 3rem;
  margin-top:2rem;
  gap: 2rem;
  `

const Spiner = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-left: 25rem;
`;

const Items = styled.div`
    display :  flex ;
    gap : 2rem;
    flex-wrap : wrap ;
`