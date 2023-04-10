import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const url = "http://localhost:3033/register/getapi";
  const [dataList, setDataList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataList);

  const peticionGet = async () => {
    try {
      axios.get(url).then((res) => {
        setDataList(res.data["results"]);
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };
  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();

    if (lowercasedValue === "") {
      setData(dataList);
    } else {
      const filteredData = dataList.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  };

  return (
    <>
      Search:{" "}
      <input
        style={{ marginLeft: 5 }}
        type="text"
        placeholder="Type to search..."
        value={searchText}
        onChange={(e) => handleChange(e.target.value)}
      />
      <table
        className="table table-hover"
        style={{ fontSize: 10, textAlign: "center" }}
      >
        {data.map((row, i) => {
          return (
            <tr key={i} className="box">
              <td component="th" padding="none">
                {row.name}
              </td>
              <td align="center">{row.year}</td>
              <td align="center">{row.color}</td>
              <td align="center">{row.pantone_value}</td>
            </tr>
          );
        })}
        <div className="clearboth"></div>
        {data.length === 0 && <span>No records found to display!</span>}
      </table>
    </>
  );
};
export default App;
