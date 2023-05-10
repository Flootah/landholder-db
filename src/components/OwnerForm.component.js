import { Button, TextField, InputField, Select, MenuItem, FormHelperText } from "@mui/material";
import PageContainer from "./PageContainer.component";

const OwnerForm = ({ onSubmit, form, setForm, editing }) => {
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return <PageContainer>
    <form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>{editing ? "Edit Owner" : "Create Owner"}</h1>
      <TextField
        label="Owner Name"
        type="text"
        variant="standard"
        name="OwnerName"
        value={form.OwnerName}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />

      <FormHelperText>Entity Type</FormHelperText>
      <Select
        label = "Entity Type"
        type = "text"
        variant="standard"
        name="EntityType"
        value={form.EntityType}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }}
        >
        <MenuItem value={"Company"}>Company</MenuItem>
        <MenuItem value={"Individual"}>Individual</MenuItem>
        <MenuItem value={"Investor"}>Investor</MenuItem>
        <MenuItem value={"Trust"}>Trust</MenuItem>
      </Select>

      <FormHelperText>Owner Type</FormHelperText>
      <Select
        label = "Owner Type"
        type = "text"
        variant="standard"
        name="OwnerType"
        value={form.OwnerType}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }}
        >
        <MenuItem value={"Competitor"}>Competitor</MenuItem>
        <MenuItem value={"Seller"}>Seller</MenuItem>
        <MenuItem value={"Investor"}>Investor</MenuItem>
        <MenuItem value={"Professional"}>Professional</MenuItem>
      </Select>
      

      <TextField
        label="Address"
        type="text"
        variant="standard"
        name="Address"
        value={form.Address}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
{/* 
        <TextField required
        label="Total Number of Land Holdings"
        type="text"
        variant="outlined"
        name="TotalNumberOfLandHoldings"
        value={form.TotalNumberOfLandHoldings}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} /> */}
      <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
        {editing ? "Update" : "Create"} Owner
      </Button>
    </form>
  </PageContainer>;
}

export default OwnerForm;