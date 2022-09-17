import { useState } from "react";
import CityTable from "./components/CityTable";
import SearchBox from "./components/SearchBox";

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div>
      <SearchBox
        name="search"
        value={searchValue}
        placeholder="Search places"
        onChange={(e) => {
          setSearchValue(e.target?.value);
          console.log(e.target?.value);
        }}
      />
      <CityTable userSearch={searchValue}/>
    </div>
  );
}

export default App;
