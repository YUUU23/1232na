import "./top.css";
import { HashLink } from "react-router-hash-link";

function TOC({ all_entries }) {
  return (
    <div className='toc-top'>
      {Object.entries(all_entries).map(([year, entries]) => {
        return (
          <div key={year}>
            <h1 className='toc-year'>{year}: </h1>{" "}
            <ol className='toc'>
              {Object.keys(entries).map((t, idx) => (
                <li key={idx}>
                  <HashLink to={`/${year}/#${t}`}>{t}</HashLink>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

export default TOC;
