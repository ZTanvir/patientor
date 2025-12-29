import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Typography } from "@mui/material";
import type { Patient, Diagnosis } from "../../types";
import patients from "../../services/patients";
import diagnoses from "../../services/diagnoses";

const Patient = ({
  patient,
  diagnose,
}: {
  patient: null | Patient;
  diagnose: null | Diagnosis[];
}) => {
  patient &&
    patient.entries.forEach((entry) => {
      switch (entry.type) {
        case "HealthCheck": {
          return <div></div>;
        }
        case "Hospital": {
          return <div>b</div>;
        }
        case "OccupationalHealthcare": {
          return <div>c</div>;
        }
        default:
          return null;
      }
    });

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
            <div key={entry.id}>
              <Typography fontSize="1rem">
                {entry.date} {entry.description}
              </Typography>
              <ul>
                {entry?.diagnosisCodes?.map((code) => (
                  <li key={code}>
                    <Typography fontSize=".8rem">
                      {code}{" "}
                      {diagnose?.find((item) => item.code === code)?.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
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
