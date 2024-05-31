'use client'
import { searchProducts } from "@/lib/action";
import { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event:any) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const products = await searchProducts(searchQuery);
      setSearchResults(products);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product._id}>
              <h2>{product.title}</h2>
             
            </div>
          ))
        ) : (
          !isLoading && <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
