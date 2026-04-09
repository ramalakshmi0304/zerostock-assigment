import { useState, useEffect } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const params = new URLSearchParams({
      q: query,
      category,
      minPrice,
      maxPrice
    });

    const res = await fetch(`http://localhost:5000/search?${params}`);
    const data = await res.json();
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      <h2>Inventory Search</h2>

      <input
        placeholder="Search product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Grocery">Grocery</option>
        <option value="Kitchen">Kitchen</option>
        <option value="Stationery">Stationery</option>
        <option value="Electronics">Electronics</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button onClick={fetchResults}>Search</button>

      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {results.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Search;