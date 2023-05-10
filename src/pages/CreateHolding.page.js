import { useContext, useState } from "react";
import PageContainer from "../components/PageContainer.component";
import { UserContext } from "../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../realm/constants";
import HoldingForm from "../components/HoldingForm.component";
import { useNavigate } from "react-router-dom";

const CreateHolding = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Some prefilled form state
  const [form, setForm] = useState({
    Name: "SectionName-LegalEntity",
    Owner: "John Doe",
    LegalEntity: "Company",
    NetMineralAcres: "5",
    MineralOwnerRoyalty: "10",
    SectionName: "Section-Township-Range",
    Section: "123",
    Township: "123N",
    Range: "123E",
    TitleSource: "Class A",
  });

  // GraphQL query to create an expense
  const createHoldingQuery = gql`
  mutation AddLandHolding($data: LandholdingInsertInput!) {
    insertOneLandholding(data: $data) {
      _id
    }
  }
  `;

  const updateOwnerQuery = gql`
  mutation UpdateOwner($owner: String) {
    updateOneOwner(query: {OwnerName: $owner}, set: {TotalNumberOfLandHoldings_inc: 1}) {
      _id
    }
  }
  `;


  // All the data that needs to be sent to the GraphQL endpoint
  // to create an expense will be passed through queryVariables.
  var queryVariables = {
    data: {
      Owner: form.Owner,
      LegalEntity: form.LegalEntity,
      NetMineralAcres: form.NetMineralAcres,
      MineralOwnerRoyalty: form.MineralOwnerRoyalty,
      SectionName: form.Section + "-" + form.Township + "-" + form.Range,
      Name:  form.Section + "-" + form.Township + "-" + form.Range + "-" + form.LegalEntity,
      Section: form.Section,
      Township: form.Township,
      Range: form.Range,
      TitleSource: form.TitleSource,
    }
  };

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { amount, category, mode, title } = form;
    // make request for owner names


    try {
      await request(GRAPHQL_ENDPOINT, createHoldingQuery, queryVariables, headers);

      // Navigate to the Home page after creating an owner
      await request(GRAPHQL_ENDPOINT, updateOwnerQuery, {owner: form.Owner}, headers)
      navigate(`/`);
    } catch (error) {
      alert(error)
      console.log(error)
    }
  };

  return <PageContainer>
    <HoldingForm onSubmit={onSubmit} form={form} setForm={setForm} title="Create Holding" />
  </PageContainer>
}

export default CreateHolding;