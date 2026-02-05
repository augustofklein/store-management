import { useCallback, useState } from "react";
import { useAuth } from "../../../domains/auth";
import AuthInput from "@/components/Auth/AuthInput";
import { useCompanyUserService } from "../../../domains/company";
import { Company } from "../../../model/company/type";

export default function Authentication() {
  const { loginByCompany } = useAuth();
  const [loading, setLoading] = useState(false);
  const { getCompanies } = useCompanyUserService();
  const [basicAuthValidated, setBasicAuthValidated] = useState(false);
  const [companies, setCompanies] = useState<Company[]>();

  const [username, setUsername] = useState("augusto_klein@hotmail.com");
  const [password, setPassword] = useState("123");

  const validateLoginGetCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const companiesArray = await getCompanies(username, password);
      setCompanies(companiesArray);
      setBasicAuthValidated(true);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectCompany = (company: Company) => {
    loginByCompany(username, password, company.companyId);
  };

  return !basicAuthValidated ? (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3"></div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className={`text-3xl font-bold mb-5`}>Enter with your account</h1>

        <AuthInput
          label="Username"
          tipo="text"
          valor={username}
          valorMudou={setUsername}
          obrigatorio
        />
        <AuthInput
          label="Password"
          tipo="password"
          valor={password}
          valorMudou={setPassword}
          obrigatorio
        />

        <hr className="my-6 border-gray-300 w-full" />

        <button
          onClick={() => validateLoginGetCompanies()}
          className={`
                        w-full bg-blue-500 hover:bg-blue-400
                        text-white rounded-lg px-4 py-3 flex justify-center items-center
                    `}
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
          ) : (
            "Enter"
          )}
        </button>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Select a Company
        </h1>

        <div className="block md:hidden space-y-4">
          {companies?.map((company) => (
            <div
              key={company.companyId}
              onClick={() => handleSelectCompany(company)}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Document Number</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {company.documentNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Company Name</p>
                  <p className="text-xl font-bold text-indigo-600">
                    {company.companyName}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors">
                  Select Company
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout: Table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  Document Number
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Company Name
                </th>
              </tr>
            </thead>
            <tbody>
              {companies?.map((company, index) => (
                <tr
                  key={company.companyId}
                  onClick={() => handleSelectCompany(company)}
                  className={`cursor-pointer hover:bg-indigo-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                    {company.documentNumber}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-medium">
                    {company.companyName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
