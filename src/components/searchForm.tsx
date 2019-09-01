import React, { SyntheticEvent, useState } from 'react';
import { navigate } from 'gatsby';

const SearchForm = (props: any) => {
  const [input, setInput] = useState('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search?keywords=${encodeURIComponent(input)}`);
  };

  React.useEffect(() => {
    setInput(props.query);
  }, [props.query]);

  return (
    <div className="wrap">
      <form
        className="search"
        role="search"
        method="GET"
        onSubmit={(e: any) => handleSubmit(e)}
      >
        <input
          placeholder={'Search blog'}
          type="search"
          className="searchTerm"
          name="keywords"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="searchButton">
          <i className="fa fa-search" />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
