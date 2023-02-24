import "./country.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../features/countries/countriesActions"


const Country = () => {
    const dispatch = useDispatch();
    const { loading, error, succes, countriesData, errorMessage } = useSelector(state => state.countries);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        dispatch(getAllCountries());
        if (succes) {
            setCountries(countriesData);
            console.log(countriesData);
        }
        if (error)
            console.log(errorMessage);

    }, [dispatch, error, succes])

    const allCountries = countries.length > 0 ? countries.map((item, index) => (
        <div className="country-card" key={index}>
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
        </div>
    )) : "";
    return (
        <section className="country-container">
            {loading ? <div >Is Loading ....</div> : allCountries}
        </section>
    );
};

export default Country;