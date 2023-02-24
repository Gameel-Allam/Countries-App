import { createSlice } from "@reduxjs/toolkit";
import { getAllCountries } from "./countriesActions"


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
    }
})

export default countriesSlice.reducer;