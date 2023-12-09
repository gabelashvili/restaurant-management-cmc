export interface ResponseModel<T> {
  data: T;
  message: string | null;
  success: boolean;
}

export interface TokensModel {
  accessToken: string;
  refreshToken: string;
}

export interface MultiLangModel {
  ge: string;
  en: string;
}

export type Languages = 'ge' | 'en';
