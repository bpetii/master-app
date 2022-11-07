import {createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showInfo: false,
        showDarkMode: true,
        showLanguage: true,
    },
    reducers: {
        toggleShowInfo: (ui) => {
            ui.showInfo = !ui.showInfo;
        },
        toggleShowDarkMode: (ui) => {
            ui.showDarkMode = !ui.showDarkMode;
        },
        toggleShowLanguage: (ui) => {
            ui.showLanguage = !ui.showLanguage;
        },
    }
})

export const {
    toggleShowInfo, 
    toggleShowDarkMode,
    toggleShowLanguage 
} = uiSlice.actions;
export default uiSlice.reducer;
