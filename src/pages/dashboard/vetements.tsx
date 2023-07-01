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
        destination: "/users/login",
        permanent: false,
      },
    };
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
import { deleteVetements, fetchVetements } from "@/lib/vetementHelpers";
import ActionButtons from "@/Components/ui/ActionButtons";
import ProductForm from "@/Components/ProductForm";


interface MyPageProps {
   session: any;
    existdata: {
    vetmentId: "";
    titre: "";
    auteur: "";
    categorie: "";
    imageUrl1: "";
    imageUrl2: "";
    imageUrl3: "";
    description: "";
    rating: 0;
    quantite: 0;
    etat: "";
    prix: 0;
    poids : 0;
  };
}

const Index: NextPage<MyPageProps> = ({ session, existdata }) => {

  const [searchTerm, setSearchTerm] = useState("");


  const [isAdmin, setIsAdmin] = useState<boolean>();


  /** CHECK IF USER IN SESSION IS ADMIN */
  const router = useRouter();
  useEffect(() => {
    const checkAdmin = async () => {
      const email = session.user.email;
      const response = await checkAdminStatus(email);
      if (!response) {
        toast.error("Vous êtes pas un Admin", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
        router.push("/users/login");
      } else {
        toast.success(`Bonjour Mr ${email}`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
      checkAdmin();
    };
  }, [session.user.email]);
  const [vetmentId, setvetmentId] = useState<string>("");

  const [showEditForm, setShowEditform] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const [existingData, setExistingData] = useState(existdata);

  const [addSignal, setaddSignal] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  /** REACT-QUERY */
  const { isLoading, data, isError, error, refetch } = useQuery(
    ["vetement", page, limit],
    () => fetchVetements(page, limit)
  );

  useEffect(() => {
    refetch();
  }, [data, addSignal]);

  useEffect(() => {
    showToast(session.user.email);
  }, [session.user.email]);

  /** CLICK HANDLERS */
  const deleteBookFromIdClickHanlder = async (vetmentId: string) => {
    //console.log(vetmentId);
    try {
      const response = await deleteVetements(vetmentId);
      !response &&
        toast.error("Produits Not Deleted", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      toast.success("Produits Deleted", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      refetch();
    } catch (error) {
      //console.log(error);
    }
  };
  const updateBookFromIdClickHanlder = async (thevetmentId: string) => {
    setvetmentId(thevetmentId);
  };

  /** LOGIC FOR CONTROLLING THE LIMIT AND PAGE */

  const addPageHandler = () => setPage(page + 1);
  const addLimitHandler = () => setLimit(limit + 1);

  const minusPageHandler = () => setPage(page > 1 ? page - 1 : 1);
  const minusLimitHandler = () => setLimit(limit > 15 ? limit - 1 : 15);


  /** FILTERING LOGIC */

  const filteredBooks = data?.filter((produit: any) => { 
    const titre = produit.nom;
    return titre && titre.toLowerCase().includes(searchTerm.toLowerCase());
  });
 
  return (
    <>
      {/** if Error when  Fetching notify it */}
      {error &&
        toast.error(`Error : ${error}`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        })}

      {!isAdmin && (
        <Container>
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
                  bookId={vetmentId}
                />
              ) : (
                <div className="form">
                <ProductForm onSubmit={() => setaddSignal(addSignal + 1)} />
                </div>
              )}
            </FormDiv>
          )}

          <>
            <button id="showFormTrigger" onClick={() => setShowForm(!showForm)}>
              {showForm ? "FERMER LE FORMULAIRE" : "AFFICHER LE FORMULAIRE"}
            </button>

            {showEditForm && (
              <button
                id="showFormTrigger"
                onClick={() => setShowEditform(!showForm)}
              >
                Formulaire de rajouter les Livres
              </button>
            )}
              <ActionButtons />
            <div className="controls">
              <div className="controls__page">
                <ArrowBigLeft onClick={minusPageHandler} /> Pages : {page}
                <ArrowBigRight onClick={addPageHandler} />
              </div>
              <div className="controls__limit">
                <ArrowBigLeft onClick={minusLimitHandler} /> Limite : {limit}
                <ArrowBigRight onClick={addLimitHandler} />
              </div>
              <div className="controls__input">
                <input type="text"
                 placeholder="Rechercher Un Livre..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)} />
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
                    <th>Modifier</th>
                    <th>Supprimer</th>
                  </TR>
                </thead>

                <tbody>
                  {filteredBooks.map((produit: any) => (
                    <TR key={produit._id}>
                      <td>
                        <img src={produit.imageUrl1} alt={produit.nom} />
                      </td>
                      <td>{produit.nom}</td>
                      <td>{produit.price}€</td>
                     
                      <td>
                        <button
                          id="edit"
                          onClick={() => {
                            updateBookFromIdClickHanlder(produit._id);
                            setShowEditform(true);
                            setExistingData(produit);
                          }}
                        >
                          Modifier
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteBookFromIdClickHanlder(produit._id)}
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
        </Container>
      )}
      {isAdmin && (
        <Container>
          <div className="disaproved">
            <h1>VOUS ETES PAS ADMIN DE CE SITE !</h1>
            <img src="./notAdmin.png" alt="" />
          </div>
        </Container>
      )}
    </>
  );
};

export default Index;

const Container = styled.div`
  display: flex;
  min-height : 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
  gap: 2rem;
  position : relative;

  .form{
    transform : translateX(33rem);
  }

  .actions {
    position : absolute;
    top : -3.4rem;
    left : 0.3rem;
    button {
      margin-right : 0.5rem;
      margin-bottom : 1rem;
    }
    #clients {
      margin-left: 1rem;
    }
    #Deconnecter {
      margin-left: 1rem;
      padding: 0.3rem 0.7rem;
      background-color: #f0ecec;
      color: black;
      border: solid 1px black;
      border-radius: 20px;
      transition: all ease-in 100ms;
    }
    #Deconnecter:hover {
      background-color: black;
      color: white;
    }

    button {
      padding: 0.3rem 0.7rem;
      background-color: black;
      color: white;
      border-radius: 20px;
    }
  }
  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;

    .controls__input{
      input {
        padding : 1rem 3rem;
        border-radius : 10px;
        background : none;
        outline : 1px solid black;
      }
    }

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
  .disaproved {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    h1 {
      font-size: 4rem;
    }

    img {
      width: 500px;
      height: 500px;
      mix-blend-mode: darken;
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
    text-align: center;
    font-weight: bold;
    font-size: 20px;
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
  overflow-y: scroll;
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
