import { createSlice } from "@reduxjs/toolkit";
import { getAllCountries, getCountryData } from "./countriesActions"


const initialState = {
    loading: false,
    succes: false,
    error: false,
    errorMessage: "",
    countriesData: [],
    countryData: [],
}

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        // Clean up function
        reset: (state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCountries.pending, (state) => {
            state.loading = true;
        })
            .addCase(getAllCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.succes = true;
                state.countriesData = action.payload;
            })
            .addCase(getAllCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
                state.countriesData = [];
            })
            .addCase(getCountryData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCountryData.fulfilled, (state, action) => {
                state.loading = false;
                state.countryData = action.payload;
                state.succes = true;
            })
            .addCase(getCountryData.rejected, (state, action) => {
                state.succes = false;
                state.countryData = [];
                state.error = true;
                state.errorMessage = action.payload;
            })
    }
})

export default countriesSlice.reducer;