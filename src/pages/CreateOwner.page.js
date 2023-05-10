import { useContext, useState } from "react";
import PageContainer from "../components/PageContainer.component";
import { UserContext } from "../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../realm/constants";
import OwnerForm from "../components/OwnerForm.component";
import { useNavigate } from "react-router-dom";

const CreateOwner = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Some prefilled form state
  const [form, setForm] = useState({
    OwnerName: "John Doe",
    EntityType: "Company",
    OwnerType: "Competitor",
    Address: "123 Main St.",
    TotalNumberOfLandHoldings: 0,
  });

  // GraphQL query to create an expense
  const createExpenseQuery = gql`
  mutation AddOwner($data: OwnerInsertInput!) {
    insertOneOwner(data: $data) {
      _id
    }
  }
  `;

  
  const searchOwnerQuery = gql`
  query searchOwner($name: String, $address: String){
    owners (query:{OR: [{OwnerName: $name},{Address:$address}] }) {
      OwnerName
      Address
    }
  }
  `

  // All the data that needs to be sent to the GraphQL endpoint
  // to create an expense will be passed through queryVariables.
  const queryVariables = {
    data: {
      OwnerName: form.OwnerName,
      EntityType: form.EntityType,
      OwnerType: form.OwnerType,
      Address: form.Address,
      TotalNumberOfLandHoldings: parseInt(form.TotalNumberOfLandHoldings),
    }
  };

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { OwnerNamef } = form;
    //console.log(form.OwnerName)

    try {
      var curOwners
      curOwners = await request(GRAPHQL_ENDPOINT, searchOwnerQuery, {"name": form.OwnerName, "address": form.Address}, headers)
      // console.log(curOwners)
      // console.log(typeof(curOwners.owners))
      // console.log(curOwners.owners.length)
    
      if(curOwners.owners.length > 0) {
        alert("Owner with this name or address already exists!");
        return;
      }

      await request(GRAPHQL_ENDPOINT, createExpenseQuery, queryVariables, headers);

      // Navigate to the Home page after creating an expense
      navigate(`/`);
    } catch (error) {
      alert(error)
    }
  };

  return <PageContainer>
    <OwnerForm onSubmit={onSubmit} form={form} setForm={setForm} title="Create Owner" />
  </PageContainer>
}

export default CreateOwner;