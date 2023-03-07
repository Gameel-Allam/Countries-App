import { createSlice } from "@reduxjs/toolkit";
import { getAllCountries, getCountryData, getRegionCountries } from "./countriesActions"

const initialState = {
    loading: false,
    succes: false,
    error: false,
    errorMessage: "",
    countriesData: [],
    countryData: [],
    region: "",
    searchTerm: "",
}

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        // Clean up function
        reset: (state) => {
            state.countryData = [];
            state.countriesData = [];
            state.error = false;
            state.errorMessage = "";
            state.region = "";
            state.searchTerm = "";
            state.succes = false;
            state.loading = false;
        },
        setRegion: (state, action) => {
            state.region = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
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
                state.loading = false;
                state.succes = false;
                state.countryData = [];
                state.error = true;
                state.errorMessage = action.payload;
            })
            .addCase(getRegionCountries.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRegionCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.countriesData = action.payload;
                state.succes = true;
            })
            .addCase(getRegionCountries.rejected, (state, action) => {
                state.loading = false;
                state.region = "";
                state.succes = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
    }
})

export const { reset, setRegion, setSearchTerm } = countriesSlice.actions;
export default countriesSlice.reducer;