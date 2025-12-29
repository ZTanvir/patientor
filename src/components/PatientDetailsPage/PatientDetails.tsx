import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Typography } from "@mui/material";
import type { Patient, Diagnosis } from "../../types";
import patients from "../../services/patients";
import diagnoses from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

const Patient = ({
  patient,
  diagnose,
}: {
  patient: null | Patient;
  diagnose: null | Diagnosis[];
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
  const [diagnose, setDiagnose] = useState<Diagnosis[] | null>([]);

  useEffect(() => {
    async function fetchPatient() {
      if (id) {
        const patient = await patients.getPatientById(id);
        setPatient(patient);
      }
    }
    fetchPatient();
  }, [id]);

  useEffect(() => {
    async function fetchDiagnoses() {
      if (id) {
        const diagnosesData = await diagnoses.getDiagnoses();
        setDiagnose(diagnosesData);
      }
    }
    fetchDiagnoses();
  }, [id]);

  return (
    <h1>{patient && <Patient patient={patient} diagnose={diagnose} />}</h1>
  );
};
export default PatientDetails;
