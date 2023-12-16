import getUnicodeFlagIcon from 'country-flag-icons/unicode';

export const getDirtyFieldsValues = <T>(dirtyFields: string[], data: T): Partial<T> => {
  const reqData: Partial<T> = {};
  dirtyFields.forEach((key) => {
    reqData[key as keyof T] = data[key as keyof T];
  });
  return reqData;
};

export const generateAvatarImage = (file?: File | null, url?: string | null) => {
  if (file) {
    return URL.createObjectURL(file);
  }
  if (url && url.startsWith('blob')) {
    return url;
  }

  if (url) {
    return `${process.env.REACT_APP_API}/avatar/${url}`;
  }
  return '';
};

export const languages = [
  {
    label: 'ქართული',
    key: 'ka' as const,
    icon: getUnicodeFlagIcon('GEO'),
  },
  {
    label: 'English',
    key: 'en' as const,
    icon: getUnicodeFlagIcon('GB'),
  },
];
