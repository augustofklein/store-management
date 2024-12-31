export const useGetGroupData = () => {
    const executeGetGroupDetails = async (): Promise<GroupDetailsResponse[]> => {
      return await executeProcessGroupDetails();
    };
  
    const executeGetGroupDatabases = async (
      form: GroupDatabaseForm,
    ): Promise<GroupDatabases[]> => {
      return await executeProcessGetGroupDatabases(form);
    };
  
    const executeGetGroupTables = async (
      form: GroupTableForm,
    ): Promise<GroupTables[]> => {
      return await executeProcessGetGroupTables(form);
    };
  
    const executeGetGroupProcedures = async (
      form: GroupTableForm,
    ): Promise<GroupProcedures[]> => {
      return await executeProcessGetGroupProcedures(form);
    };
  
    return {
      executeGetGroupDetails,
      executeGetGroupDatabases,
      executeGetGroupTables,
      executeGetGroupProcedures,
    };
  };