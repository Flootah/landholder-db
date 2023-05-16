import { useContext, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer.component";
import { UserContext } from "../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../realm/constants";
import HoldingForm from "../components/HoldingForm.component";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";





const  EditHolding = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
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


  // GraphQL query to edit a holding
  const updateHoldingMutation = gql`
  mutation EditHolding($query: LandholdingQueryInput!, $set: LandholdingUpdateInput!) {
    updateOneLandholding(query: $query, set: $set) {
      _id
    }
  }
  `;

  // search for an owner by id
  const curHoldingQuery = gql`
  query searchHolding($id: ObjectId){
    landholdings (query:{_id: $id}) {
      Name
      Owner
      LegalEntity
      NetMineralAcres
      MineralOwnerRoyalty
      SectionName
      Section
      Township
      Range
      TitleSource
    }
  }
  `

  const updateVariables = {
    query: {
      _id: id
    },
    set: {
      Name: form.Name,
      Owner: form.Owner,
      LegalEntity: form.LegalEntity,
      NetMineralAcres: form.NetMineralAcres,
      MineralOwnerRoyalty: form.MineralOwnerRoyalty,
      SectionName: form.SectionName,
      Section: form.Section,
      Township: form.Township,
      Range: form.Range,
      TitleSource: form.TitleSource,
    },
  };

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` };

  const loadCurHolding = () => request(GRAPHQL_ENDPOINT,
    curHoldingQuery,
    {"id": id},
    headers
  );

  const { isLoading, error, data, refetch } = useQuery("curHolding", loadCurHolding, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const {Name, Owner, LegalEntity, NetMineralAcres, MineralOwnerRoyalty, SectionName, Section, Township, Range, TitleSource} = data.landholdings[0]
      setForm({
        Name: Name,
        Owner: Owner,
        LegalEntity: LegalEntity,
        NetMineralAcres: NetMineralAcres,
        MineralOwnerRoyalty: MineralOwnerRoyalty,
        SectionName: SectionName,
        Section: Section,
        Township: Township,
        Range: Range,
        TitleSource: TitleSource,
      })
    }
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const { Section, Township, Range } = form;
    // verify input
    if(!Section.match(/\d{3}/)) {
      alert("Invalid Section.\n Section needs to be three digits. (three characters)");
      return;
    }

    if(!Township.match(/\d{3}[N|S]/)) {
      alert("Invalid Township.\n Township needs to be three digits, followed by a capital N or S. (four characters)");
      return;
    }

    if(!Range.match(/\d{3}[E|W]/)) {
      alert("Invalid Range.\n Township needs to be three digits, followed by a capital E or W. (four characters)");
      return;
    }

    // TODO change respective holding values when OwnerName is edited

    try {
      await request(GRAPHQL_ENDPOINT, updateHoldingMutation, updateVariables, headers);

      // Navigate to the Home page after creating an expense
      navigate(`/`);
    } catch (error) {
      alert(error)
      console.log(error)
    }
  };

  return <PageContainer>
    <HoldingForm onSubmit={onSubmit} form={form} setForm={setForm} editing={true} title="Edit Holding" />
  </PageContainer>
}

export default EditHolding;