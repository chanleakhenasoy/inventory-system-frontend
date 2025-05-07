// /app/stockin/create/page.tsx

import React from 'react';

const StockInCreatePage = () => {
  return (
    <div className="container">
      <h1>Create Stock In</h1>
      {/* Form for creating stock */}
      <form>
        {/* Form fields */}
        <div>
          <label>Reference Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Product</label>
          <input type="text" />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" />
        </div>
        <div>
          <label>Total Price</label>
          <input type="number" />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default StockInCreatePage;
