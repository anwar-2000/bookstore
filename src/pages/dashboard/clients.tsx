import { fetchStripe } from "@/lib/helpers";
import { Check, CircleSlashed } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

interface Props {}

const Clients = () => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    ["stripeclients"],
    () => fetchStripe()
  );

  const [showCustomers, setShowCustomers] = useState<boolean>(true);

  const customers = data?.customers || [];
  const payments = data?.payments || [];

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
      {showCustomers ? (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer: any) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
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
            {payments.map((payment: any) => (
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
      )}
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

  th,
  td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #eee;
  }
`;