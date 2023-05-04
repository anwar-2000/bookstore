
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



import { fetchUsers , deleteUser, checkAdminStatus} from '@/lib/helpers'
import { GetServerSidePropsContext, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components'

interface MyPageProps {
    session: any;
    
  }
  
  const Users: NextPage<MyPageProps> = ({ session }) => {
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


  const [addSignal, setaddSignal] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  /** REACT-QUERY */
  const { isLoading, data, isError, error, refetch } = useQuery(
    ["users", page, limit],
    () => fetchUsers(page, limit)
  );

  useEffect(() => {
    refetch();
    if (error) {
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored"
          });
    }
  }, [data, addSignal]);


  /** CLICK HANDLERS */
  const deleteBookFromIdClickHanlder = async (userEmail: string) => {
    //console.log(bookId);
    try {
     const response =  await deleteUser(userEmail);
     !response && toast.error('User Not Deleted',{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored"
    });
    toast.success('User Deleted',{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored"
    });
      refetch();
    } catch (error) {
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored"
          });
    }
  };
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
        <div className="pagelivres">
          <button onClick={()=> router.push('/dashboard')}> Gérer les Livres </button>
          <button id="adminAjouter" onClick={()=> router.push('/users/')}> Ajouter Admin </button>
        </div>
        <Table>
          <thead>
            <TR>
              <th>Username</th>
              <th>Email</th>
              <th>Supprimer</th>
            </TR>
          </thead>
          <tbody>
            {data.map((user: any) => (
              <TR key={user._id}>
                <td>
                 {user.username} 
                </td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => deleteBookFromIdClickHanlder(user.email)}
                  >
                    Supprimer
                  </button>
                </td>
              </TR>
            ))}
          </tbody>
        </Table>
      </>
    )}
  </Container>}
  </>
}

export default Users


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom : 3rem;
  margin-top:2rem;
  gap: 2rem;

  .pagelivres{
    align-self : start;
    margin-left : 9rem;

    #adminAjouter {
        margin-left : 2rem;
        background-color : white;
        color : black;
        border : black 2px solid;
        font-weight : bold;
    }

    button {
      padding : 1rem 2rem;
      background-color : black;
      color : white;
      border-radius : 20px;
    }
  }

  .disaproved{
    display : flex;
    align-items : center;
    justify-content : center;
    flex-direction : column;
    gap : 2rem;
    h1 {
      font-size : 4rem;
    }

    img{
      width : 500px;
      height : 500px;
      mix-blend-mode : darken;
    }
  }
  .welcomeAdmin {
    margin-top: 3rem;
    font-size: 35px;
  }

  #showFormTrigger {
    padding: 1rem 3rem;
    background-color: #facc15;
    color: black;
    font-weight: 700;
    border-radius: 10px;
  }
`;
const FormDiv = styled.div`
  dislpay: flex;
  align-items: center;
  justify-content: start;
  h1 {
    text-align : center;
    font-weight : bold;
    font-size : 20px;
  }
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  border-top: 2px solid black;
  font-family: "Playfair Display SC", serif;
  thead {
    border-bottom: 2px solid black;
  }
  overflow-y : scroll;
`;

const TR = styled.tr`
  text-align: center;

  &:hover {
    background-color: #aeeaec;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }

  img {
    max-width: 50px;
    max-height: 50px;
    margin-right: 1rem;
  }
  #edit {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: #19df23;
    transition: all 0.3s ease-in-out;
  }
  button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 10px;
    background-color: #8d150d;
    cursor: pointer;
    color : white;
    font-weight : bold;
    transition: all 0.3s ease-in-out;
  }
`;

const Spiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25rem;
`;

