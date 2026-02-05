import { Company } from "../../model/company/type";
import { executeProcessGetCompanies } from "./service";

export const useCompanyUserService = () => {
  const getCompanies = async (
    user: string,
    password: string
  ): Promise<Company[]> => {
    return await executeProcessGetCompanies(user, password);
  };

  return { getCompanies };
};
