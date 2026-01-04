import {
  TextField,
  Button,
  Alert,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useState } from "react";
import patients from "../../services/patients";
import {
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from "../../types";

const HospitalEntryForm = ({ userId }: { userId: string }) => {
  const [description, setDescription] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosticCode, setDiagnosticCode] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [errorMsg, setErrorMsg] = useState<null | []>(null);

  const handleHospitalEntryForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formData: Omit<HospitalEntry, "id"> = {
      date: entryDate,
      type: "Hospital",
      specialist: specialist,
      diagnosisCodes: diagnosticCode.split(","),
      description: description,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };
    try {
      setErrorMsg(null);
      const result = await patients.addEntry(userId, formData);
    } catch (error) {
      if (error instanceof Error) {
        const errors = JSON.parse(error.message);
        setErrorMsg(errors);
      }
    }
  };
  return (
    <div>
      <div>
        {errorMsg?.map((error) => (
          <Alert
            key={`${error.message}-${error?.path?.length}`}
            severity="error"
          >
            {error.message}
          </Alert>
        ))}
      </div>
      <form onSubmit={handleHospitalEntryForm}>
        <div>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="standard-basic"
            label="Description"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            fullWidth
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            id="standard-basic"
            label="Date"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            fullWidth
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            id="standard-basic"
            label="Specialist"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="standard-basic"
            value={diagnosticCode}
            onChange={(e) => setDiagnosticCode(e.target.value)}
            label="Diagnostic code"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            fullWidth
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            label="Discharge date"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            fullWidth
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
            label="Discharge criteria"
            variant="standard"
          />
        </div>

        <div>
          <Button color="error" variant="contained">
            Cancel
          </Button>
          <Button color="primary" type="submit" variant="contained">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

const OccupationalHealthcareForm = ({ userId }: { userId: string }) => {
  const [description, setDescription] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosticCode, setDiagnosticCode] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMsg, setErrorMsg] = useState<null | []>(null);

  const handleHospitalEntryForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formData: Omit<OccupationalHealthcareEntry, "id"> = {
      date: entryDate,
      type: "OccupationalHealthcare",
      specialist: specialist,
      diagnosisCodes: diagnosticCode.split(","),
      description: description,
      employerName: employerName,
      sickLeave: {
        startDate: startDate,
        endDate: endDate,
      },
    };
    try {
      setErrorMsg(null);
      const result = await patients.addEntry(userId, formData);
    } catch (error) {
      if (error instanceof Error) {
        const errors = JSON.parse(error.message);
        setErrorMsg(errors);
      }
    }
  };
  return (
    <div>
      <div>
        {errorMsg?.map((error, index) => (
          <Alert key={index} severity="error">
            {error.message}
          </Alert>
        ))}
      </div>
      <form onSubmit={handleHospitalEntryForm}>
        <div>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="standard-basic"
            label="Description"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            fullWidth
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            id="standard-basic"
            label="Date"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            fullWidth
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            id="standard-basic"
            label="Specialist"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="standard-basic"
            value={diagnosticCode}
            onChange={(e) => setDiagnosticCode(e.target.value)}
            label="Diagnostic code"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            fullWidth
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            label="Discharge date"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            fullWidth
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            label="Employer Name"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            label="Start Date"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            label="End Date"
            variant="standard"
          />
        </div>

        <div>
          <Button color="error" variant="contained">
            Cancel
          </Button>
          <Button color="primary" type="submit" variant="contained">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

const HealthCheckEntryForm = ({ userId }: { userId: string }) => {
  const [description, setDescription] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosticCode, setDiagnosticCode] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [errorMsg, setErrorMsg] = useState<null | []>(null);

  const handleHospitalEntryForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formData: Omit<HealthCheckEntry, "id"> = {
      date: entryDate,
      type: "HealthCheck",
      specialist: specialist,
      diagnosisCodes: diagnosticCode.split(","),
      description: description,
      healthCheckRating: healthCheckRating,
    };
    try {
      setErrorMsg(null);
      const result = await patients.addEntry(userId, formData);
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        const errors = JSON.parse(error.message);
        setErrorMsg(errors);
      }
    }
  };
  return (
    <div>
      <div>
        {errorMsg?.map((error, index) => (
          <Alert key={index} severity="error">
            {error.message}
          </Alert>
        ))}
      </div>
      <form onSubmit={handleHospitalEntryForm}>
        <div>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="standard-basic"
            label="Description"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            fullWidth
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            id="standard-basic"
            label="Date"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            fullWidth
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            id="standard-basic"
            label="Specialist"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="standard-basic"
            value={diagnosticCode}
            onChange={(e) => setDiagnosticCode(e.target.value)}
            label="Diagnostic code"
            variant="standard"
          />
        </div>

        <div>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
              autoWidth
              label="Health Rating"
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>LowRisk</MenuItem>
              <MenuItem value={2}>HighRisk</MenuItem>
              <MenuItem value={3}>Critical</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <Button color="error" variant="contained">
            Cancel
          </Button>
          <Button color="primary" type="submit" variant="contained">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

const NewEntryForm = ({ userId }: { userId: string }) => {
  const [formType, setFormType] = useState<
    "Hospital" | "OccupationalHealthcare" | "HealthCheck" | ""
  >("");

  function renderForm() {
    switch (formType) {
      case "HealthCheck":
        return <HealthCheckEntryForm userId={userId} />;
      case "Hospital":
        return <HospitalEntryForm userId={userId} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareForm userId={userId} />;

      default:
        break;
    }
  }
  const handleFromType = (event: SelectChangeEvent) => {
    setFormType(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Entries</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formType}
          label="None"
          onChange={handleFromType}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Hospital"}>Hospital</MenuItem>
          <MenuItem value={"OccupationalHealthcare"}>
            OccupationalHealthcare
          </MenuItem>
          <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
        </Select>
      </FormControl>
      {renderForm()}
    </div>
  );
};
export default NewEntryForm;
