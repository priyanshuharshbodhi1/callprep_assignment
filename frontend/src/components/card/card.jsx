import React from "react";
import styles from "./card.module.css";

import OpenAI from "openai";

// const openai = new OpenAI();



const Card = ({ icon, title, code }) => {
  // const apiKey = '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';
  // const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  // const [keywords, setKeywords] = React.useState([]);

  // React.useEffect(() => {
  //   const fetchKeywords = async () => {
  //     const response = await openai.createCompletion({
  //       engine: 'text-davinci-002',
  //       prompt: 'Translate the following English text to French: "{Your text here}"',
  //       max_tokens: 60,
  //     });

  //     const extractedKeywords = response.data.choices[0].text.split(',');
  //     setKeywords(extractedKeywords);
  //   };

  //   fetchKeywords();
  // }, []);

  // console.log('keywords', keywords);

  // async function main() {
  //   const completion = await openai.completions.create({
  //     model: "gpt-3.5-turbo-instruct",
  //     prompt: "Say this is a test.",
  //     max_tokens: 7,
  //     temperature: 0,
  //   });
  
  //   console.log(completion);
  // }
  // main();

  // Convert JSON data to tree view
  function convertToTreeView(data, indent = 0) {
    if (typeof data !== "object" || data === null) {
      return ``;
    }

    let result = "";
    const spaces = " ".repeat(indent);

    Object.entries(data).forEach(([key, value]) => {
      result += `${spaces}&boxur;<span style="color: rgb(61, 129, 246);">${key}:</span>`;

      // Check if the value is a number or a string before adding it
      if (typeof value === "number" || typeof value === "string") {
        result += ` <span style="color: brown;">${value}</span>`;
      }

      result += "\n";

      // Recursive call for nested objects
      result += convertToTreeView(value, indent + 3);
    });

    return result;
  }

  console.log("code type", typeof code);

  // Example JSON data (you can replace this with your generated JSON)
  const jsonData = {
    bcfrl: {
      lomrw: {
        hi: 21,
      },
      ykrdi: {
        svlwx: {},
        idzvm: {
          gnsoa: {},
          hyeci: {},
        },
      },
      61: {
        feauy: {},
      },
      dcomn: {},
    },
  };
  // Convert JSON data to tree view
  const treeView = convertToTreeView(jsonData);

  // Display the tree view
  console.log(treeView);

  // Copy the tree view to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(code));
    console.log("copied");
  };

  // Download as a json file
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(code)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <img src={icon} alt="i" className={styles.icon} />
        <h2 className={styles.title}>{title}</h2>
        <button
          onClick={() => handleCopy()}
          style={{ cursor: "pointer", padding: "5px" }}
          className={styles.btn}
        >
          Copy
        </button>
        <button
          onClick={() => handleDownload()}
          style={{ cursor: "pointer", padding: "5px" }}
          className={styles.btn}
        >
          Download
        </button>
      </div>
      <hr />
      {/* <pre className={styles.code}>{convertToTreeView(code)}</pre> */}
      <pre
        className={styles.code}
        dangerouslySetInnerHTML={{ __html: convertToTreeView(code) }}
      />
    </div>
  );
};

export default Card;
