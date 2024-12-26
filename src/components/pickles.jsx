import pickles from "../data/pickles.json";
export function Pickles() {
  const phoneNumber = "9133942256"; // Replace with your number
  const message = encodeURIComponent("Hello, I need help!");
  return (
    <div className="container-fluid d-flex flex-wrap justify-content-center">
      {pickles.map((pickle, index) => (
        <div
          key={index}
          className="card col-12 col-md-6 col-lg-4 p-1 m-1 mb-4 bg-warning"
        >
          <h3
            className="card-title fw-bold pb-1 pt-1"
            style={{
              fontFamily: "Serif",
            }}
          >
            {pickle.name}
          </h3>
          <div className="card-img-top">
            <img
              src={`${process.env.PUBLIC_URL}${pickle.image}`}
              alt={pickle.name}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
          <div className="card-body mb-0 pb-0">
            <dl>
              <div className="d-flex justify-content-between">
                <dt>Quantity</dt>
                <dd>{pickle.quantity}</dd>
              </div>
              <div className="d-flex justify-content-between">
                <dt>Expiry</dt>
                <dd>{pickle.expiry}</dd>
              </div>
              <div className="d-flex justify-content-between mb-0 pb-0">
                <dt>Price</dt>
                <div className="d-flex flex-column align-items-end mb-0 pb-0">
                  <dd className="text-danger text-decoration-line-through fs-5">
                    ₹{pickle.oldprice}
                  </dd>
                  <dd className="text-success fs-2 fw-bold pb-0 mb-0">
                    ₹{pickle.price}
                  </dd>
                  <dd
                    className="text-dark p-0 m-0"
                    style={{ fontSize: "0.7rem" }}
                  >
                    +Extra delivery charges
                  </dd>
                </div>
              </div>
            </dl>
          </div>
          <div className="card-footer">
            <a
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#25D366",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      ))}
      <img
        src={`${process.env.PUBLIC_URL}${`/images/av-pickles-logo.png`}`}
        alt="AV pickles logo"
        style={{ width: "100%" }}
      ></img>
    </div>
  );
}
