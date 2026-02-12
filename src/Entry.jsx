import "./entry.css";

function Entry({ title, content, year }) {
  const GenreTag = ({ genre }) => {
    const genreClass = "genre " + genre.replace(/\s+/g, "-");
    return <button className={genreClass}>{genre}</button>;
  };

  const LanguageTag = ({ language }) => {
    const languageClass = "language " + language;
    return <button className={languageClass}>{language}</button>;
  };

  const renderSection = (key, value) => {
    switch (key) {
      case "Quotes":
        return (
          <div key={key}>
            <strong>Quotes: </strong>
            <ul>
              {value.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>
        );
      case "Thoughts":
        return (
          <div key={key} style={{ whiteSpace: "pre-line" }}>
            <strong>Thoughts: </strong>
            {value}
          </div>
        );
      case "Favorite Part":
        return (
          <div key={key} style={{ whiteSpace: "pre-wrap" }}>
            <strong>Favorite Part: </strong>
            {value}
          </div>
        );
      default:
        return null;
    }
  };

  const renderSectionAuthor = (key, value) => {
    switch (key) {
      case "Author":
        return (
          <div key={key}>
            <strong>Author: </strong>
            {value.trim()}
          </div>
        );
      case "Month":
        return (
          <div>
            <strong>Month: </strong>
            {value}
          </div>
        );
      case "Rating":
        return (
          <div key={key}>
            <strong>Rating: </strong>
            {value}
          </div>
        );
      default:
        return null;
    }
  };

  const { Language, Genre } = content;
  const img_link = `/1232na/img/${year}/${title.toLowerCase().split(" ").join("_")}.png`;
  console.log("img_link: ", img_link);
  return (
    <div className='entry'>
      <div className='entry-title-box'>
        <div className='entry-title' id={title}>
          {title} <LanguageTag language={Language} />
          {Genre.map((g, idx) => (
            <GenreTag key={idx} genre={g} />
          ))}
          <br></br>
          <div className='entry-info'>
            {Object.entries(content).map(([key, value]) =>
              renderSectionAuthor(key, value),
            )}
          </div>
        </div>
        <img className='cover_image' src={img_link} alt={title}></img>
      </div>
      <div className='entry-content'>
        {Object.entries(content).map(([key, value]) =>
          renderSection(key, value),
        )}
      </div>
    </div>
  );
}
export default Entry;
