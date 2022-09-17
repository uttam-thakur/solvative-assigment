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
      options.params.namePrefix = userSearch;
      options.params.limit = 5*pageNumber;
      axios
        .request(options)
        .then(function (response) {
          const cityListResonse = response?.data?.data;
          setCityList(cityListResonse);
          const dataToRender = cityListResonse?.filter((_city, indx) => indx >= 5*(pageNumber-1))
          setRenderCityList(dataToRender);

        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [userSearch, pageNumber]);

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
