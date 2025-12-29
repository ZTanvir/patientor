import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { Box, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

const boxStyle = {
  border: "1px solid black",
  padding: 2,
  borderRadius: "4px",
  margin: "8px",
};

const HospitalEntryDetails = ({ entryData }: { entryData: HospitalEntry }) => {
  return (
    <Box sx={boxStyle}>
      <Typography fontSize="1.5rem">
        {entryData.date} <MedicalServicesIcon />
      </Typography>
      <Typography fontSize="1rem">{entryData.description}</Typography>
      <Typography fontSize="1rem">
        diagnose by {entryData.specialist}
      </Typography>
    </Box>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entryData,
}: {
  entryData: OccupationalHealthcareEntry;
}) => {
  return (
    <Box sx={boxStyle}>
      <Typography fontSize="1.5rem">
        {entryData.date} <WorkIcon />
      </Typography>
      <Typography fontSize="1rem">{entryData.description}</Typography>
      <Typography fontSize="1rem">
        diagnose by {entryData.specialist}
      </Typography>
    </Box>
  );
};

const HealthCheckEntryDetails = ({
  entryData,
}: {
  entryData: HealthCheckEntry;
}) => {
  const filterHealthCheck = (healthRating: HealthCheckRating) => {
    switch (healthRating) {
      case HealthCheckRating.Healthy: //0
        return <FavoriteBorderIcon style={{ color: "green" }} />;
      case HealthCheckRating.LowRisk: //1
        return <FavoriteBorderIcon style={{ color: "yellow" }} />;
      case HealthCheckRating.HighRisk: //2
        return <FavoriteBorderIcon style={{ color: "purple" }} />;
      case HealthCheckRating.CriticalRisk: //3
        return <FavoriteBorderIcon style={{ color: "red" }} />;

      default:
        return null;
    }
  };

  return (
    <Box sx={boxStyle}>
      <Typography fontSize="1.5rem">
        {entryData.date} <HealthAndSafetyIcon />
      </Typography>
      <Typography fontSize="1rem">{entryData.description}</Typography>
      <Typography fontSize="1rem">
        diagnose by {entryData.specialist}
      </Typography>
      <div>{filterHealthCheck(entryData.healthCheckRating)}</div>
    </Box>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entryData={entry} />;

    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entryData={entry} />;

    case "HealthCheck":
      return <HealthCheckEntryDetails entryData={entry} />;

    default:
      null;
  }
};

export default EntryDetails;
