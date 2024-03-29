import React, { useState } from "react";
import styles from "./App.module.css";
import Card from "./components/card/card";

const App = () => {
  const [json, setJson] = useState("");
  const [isCardView, setIsCardView] = useState(false); // New state variable
  const [searchTerm, setSearchTerm] = useState("");

  function generateRandomJSON() {
    // Generate a random string of fixed length
    function randomString(length = 5) {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      return result;
    }

    // Generate a random number up to max_value
    function randomNumber(maxValue = 100) {
      return Math.floor(Math.random() * maxValue) + 1;
    }

    // Recursive function to create an element with a minimum depth and width
    function createElement(depth) {
      if (depth === 0) {
        // Base case: return a random string or number
        return Math.random() < 0.5 ? randomString() : randomNumber();
      } else {
        // Decides to create a dictionary with random key-value pairs
        const dictLength = Math.max(Math.floor(Math.random() * width), 2); // Ensure minimum width of 2
        const obj = {};
        for (let i = 0; i < dictLength; i++) {
          obj[randomString()] = createElement(depth - 1);
        }
        return obj;
      }
    }

    // Generate random depth and width for the data structure with a minimum depth of 2
    const depth = Math.max(Math.floor(Math.random() * 10), 2); // Ensure minimum depth of 2
    const width = Math.max(Math.floor(Math.random() * 7), 2); // Ensure minimum width of 2

    // Create a top-level array containing dictionaries
    const listLength = Math.max(Math.floor(Math.random() * width), 2); // Ensure a minimum length of 2 for the outer list
    const randomData = Array.from({ length: listLength }, () =>
      createElement(depth - 1)
    ); // -1 because the outer list adds a level of depth

    console.log(randomData.length);

    console.log("listLength", listLength, "depth", depth, "width", width);
    // Convert the data to a JSON string
    // return JSON.stringify(randomData, null, 2);
    setJson(JSON.stringify(randomData, null, 2));
  }

  const toggleView = () => {
    setIsCardView(!isCardView); // Toggle the view
  };

  // console.log("json type", typeof json);

  // Helper function to apply inline styles to JSON code
  const applyStylesToJSON = (code) => {
    return (
      <span>
        {code.split(/(".*?"|\[|\]|\{|\}|,)/).map((part, index) => {
          if (part === "{" || part === "}") {
            return (
              <span key={index} style={{ color: "yellow" }}>
                {part}
              </span>
            );
          } else if (part.startsWith('"')) {
            return (
              <span key={index} style={{ color: "blue" }}>
                {part}
              </span>
            );
          } else if (part === "," || part === "[") {
            return <span key={index}>{part}</span>;
          } else {
            return (
              <span key={index} style={{ color: "brown" }}>
                {part}
              </span>
            );
          }
        })}
      </span>
    );
  };

    // Helper function to check if a JSON object contains a string
    const containsString = (obj, str) => {
      const objStr = JSON.stringify(obj).toLowerCase();
      return objStr.includes(str.toLowerCase());
    };

  // Test the function
  // console.log(generateRandomJSON());
  return (
    <>
      <div className={styles.mainContainer}>
        <button onClick={toggleView} disabled={!json} className={styles.btn}>
          Convert
        </button>
        {isCardView && (
          <input
            id="searchInput"
            type="text"
            placeholder="Search here..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            style={{padding:"7px"}}
          />
        )}

        {isCardView ? (
          <div className={styles.cardArea}>
            {JSON.parse(json)
              .filter((item) => containsString(item, searchTerm))
              .map((item, index) => (
                <Card key={index} title={`Item ${index + 1}`} code={item} />
              ))}
          </div>
        ) : (
          <div className={styles.viewArea}>
            <pre>{applyStylesToJSON(json)}</pre>
          </div>
        )}
        {!isCardView && (
          <button onClick={generateRandomJSON} className={styles.btn}>
            Generate
          </button>
        )}
      </div>
    </>
  );
};

export default App;
