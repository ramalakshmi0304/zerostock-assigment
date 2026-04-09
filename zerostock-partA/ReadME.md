# Inventory Search API + UI

## Search Logic
The `/search` endpoint filters inventory items based on optional query parameters:

- `q` → partial product name match (case-insensitive)
- `category` → exact category match (case-insensitive)
- `minPrice` → minimum price filter
- `maxPrice` → maximum price filter

Filters can be combined.  
If no filters are provided, all products are returned.  
The backend applies filters sequentially on an in-memory dataset and returns matching results.

### Edge Cases Handled
- Empty search query returns all results
- Invalid or missing price values are ignored
- Displays "No results found" when no matches exist

## Performance Improvement (Large Datasets)
For large datasets, I would move filtering to the database layer and add indexes on:

- product name
- category
- price

This would significantly improve search performance and reduce in-memory processing.  
Pagination can also be added to limit results per request.