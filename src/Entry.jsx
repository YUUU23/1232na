import "./entry.css";

function Entry({ title, content }) {
  const GenreTag = ({ genre }) => {
    const genreClass = "genre " + genre.replace(/\s+/g, "-");
    return <span className={genreClass}>{genre}</span>;
  };

  const LanguageTag = ({ language }) => {
    const languageClass = "language " + language;
    return <span className={languageClass}>{language}</span>;
  };

  const renderSection = (key, value) => {
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
      case "Rating":
        return (
          <div key={key}>
            <strong>Rating: </strong>
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

  const { Language, Genre } = content;
  return (
    <div className='entry'>
      <h1 id={title}>
        {title} <LanguageTag language={Language} />
        {Genre.map((g, idx) => (
          <GenreTag key={idx} genre={g} />
        ))}
      </h1>

      <div className='entry-content'>
        {Object.entries(content).map(([key, value]) =>
          renderSection(key, value)
        )}
      </div>
    </div>
  );
}
export default Entry;
