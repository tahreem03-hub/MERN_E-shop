(the separate Event model duplicating Product, coupon logic, the shopId + shop object redundancy on Product)
backend adjustments

Everything else in between (dynamic wiring of the home page, product gallery, search) is frontend state consumption — useful to skim once for the data-shape logic, safe to skip for the UI mechanics. 


ShopInfo still pulls from state.seller (your own logged-in data), not shop data fetched by the :id in the URL. That's intentionally left as-is for now — the backend route that fetches a shop by ID (getShopInfo) doesn't exist until ~5:24:55