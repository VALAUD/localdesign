module.exports = {
  GET_ALL_SELLERS: `
    SELECT 
      sp.*,
      COALESCE(sar.average_rating, 0) AS rating,
      COALESCE(sar.total_reviews, 0) AS review_count,
      (
        SELECT array_agg(sty.style_type)
        FROM seller_style_type sty
        WHERE sty.seller_id = sp.seller_id
      ) AS styles,
      (
        SELECT array_agg(srv.service_type)
        FROM seller_services srv
        WHERE srv.seller_id = sp.seller_id
      ) AS services
    FROM seller_profile sp
    LEFT JOIN seller_average_rating sar ON sp.seller_id = sar.seller_id
    WHERE sp.accepting_orders = TRUE
  `
};