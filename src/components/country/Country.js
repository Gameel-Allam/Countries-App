import "./country.css";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, getRegionCountries } from "../../features/countries/countriesActions";
import { reset } from "../../features/countries/countriesSlice";
import { Link } from "react-router-dom";


const Country = () => {
    const dispatch = useDispatch();
    const { loading, error, succes, countriesData, errorMessage, region, searchTerm } = useSelector(state => state.countries);
    const errMessage = useMemo(() => errorMessage, [errorMessage])

    useEffect(() => {
        dispatch(getAllCountries());
        if (region)
            dispatch(getRegionCountries(region));
        if (error)
            console.log(errMessage);
        return () => dispatch(reset);
    }, [dispatch, error, succes, region, errMessage])

    const data = countriesData.filter((item) => item.name.common.includes(searchTerm))
    const allCountries = data.length > 0 ? data.map((item, index) => (
        <Link className="country-card" key={index} to={`/${item.cioc}`}>
            <img src={item.flags.png} alt={item.flags.alt} className="country-image" />
            <div className="country-content">
                <h3>{item.name.common}</h3>
                <p>
                    Population: <span>{item.population}</span>
                </p>
                <p>
                    Region: <span>{item.region}</span>
                </p>
                <p>
                    Capital: <span>{item.capital}</span>
                </p>
            </div>
        </Link>
    )) : "";
    return (
        <section className="country-container">
            {loading ? <div >Is Loading ....</div> : allCountries}
        </section>
    );
};

export default Country;