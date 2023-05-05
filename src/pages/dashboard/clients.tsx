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


import { checkAdminStatus, fetchStripe } from "@/lib/helpers";
import { Check, CircleSlashed } from "lucide-react";
import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";


interface MyPageProps {
  session: any;
  
}



const Clients : NextPage<MyPageProps> = ({ session })=> {


  const [searchTermCustomer, setSearchTermCustomer] = useState("");
  const [searchTermPayments, setSearchTermPayments] = useState("");



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


  const { isLoading, data, isError, error, refetch } = useQuery(
    ["stripeclients"],
    () => fetchStripe()
  );

  const [showCustomers, setShowCustomers] = useState<boolean>(true);
  const totalRevenue = data?.totalRevenue || 0;

  const customers = data?.customers || [];
  const payments = data?.payments || [];

  const filtersCustomers = customers?.filter((customer: any) => {
    const email = customer.email.toLowerCase();
    const searchTerm = searchTermCustomer?.toLowerCase();
    return searchTerm && email.includes(searchTerm);
  });
  

  const filteredPayments = payments?.filter((payment: any) => { 
    const email = payment.billing_details.email;
    return email && email.toLowerCase().includes(searchTermPayments.toLowerCase());
  });

  const handleCustomersClick = () => {
    setShowCustomers(true);
  };

  const handlePaymentsClick = () => {
    setShowCustomers(false);
  };

  return (
    <Container>
      <Header>
        <Button onClick={handleCustomersClick}>Customers</Button>
        <Button onClick={handlePaymentsClick}>Payments</Button>
      </Header>
       
      {showCustomers ? <>
        <div className="controls__input">
                <input type="text"
                 placeholder="Rechercher Un Livre..."
                 value={searchTermCustomer}
                 onChange={(e) => setSearchTermCustomer(e.target.value)} />
              </div>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtersCustomers.map((customer: any) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </> : <>

        <Total> Total :  {totalRevenue / 100 } €</Total>
        <div className="controls__input">
                <input type="text"
                 placeholder="Rechercher Un Livre..."
                 value={searchTermPayments}
                 onChange={(e) => setSearchTermPayments(e.target.value)} />
              </div>
        <Table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Country</th>
              <th>Address Line 1</th>
              <th>Name</th>
              <th>Méthode</th>
              <th>Recu</th>
              <th>Status</th>
              <th>Remboursé </th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment: any) => (
              <tr key={payment.id}>
                <td>{payment.amount / 100}€</td>
                <td>{payment.billing_details.email}</td>
                <td>{payment.billing_details.phone}</td>
                <td>{payment.billing_details.address.city}</td>
                <td>{payment.billing_details.address.country}</td>
                <td>{payment.billing_details.address.line1}</td>
                <td>{payment.billing_details.name}</td>
                <td>{payment.payment_method_details.card.brand}</td>
                <Link href={payment.receipt_url} target="_blank"><td>Afficher le Recu</td></Link>
                <td>{payment.status === 'succeeded' ? <Check color="green" size={25} /> : <CircleSlashed color="red" size={25} />}</td>
                <td>{payment.refunded === false ? 'Non' : 'Oui'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>}
    </Container>
  );
};

export default Clients;
const Container = styled.div`
  max-width: 100vw;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  margin:  auto;
  overflow : scroll;
  min-height : 100vh;


  .controls__input{
    margin-bottom : 2rem;
      input {
        padding : 1rem 3rem;
        border-radius : 10px;
        background : none;
        outline : 1px solid black;
      }
    }
  
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Button = styled.button`
      padding : 1rem 2rem;
      background-color : black;
      color : white;
      border-radius : 20px;
      font-size: 18px;
      cursor: pointer;
      margin-top : 3rem;
      margin-left : 1rem;
      transition : all 400ms ease-in-out;

  &:hover {
    background-color: #ece7e7;
    color: #221717;
  }
`;

const Table = styled.table`
  background : white;
  width: 100%;
  border-collapse: collapse;
  margin-left : 1rem;
  overflow : scroll;
  margin-bottom : 10rem;

  thead{
    border-bottom: 2px solid black;
  }
  td ,th {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #eee;
  }
`;
const Total = styled.h1`
  font-size : 60px;
  color : green;
  font-weight : bold;
`