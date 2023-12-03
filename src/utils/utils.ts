export const getDirtyFieldsValues = <T>(dirtyFields: Partial<Record<keyof T, boolean>>, data: T): Partial<T> => {
  const reqData: Partial<T> = {};
  Object.keys(dirtyFields).forEach((key) => {
    if (dirtyFields[key as keyof T]) {
      reqData[key as keyof T] = data[key as keyof T];
    }
  });
  return reqData;
};
