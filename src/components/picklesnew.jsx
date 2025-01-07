import { useEffect } from "react";
import pickles from "../data/pickles.json";
import feedbacks from "../data/feedback.json";

export function PicklesNew({
  cart,
  handleAddToCart,
  handleIncreaseNoOfItems,
  handleDecreaseNoOfItems,
}) {
  const quotations = [
    "Life is better with a jar of pickles.",
    "Good food deserves great pickles.",
    "Pickles: Where tangy meets tasty!",
    "Spice up your meals with our pickles!",
    "From grandma's kitchen to your plate.",
    "Pickles: A crunchy twist to every meal.",
    "Savor the flavor, relish the crunch!",
    "Turn up the heat with our fiery pickles!",
    "Because plain food is so last season",
  ];

  useEffect(() => {
    console.log(cart); // This will log the updated cart after each state change
    console.log("pickles");
    console.log(pickles);
  }, [cart]);

  return (
    <div className="container-fluid d-flex flex-wrap justify-content-center">
      {pickles.map((pickle, index) => (
        <div
          key={index}
          className="d-flex flex-column align-items-center col-12"
        >
          <div className="card col-12 col-md-6 col-lg-4 p-1 m-1 bg-warning">
            <h3
              className="card-title fw-bold text-center pb-1 pt-1"
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
            <div className="card-footer d-flex justify-content-around">
              <div className="d-flex align-items-center justify-content-between  w-50 ">
                <button
                  className="w-25"
                  onClick={() => handleDecreaseNoOfItems(pickle.name)}
                >
                  -
                </button>
                <span style={{ margin: "0 10px" }}>
                  {cart[pickle.name]?.noOfItems || 0}
                </span>
                <button
                  className="w-25"
                  onClick={() => handleIncreaseNoOfItems(pickle.name)}
                >
                  +
                </button>
              </div>
              <button onClick={() => handleAddToCart(pickle)}>
                Add to Cart
              </button>
            </div>
          </div>
          <div
            className="text-center bg-dark rounded text-white fw-bold col-12 col-md-6 col-lg-4 p-1 m-1"
            style={{ fontStyle: "italic", fontSize: "0.9rem" }}
          >
            {quotations[index % quotations.length]}
          </div>
        </div>
      ))}

      <img
        src={`${process.env.PUBLIC_URL}${`/images/av-pickles-logo.png`}`}
        alt="AV pickles logo"
        style={{ width: "100%" }}
      ></img>
      <h3 className="text-center bg-primary p-1 mt-3">Feedbacks</h3>
      {feedbacks.map((feedback, index) => (
        <div key={index} className="p-1 m-1 bg-dark">
          <p className="text-center text-white">Feedback {index + 1}</p>
          <img
            src={`${process.env.PUBLIC_URL}${feedback.image}`}
            alt="feedback"
            style={{ width: "100%" }}
          ></img>
        </div>
      ))}
    </div>
  );
}
