import React, { useEffect, useState } from "react";
import "../styles/city-table.css";

import { options } from "../constants/cityTable";
var axios = require("axios").default;

console.log(options);

const CityTable = ({ userSearch }) => {
  const [pageLimit, setPageLimit] = useState("5");
  const [cityList, setCityList] = useState([]);
  const [renderCityityList, setRenderCityList] = useState([]);

  const renderTable = () => {
    return (
      <table className="city-table">
        <tr className="city-header">
          <th>#</th>
          <th>place Name</th>
          <th>Country</th>
        </tr>
        {renderCityityList?.map((_city, indx) => {
          return (
            <tr key={indx}>
              <td>{indx + 1}</td>
              <td>{_city?.name}</td>
              <td>{_city?.country}</td>
            </tr>
          );
        })}
      </table>
    );
  };
  useEffect(() => {
    if (pageLimit) {
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
  }, [pageLimit]);

  useEffect(() => {
    console.log(userSearch, typeof(userSearch));
    if (!userSearch || userSearch == "") {
      setRenderCityList(cityList);
	  return
    }
    const searchedCity = cityList?.filter(
      (_city) => _city?.region.match(userSearch?.capitalize())
    );
    setRenderCityList(searchedCity);
  }, [userSearch]);

  return (
    <div>
      {renderTable()}
      <div className="pagination">
        <input
          type={"number"}
          className="pagination-field"
          value={pageLimit}
          onChange={(e) => {
            setPageLimit(e?.target?.value);
          }}
        />
      </div>
    </div>
  );
};

export default CityTable;
