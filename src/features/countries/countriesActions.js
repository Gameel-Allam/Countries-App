import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCountries = createAsyncThunk("countries/getAllCountries", async (_, thunkAPI) => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        return response.data;
    } catch (error) {
        const message = error.response?.data || error.message;
        console.log(error);
        return thunkAPI.rejectWithValue(message);
    }
})

export const getCountryData = createAsyncThunk("counties/getCountryData", async (code, thunkAPI) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        return response.data;
    } catch (error) {
        const message = error.response?.data || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})