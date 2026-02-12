import "./App.css";
import TOC from "./Toc";
import Entry from "./Entry";
import Footnote from "./Footnote";
import source from "./source";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const all_entries = source.all_entries;
const lastEntryDate = source.lastEntryDate;

function getOptionsForFilters(all_entries) {
  let language_options = [];
  let genre_options = [];
  Object.entries(all_entries).map(([_, entries]) => {
    Object.entries(entries).map(([_, entry]) => {
      const { Language, Genre } = entry;
      if (!language_options.includes(Language)) {
        language_options.push(Language);
      }
      Genre.map((g) => {
        if (!genre_options.includes(g)) {
          genre_options.push(g);
        }
      });
    });
  });
  language_options.sort((a, b) => a.length - b.length);
  return [language_options, genre_options];
}

function App() {
  const [filteredEntries, setFilteredEntries] = useState(all_entries);
  const [filters, setFilters] = useState([]);

  function filterEntries() {
    let fentries = {};
    if (filters.length == 0) {
      setFilteredEntries(all_entries);
      return;
    }
    Object.entries(all_entries).forEach(([year, entries]) => {
      Object.entries(entries).forEach(([title, entry]) => {
        const { Language, Genre } = entry;
        const matching = [Language, ...Genre];
        if (entry["with-friends"]) {
          matching.push(entry["with-friends"]);
        }
        let checker = (matching, filters) => {
          return filters.every((item) => matching.includes(item));
        };
        if (checker(matching, filters)) {
          if (!fentries[year]) {
            fentries[year] = {};
          }
          fentries[year][title] = entry;
        }
      });
    });
    setFilteredEntries(fentries);
  }

  useEffect(() => {
    filterEntries();
  }, [filters]);

  useEffect(() => {
    const handleBackButton = (event) => {
      setFilters([]);
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  function addFilter(op, opClass, button) {
    if (filters.includes(op)) {
      setFilters((filters) => filters.filter((o) => o !== op));
      button.classList.remove(`filter-btn-clicked`);
      button.classList.remove(opClass);
    } else {
      setFilters((filters) => [...filters, op]);
      button.classList.add(`filter-btn-clicked`);
      button.classList.add(opClass);
    }
  }

  const [langaugeOptions, genreOptions] = getOptionsForFilters(all_entries);

  return (
    <div>
      <Routes>
        <Route
          path='/1232na/'
          element={
            <div>
              <h1 className='site-title'>/ᐠ. .ᐟ\</h1>
              <div className='content-container'>
                <TOC all_entries={filteredEntries} />
                <div className='filter-container'>
                  <p>
                    By published <br /> language / genre:
                  </p>
                  <div className='filters language-filters'>
                    {langaugeOptions.map((op) => (
                      <button
                        className='filter-btn'
                        key={op}
                        id={op}
                        onClick={(e) => addFilter(op, "language-dot", e.target)}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                  <div className='filters genre-filters'>
                    {genreOptions.map((op) => (
                      <button
                        className='filter-btn'
                        key={op}
                        id={op}
                        onClick={(e) =>
                          addFilter(op, op.replace(/\s+/g, "-"), e.target)
                        }
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                  <div className='filters with-friends'>
                    <button
                      className='filter-btn'
                      key='with-friends'
                      id='with-friends'
                      onClick={(e) =>
                        addFilter("with-friends", "with-friends-dot", e.target)
                      }
                    >
                      with friends :p
                    </button>
                  </div>
                </div>
              </div>
              <Footnote month={lastEntryDate.month} year={lastEntryDate.year} />
            </div>
          }
        ></Route>
        {Object.entries(filteredEntries).map(([year, entries]) => {
          const path = `/${year}`;
          return (
            <Route
              key={year}
              path={path}
              element={
                <div className='entries'>
                  <h1 className='entries-year' key={year}>
                    {year}
                  </h1>
                  {Object.entries(entries).map(([title, content]) => (
                    <Entry
                      key={title}
                      title={title}
                      content={content}
                      year={year}
                    />
                  ))}
                </div>
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
