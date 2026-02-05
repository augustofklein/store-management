import { Company } from "../../../model/company/type";

export const executeProcessGetCompanies = async (
  user: string,
  password: string
): Promise<Company[]> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/v1/auth/companies`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${user}:${password}`)}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data: Company[] = await response.json();

    return data;
  } catch (error: any) {
    throw error;
  }
};
