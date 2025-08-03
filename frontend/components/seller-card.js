class SellerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const seller = JSON.parse(this.getAttribute('data-seller'));
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 1rem;
        }
        .card {
          background: white;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .card-img {
          height: 200px;
          background-image: url(${seller.profile_picture || 'https://via.placeholder.com/300'});
          background-size: cover;
          background-position: center;
        }
        .card-body {
          padding: 1.5rem;
          flex-grow: 1;
        }
        .seller-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .seller-location {
          color: #6b7280;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .seller-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
        }
        .stars {
          color: #f59e0b;
        }
        .seller-styles {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .style-tag {
          background-color: #e0e7ff;
          color: #4f46e5;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        .card-footer {
          padding: 1rem 1.5rem;
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
        }
        .view-btn {
          display: inline-block;
          width: 100%;
          text-align: center;
          background-color: #4f46e5;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .view-btn:hover {
          background-color: #4338ca;
        }
      </style>
      
      <div class="card">
        <div class="card-img"></div>
        <div class="card-body">
          <h3 class="seller-name">${seller.seller_name} ${seller.seller_surname}</h3>
          <div class="seller-location">
            <i class="fas fa-map-marker-alt"></i>
            ${seller.seller_city}, ${seller.seller_country}
          </div>
          <div class="seller-rating">
            <div class="stars">
              ${this.renderStars(seller.rating)}
            </div>
            <span>${seller.rating.toFixed(1)} (${seller.review_count} reviews)</span>
          </div>
          <div class="seller-styles">
            ${seller.styles.slice(0, 3).map(style => `
              <span class="style-tag">${formatEnumForDisplay(style)}</span>
            `).join('')}
            ${seller.styles.length > 3 ? `<span class="style-tag">+${seller.styles.length - 3}</span>` : ''}
          </div>
          <p class="seller-bio">${seller.seller_bio?.substring(0, 100) || 'No bio available'}...</p>
        </div>
        <div class="card-footer">
          <a href="/seller/${seller.seller_id}" class="view-btn">View Profile</a>
        </div>
      </div>
    `;
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return `
      ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
      ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
      ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
    `;
  }
}

customElements.define('seller-card', SellerCard);

function formatEnumForDisplay(enumValue) {
  return enumValue
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}