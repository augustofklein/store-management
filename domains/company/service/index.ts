import { apiFetch } from "@/utils/apiClient";
import { Company } from "../../../model/company/type";

export const executeProcessGetCompanies = async (
  user: string,
  password: string,
): Promise<Company[]> => {
  return await apiFetch<Company[]>(
    "/v1/auth/companies",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${user}:${password}`)}`,
      },
    },
    false,
  );
};
