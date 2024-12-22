import pickles from "../data/pickles.json";
export function Pickles() {
  return (
    <div className="container-fluid d-flex flex-wrap">
      {pickles.map((pickle, index) => (
        <div
          key={index}
          className="card col-12 col-md-6 col-lg-4 p-2 m-1 bg-warning"
        >
          <div className="card-img-top">
            <img
              src={`${process.env.PUBLIC_URL}${pickle.image}`}
              alt={pickle.name}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            ></img>
          </div>
          <div className="card-body">
            <dl>
              <div className="d-flex justify-content-between">
                <dt>Name</dt>
                <dd>{pickle.name}</dd>
              </div>
              <div className="d-flex justify-content-between">
                <dt>Price</dt>
                <dd>₹{pickle.price}</dd>
              </div>
              <div className="d-flex justify-content-between">
                <dt>Quantity</dt>
                <dd>{pickle.quantity}</dd>
              </div>
              <div className="d-flex justify-content-between">
                <dt>Expiry</dt>
                <dd>{pickle.expiry}</dd>
              </div>
            </dl>
          </div>
          <div className="card-footer">
            <button className="bg-success p-2 w-100 rounded-3">
              Call to Above Number
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
