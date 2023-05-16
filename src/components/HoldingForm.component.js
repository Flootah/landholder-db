import { Button, TextField, InputField, Select, MenuItem,FormHelperText } from "@mui/material";
import PageContainer from "./PageContainer.component";
import { useNavigate } from "react-router-dom";

const HoldingForm = ({ onSubmit, form, setForm, editing }) => {
  const navigate = useNavigate();

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return <PageContainer>
    <form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>{editing ? "Edit Holding" : "Create Holding"}</h1>
      <TextField
        label="Owner"
        type="text"
        variant="standard"
        name="Owner"
        value={form.Owner}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <TextField
        label="Legal Entity"
        type="text"
        variant="standard"
        name="LegalEntity"
        value={form.LegalEntity}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <TextField
        label="Net Mineral Acres"
        type="text"
        variant="standard"
        name="NetMineralAcres"
        value={form.NetMineralAcres}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <TextField
        label="Mineral Owner Royalty"
        type="text"
        variant="standard"
        name="MineralOwnerRoyalty"
        value={form.MineralOwnerRoyalty}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <TextField
        label="Section"
        type="text"
        variant="standard"
        name="Section"
        value={form.Section}
        onChange={onFormInputChange}
        fullWidth
        inputProps={{ maxLength: 3 }}
        style={{ marginBottom: "1rem" }} />
      <TextField
        label="Township"
        type="text"
        variant="standard"
        name="Township"
        value={form.Township}
        onChange={onFormInputChange}
        fullWidth
        inputProps={{ maxLength: 4 }}
        style={{ marginBottom: "1rem" }} />
      <TextField
        label="Range"
        type="text"
        variant="standard"
        name="Range"
        value={form.Range}
        onChange={onFormInputChange}
        fullWidth
        inputProps={{ maxLength: 4 }}
        style={{ marginBottom: "1rem" }} />

      <FormHelperText>Title Source</FormHelperText>
      <Select
        label = "Title Source"
        type = "text"
        variant="standard"
        name="TitleSource"
        value={form.TitleSource}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }}
        >
        <MenuItem value={"Class A"}>Class A</MenuItem>
        <MenuItem value={"Class B"}>Class B</MenuItem>
        <MenuItem value={"Class C"}>Class C</MenuItem>
        <MenuItem value={"Class D"}>Class D</MenuItem>
      </Select>

      <Button style={{margin: '15px'}} variant="contained" color="primary" onClick={onSubmit} type="submit">
        {editing ? "Update" : "Create"} Holding
      </Button>
      <Button style={{margin: '15px'}} variant="contained" color="primary" onClick={() => navigate("/")}>
        Cancel
      </Button>
    </form>
  </PageContainer>;
}

export default HoldingForm;