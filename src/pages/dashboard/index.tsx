import { GetServerSidePropsContext, NextPage } from "next";
import { getSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function showToast(sessionUserEmail: string) {
  toast.success(`Bonjour ${sessionUserEmail}`, {
    position: toast.POSITION.TOP_RIGHT,
    theme: "colored",
  });
}

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



import AddBookComp from "@/Components/AddBookComp";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { checkAdminStatus, deleteBook, fetchBooks } from "@/lib/helpers";
import { ClipLoader } from "react-spinners";
import UpdateBookComp from "@/Components/UpdateBookComp";
import { useRouter } from "next/router";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

interface MyPageProps {
  session: any;
  existdata: {
    bookId: "";
    titre: "";
    auteur: "";
    categorie: "";
    image: "";
    description: "";
    rating: 0;
    quantite: 0;
    etat: "";
    prix: 0;
  };
}

const Index: NextPage<MyPageProps> = ({ session, existdata }) => {
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
  else{
    toast.success(`Bonjour Mr ${email}`,{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored"
    });
  }
    checkAdmin();}
  }, [session.user.email]);
  const [bookId, setBookId] = useState<string>("");

  const [showEditForm, setShowEditform] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const [existingData, setExistingData] = useState(existdata);

  const [addSignal, setaddSignal] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  
  /** REACT-QUERY */
  const { isLoading, data, isError, error, refetch } = useQuery(
    ["books", page, limit],
    () => fetchBooks(page, limit)
  );

  useEffect(() => {
    refetch();
  }, [data, addSignal]);

  useEffect(() => {
    
      showToast(session.user.email);
    
   
  }, [session.user.email]);

  /** CLICK HANDLERS */
  const deleteBookFromIdClickHanlder = async (bookId: string) => {
    //console.log(bookId);
    try {
     const response =  await deleteBook(bookId);
     !response && toast.error('Book Not Deleted',{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored"
    });
    toast.success('Book Deleted',{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored"
    });
      refetch();
    } catch (error) {
      //console.log(error);
    }
  };
  const updateBookFromIdClickHanlder = async (theBookId: string) => {
    setBookId(theBookId);
  };


    /** LOGIC FOR CONTROLLING THE LIMIT AND PAGE */

    const addPageHandler = () => setPage(page + 1);
    const addLimitHandler = () => setLimit(limit + 1);
  
    const minusPageHandler = () => setPage(page > 1 ? page - 1 : 1);
    const minusLimitHandler = () => setLimit(limit > 15 ? limit - 1 : 15);

  return (
    <>
     {/** if Error when  Fetching notify it */}
     {error &&  toast.error(`Error : ${error}`,{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored"
              })}

     {!isAdmin && <Container>
        {showForm && (
          <FormDiv>
            {showEditForm ? (
              <h1>Modifier Le Livre</h1>
            ) : (
              <h1>Ajouter Un Livre</h1>
            )}
            {showEditForm ? (
              <UpdateBookComp
                onUpdate={() => setaddSignal(addSignal - 1)}
                existingData={existingData}
                bookId={bookId}
              />
            ) : (
              <AddBookComp onAdd={() => setaddSignal(addSignal + 1)} />
            )}
          </FormDiv>
        )}
        
          <>
            <button id="showFormTrigger" onClick={() => setShowForm(!showForm)}>
              {showForm ? "FERMER LE FORMULAIRE" : "AFFICHER LE FORMULAIRE"}{" "}
            </button>

            {showEditForm && (
              <button
                id="showFormTrigger"
                onClick={() => setShowEditform(!showForm)}
              >
                Formulaire de rajouter les Livres
              </button>
            )}
            <div className="ajouterAdmin">
              <button onClick={()=> router.push('/dashboard/users')}> Gérer les Modérateurs </button>
              <button id="Deconnecter" onClick={() => signOut({ callbackUrl: '/users/login' })} >Déconnecter</button>
            </div>
            <div className="controls">
              <div className="controls__page">
                <ArrowBigLeft onClick={minusPageHandler} /> Pages : {page}{" "}
                <ArrowBigRight onClick={addPageHandler} />
              </div>
              <div className="controls__limit">
                <ArrowBigLeft onClick={minusLimitHandler} /> Limite : {limit}{" "}
                <ArrowBigRight onClick={addLimitHandler} />
              </div>
            </div>
            {isLoading ? (
          <Spiner>
            <ClipLoader
              color="yellow"
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Spiner>
        ) : (
            <Table>
              <thead>
                <TR>
                  <th>Image</th>
                  <th>Titre</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </TR>
              </thead>
              
              <tbody>
                {data.map((book: any) => (
                  <TR key={book._id}>
                    <td>
                      <img src={book.image} alt={book.title} />
                    </td>
                    <td>{book.titre}</td>
                    <td>{book.prix}€</td>
                    <td>{book.quantite}</td>
                    <td>
                      <button
                        id="edit"
                        onClick={() => {
                          updateBookFromIdClickHanlder(book._id);
                          setShowEditform(true);
                          setExistingData(book);
                        }}
                      >
                        Modifier
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteBookFromIdClickHanlder(book._id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </TR>
                ))}
                
              </tbody>
           
            </Table>
               )}
          </>
        
      </Container>}
      {isAdmin && <Container>
          <div className="disaproved">
                  <h1>VOUS ETES PAS ADMIN DE CE SITE !</h1>
                  <img src="./notAdmin.png" alt="" />
          </div>
        </Container>}
    </>
  );
};

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom : 3rem;
  margin-top : 2rem;
  gap: 2rem;

  .ajouterAdmin{
    align-self : start;
    margin-left : 9rem;

    #Deconnecter {
      margin-left : 1rem;
      padding : 1rem 2rem;
      background-color : #f0ecec;
      color : black;
      border : solid 1px black;
      border-radius : 20px;
      transition : all ease-in 100ms;
    }
    #Deconnecter:hover {
      background-color : black;
      color : white; 
    }

    button {
      padding : 1rem 2rem;
      background-color : black;
      color : white;
      border-radius : 20px;
    }
  }
  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;

    .controls__page {
      display: flex;
      gap: 2rem;
    }
    .controls__limit {
      display: flex;
      gap: 2rem;
    }
    /* styles for screens smaller than 768px */
    @media screen and (max-width: 767px) {
      flex-direction: column;
      margin-left: 4.3rem;
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
    background-color: #e0180a;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
`;

const Spiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;
