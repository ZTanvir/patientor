import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatientById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, entryData: EntryWithoutId) => {
  try {
    const { data } = await axios.post(
      `${apiBaseUrl}/patients/${id}/entries`,
      entryData
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const messages = JSON.stringify(
        error.response?.data?.error || error.message
      );

      throw new Error(messages);
    }
  }
};

export default {
  getAll,
  create,
  getPatientById,
  addEntry,
};
