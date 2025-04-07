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
        listingDetail: Listing;
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
        listingDetail: {
            id: 0,
            user_id: 0,
            title: '',
            description: '',
            location: '',
            exchange_items: '',
            price: 0,
            status: listingStatus.available
        },
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
                listingDetail: Listing;
                isVisible: boolean;
            }>
        ) => {
            state.listingDetailView = action.payload;
        },
        setListingDetailViewVisibility: (state, action: PayloadAction<boolean>) => {
            state.listingDetailView.isVisible = action.payload;
        },
    },
});

export const {setLoading, setNotification, setListingDetailView, setListingDetailViewVisibility} = commonPopUpSlice.actions;
export default commonPopUpSlice.reducer;