# Inventory Database + APIs

## Database Schema

Two collections are used:

### Suppliers
- id
- name
- city

### Inventory
- id
- supplier_id (reference to Suppliers)
- product_name
- quantity
- price

Relationship:
One supplier can have multiple inventory items. This is implemented using a reference (`supplier_id`) in the Inventory collection.

## Why NoSQL (MongoDB)

MongoDB was chosen because:
- Flexible schema for inventory items
- Easy to model one-to-many relationships
- Aggregation pipeline simplifies grouped queries
- Fast development for small-to-medium datasets

## Optimization Suggestion

Add an index on:
- `supplier_id`
- `product_name`

This improves:
- lookup performance
- aggregation speed
- filtering queries

Example:

InventorySchema.index({ supplier_id: 1 });

This reduces query time when grouping inventory by supplier.

APIs Summary

POST /supplier
Create supplier

POST /inventory
Create inventory (valid supplier required)

GET /inventory
Return all inventory

GET /inventory/grouped
Return inventory grouped by supplier sorted by total value