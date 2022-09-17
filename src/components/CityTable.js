import React, { useEffect, useState } from "react";
import "../styles/city-table.css";

import { options } from "../constants/cityTable";
var axios = require("axios").default;

console.log(options);

const CityTable = ({ userSearch }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [cityList, setCityList] = useState([]);
  const [renderCityityList, setRenderCityList] = useState([]);

  const renderTable = () => {
    return (
      <table className="city-table">
        <tr className="city-header">
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
        {renderCityityList?.map((_city, indx) => {
          const countryCode = _city?.countryCode?.toLowerCase();
          console.log(`https://countryflagsapi.com/png/${countryCode}`);
          return (
            <tr key={indx}>
              <td>{indx + 1}</td>
              <td>{_city?.name}</td>
              <td>
                <img
                  className="flag"
                  src={`https://countryflagsapi.com/png/${countryCode}`}
                />
                {_city?.country}
              </td>
            </tr>
          );
        })}
      </table>
    );
  };
  useEffect(() => {
    if (pageNumber) {
      options.params.limit = 5 * pageNumber;
      axios
        .request(options)
        .then(function (response) {
          setCityList(response?.data?.data);
          setRenderCityList(response?.data?.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [pageNumber]);

  useEffect(() => {
    console.log(userSearch, typeof userSearch);
    if (!userSearch || userSearch == "") {
      setRenderCityList(cityList);
      return;
    }
    const lower = userSearch.toLowerCase();
    const userSearchedCity =
      userSearch.charAt(0).toUpperCase() + lower.slice(1);

    const searchedCity = cityList?.filter((_city) =>
      _city?.region.match(userSearchedCity)
    );
    setRenderCityList(searchedCity);
  }, [userSearch]);

  return (
    <div>
      {renderTable()}
      <div className="pagination">
        <div
          className="page-button"
          onClick={() => {
            if (pageNumber > 1) setPageNumber(pageNumber - 1);
          }}
        >
          prev
        </div>
        <input
          type={"number"}
          className="pagination-field"
          value={pageNumber}
        />
        <div
          className="page-button"
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          next
        </div>
      </div>
    </div>
  );
};

export default CityTable;
