import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Search.css"; // Import the CSS file
import Navbar from "./Navbar";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/api/promato/search?q=${query}`);
        setResults(res.data.results);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (query) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <>
       <Navbar/> 
    <div className="search-results-page">
      <h2>Search Results for "{query || ''}"</h2>
      
      {loading ? (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      ) : results.length ? (
        <div className="results-container">
          {results.map((prompt, i) => (
            <div key={i} className="prompt-card">
              <h3>{prompt.title}</h3>
              <p>{prompt.description}</p>
              <small>{prompt.fileHash}</small>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No results found for "{query}"</p>
      )}
    </div>
    </>
  );
};

export default SearchResults;