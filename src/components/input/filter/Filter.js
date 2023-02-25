import "./filter.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reset, setRegion } from "../../../features/countries/countriesSlice"

const Filter = () => {
  const regions = ["Africa", "Europe", "Asia", "Americas", "Oceania"]
  const [filter, setFilter] = useState("");
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => setDropDown(!dropDown);
  const dispatch = useDispatch();
  useEffect(() => {
    if (filter !== "")
      dispatch(setRegion(filter.toLowerCase()));
    return () => dispatch(reset());
  }, [dispatch, filter])

  return (
    <section className="filter-container">
      <div className="filter" onClick={handleDropDown}>
        <input
          type="text"
          readOnly
          placeholder="Filter by Region"
          value={filter}
          className="filter-input"
        />

        <i className="fa-solid fa-angle-down"></i>
        {dropDown ? (
          <div className="dropdown">
            {regions.map((region, i) => (
              <div className="dropdown-item" key={i} onClick={() => setFilter(region)}>{region}</div>
            ))}
          </div>
        )
          : null}
      </div>
    </section>
  );
};

export default Filter;