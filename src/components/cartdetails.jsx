import { Link } from "react-router-dom";

export function CartDetails({ cart, totalAmount }) {
  const totalItems = Object.values(cart).reduce(
    (total, item) => total + item.noOfItems,
    0
  );

  return (
    <div className="sticky-bottom bg-light p-2 d-flex justify-content-around align-items-center">
      <div className="d-flex flex-column">
        <h6>Total Amount</h6>
        <h2>₹{totalAmount}</h2>
      </div>
      <div className="position-relative">
        <Link to="/cart" className="btn btn-primary w-100">
          Show Cart
        </Link>
        {totalItems > 0 && (
          <span
            className="badge bg-danger position-absolute translate-middle rounded-pill"
            style={{
              top: "10%",

              transform: "translate(50%, -50%)",
            }}
          >
            {totalItems}
          </span>
        )}
      </div>
    </div>
  );
}
