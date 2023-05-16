import { useContext, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer.component";
import { UserContext } from "../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../realm/constants";
import OwnerForm from "../components/OwnerForm.component";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";




const  EditOwner = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Some prefilled form state
  const [form, setForm] = useState({
    OwnerName: "John Doe",
    EntityType: "Company",
    OwnerType: "Competitor",
    Address: "123 Main St.",
    TotalNumberOfLandHoldings: 0,
  });


  // GraphQL query to edit an expense
  const updateOwnerMutation = gql`
  mutation EditOwner($query: OwnerQueryInput!, $set: OwnerUpdateInput!) {
    updateOneOwner(query: $query, set: $set) {
      _id
    }
  }
  `;

  // search for an owner by id
  const curOwnerQuery = gql`
  query searchOwner($id: ObjectId){
    owners (query:{_id: $id}) {
      OwnerName
      EntityType
      OwnerType
      Address
    }
  }
  `

  // searches for all owners who match the given name or address, but not itself (given id)
  const searchOwnerQuery = gql`
  query searchOwner($name: String, $address: String, $excludeId: ObjectId){
    owners(query:{
      _id_ne: $excludeId,
      AND: {OR: [{Address: $address}, {OwnerName: $name}]}}
    ){
      OwnerName
      Address
      _id
    }
  }

  `

  const searchOwnerQueryVariables = {
    "name": form.OwnerName,
    "address": form.Address,
    "excludeId": id,  
  }

  const updateVariables = {
    query: {
      _id: id
    },
    set: {
      OwnerName: form.OwnerName,
      EntityType: form.EntityType,
      OwnerType: form.OwnerType,
      Address: form.Address,
    },
  };

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` };

  const loadCurOwner = () => request(GRAPHQL_ENDPOINT,
    curOwnerQuery,
    {"id": id},
    headers
  );

  const { isLoading, error, data, refetch } = useQuery("curOwner", loadCurOwner, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const {OwnerName, OwnerType, EntityType, Address} = data.owners[0]
      setForm({
        OwnerName: OwnerName,
        OwnerType: OwnerType,
        EntityType: EntityType,
        Address: Address,
      })
    }
  });





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

  const onSubmit = async (event) => {
    event.preventDefault();
    const { OwnerNamef } = form;

    try {
      // verify input
      const curOwners = await request(GRAPHQL_ENDPOINT, searchOwnerQuery, searchOwnerQueryVariables, headers);
      console.log(curOwners)
      if(curOwners.owners.length == 1) {
        alert("Owner with this name or address already database!")
        return;
      }

      // TODO Change related holdings OwnerName Field

      await request(GRAPHQL_ENDPOINT, updateOwnerMutation, updateVariables, headers);

      // Navigate to the Home page after creating an expense
      navigate(`/`);
    } catch (error) {
      alert(error)
    }
  };

  return <PageContainer>
    <OwnerForm onSubmit={onSubmit} form={form} setForm={setForm} editing={true} title="Edit Owner" />
  </PageContainer>
}

export default EditOwner;