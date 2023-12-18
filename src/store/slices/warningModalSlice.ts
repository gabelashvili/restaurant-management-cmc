import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WarningModalModel {
  open?: boolean;
  loading?: boolean;
  title?: string;
  description?: string;
  agreeText?: string;
  disagreeText?: string;
  onAgree?: VoidFunction;
}

const initialState: WarningModalModel = {
  open: false,
};

export const warningModalSlice = createSlice({
  name: 'warningModal',
  initialState,
  reducers: {
    setWarningModal: (state, action: PayloadAction<Partial<WarningModalModel>>) => {
      return {
        ...(action?.payload || {}),
      };
    },
    closeWarningModal: (state) => {
      return {
        ...state,
        open: false,
      };
    },
    setWarningModalLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setWarningModal, closeWarningModal, setWarningModalLoading } = warningModalSlice.actions;

export default warningModalSlice.reducer;
