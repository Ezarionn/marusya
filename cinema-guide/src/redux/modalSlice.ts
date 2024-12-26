import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  isOpen: boolean;
  modalType: string | null;
}

const initialState: modalState = {
  isOpen: false,
  modalType: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state => {
      state.isOpen = !state.isOpen
    }),
    setModalType: (state, action: PayloadAction<string>) => {
      state.modalType = action.payload
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true
      state.modalType = action.payload
    },
    closeModal: (state) => {
      state.isOpen = false
      state.modalType = null
    },
  },
  selectors: { selectModal: modal => modal.isOpen }
})

export const { toggleModal, openModal, closeModal } = modalSlice.actions
export const { selectModal } = modalSlice.selectors