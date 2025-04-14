import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listingStatus } from '../Types&Enums/Enums';

interface CommonPopupState{
    isLoading: boolean;
    notification: {
        message: string;
        type: 'success' | 'error' | 'info' | null;
        isVisible: boolean;
    };
    listingDetailView: {
        listingId: number;
        isVisible: boolean;
    };
    photoUploadView: {
        pic_url: string;
        isVisible: boolean;
    }
}

const initialState: CommonPopupState = {
    isLoading: false,
    notification: {
        message: '',
        type: 'info',
        isVisible: false,
    },
    listingDetailView: {
        listingId: 1,
        isVisible: false,
    },
    photoUploadView: {
        pic_url: '',
        isVisible: false,
    }
}

const commonPopUpSlice = createSlice({
    name: 'popUps',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setNotification: (
            state, 
            action: PayloadAction<{
                message: string; 
                type: 'success' | 'error' | 'info'; 
                isVisible: boolean;
            }>
        ) => {
            state.notification = action.payload;
        },
        setListingDetailView: (
            state,
            action: PayloadAction<{
                listingId: number;
                isVisible: boolean;
            }>
        ) => {
            state.listingDetailView = action.payload;
        },
        setListingDetailViewVisibility: (state, action: PayloadAction<boolean>) => {
            state.listingDetailView.isVisible = action.payload;
        },
        setPhotoUploadView: (
            state, 
            action: PayloadAction<{
                pic_url: string;
                isVisible: boolean;
            }>
        ) => {
            state.photoUploadView = action.payload;
        }
    },
});

export const {setLoading, setNotification, setListingDetailView, setListingDetailViewVisibility, setPhotoUploadView} = commonPopUpSlice.actions;
export default commonPopUpSlice.reducer;