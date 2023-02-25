import "./country-detail.css";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryData } from "../../features/countries/countriesActions";
import { reset } from "../../features/countries/countriesSlice";
import { Link, useParams } from "react-router-dom";


const CountryDetail = () => {
    const dispatch = useDispatch();
    const { code } = useParams();
    const { error, errorMessage, countryData } = useSelector(state => state.countries);
    const errMessage = useMemo(() => errorMessage, [errorMessage])
    useEffect(() => {
        if (code)
            dispatch(getCountryData(code.toLowerCase()))
        if (error)
        console.log(errMessage);
        return () => dispatch(reset())
    }, [code, dispatch, error, errMessage])

    console.log(countryData);

    const countryInfo = countryData.length > 0 ? (
        <div className="country-detail-right">
            <h1>{countryData[0].name.common}</h1>
            <div className="details">
                <div className="detail-left">
                    <p>
                        Offcial Name: <span>{countryData[0].name.official}</span>
                    </p>
                    <p>
                        Population: <span>{countryData[0].population}</span>
                    </p>
                    <p>
                        Region: <span>{countryData[0].region}</span>
                    </p>

                    <p>
                        Sub Region: <span>{countryData[0].subregion}</span>
                    </p>
                    <p>
                        Capital: <span>{countryData[0].capital}</span>
                    </p>
                </div>

                <div className="detail-right">
                    <p>
                        Top Level Domain: <span>{countryData[0].tld[0]}</span>
                    </p>
                    <p>
                        Currencies:<span>{
                            Object.values(countryData[0].currencies).map(item => item.name).join(", ")
                        }
                        </span>
                    </p>

                    <p>
                        Languages:  <span>{
                            Object.values(countryData[0].languages).map(item => item).join(", ")
                        }
                        </span>
                    </p>
                </div>
            </div>

            <div className="border">
                <p>Border Countries: </p>
                {
                    Object.values(countryData[0].borders).map((item,index) => <Link key={index} className="border-name" to={`/${item}`}>{item}</Link>)}
            </div>
        </div>) : "No Data available for this country";

    return (
        <section className="country-detail-container">
            <Link className="back-button" to="/">
                <i className="fa-solid fa-arrow-left"></i> Back
            </Link>

            <div className="country-detail-content">
                <>
                    <img src={countryData[0]?.flags.png} alt={countryData[0]?.flags.alt} className="country-detail-image" />
                    {countryInfo}
                </>
            </div>
        </section>
    );
};

export default CountryDetail;