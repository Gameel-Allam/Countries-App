import "./search.css";
import { setSearchTerm } from "../../../features/countries/countriesSlice"
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
    const { searchTerm } = useSelector(state => state.countries)
    const dispatch = useDispatch();
    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value.toLowerCase()));
    }
    return (
        <section className="search-container">
            <div className="search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            <input
                type="text"
                placeholder="Search for a country"
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </section>
    );
};

export default Search;