import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Typography } from "@mui/material";
import type { Patient } from "../../types";
import patients from "../../services/patients";
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";

const Patient = ({
  patient,
  userId,
}: {
  patient: null | Patient;
  userId: string;
}) => {
  return (
    <div>
      {patient && (
        <div>
          <Typography fontSize="2rem">
            {patient.name}
            <span>
              {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
            </span>
          </Typography>
          <Typography fontSize="1rem">ssn: {patient.ssn}</Typography>
          <Typography fontSize="1rem">
            occupation: {patient.occupation}
          </Typography>

          <div>
            <NewEntryForm userId={userId} />
          </div>

          <Typography fontSize="1.5rem">entries</Typography>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    async function fetchPatient() {
      if (id) {
        const patient = await patients.getPatientById(id);
        setPatient(patient);
      }
    }
    fetchPatient();
  }, [id]);

  return (
    <div>{id && patient && <Patient patient={patient} userId={id} />}</div>
  );
};
export default PatientDetails;
