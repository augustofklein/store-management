export const executeProcessDeleteProduct = async (
  form: GroupDatabaseForm,
): Promise<GroupDatabases[]> => {
  return await requestErrorWrapper(async () => {
    const response = await api.post(
      `/api-er/v1/group/databases`,
      {
        ...form,
      },
      {
        headers: {
          'Group-Name': `${form.groupName}`,
        },
      },
    );
    return response.data;
  });
};
