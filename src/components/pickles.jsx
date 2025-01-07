import { useState } from "react";
import pickles from "../data/pickles.json";

export function Pickles() {
  const phoneNumber = "9133697272"; // Replace with your number
  const [showModal, setShowModal] = useState(false);
  const [selectedPickle, setSelectedPickle] = useState(null);
  const [custName, setCustName] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [street, setStreet] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [cart, setCart] = useState({});

  const handleAddToCart = (pickle) => {
    setCart((prevCart) => {
      const existingItem = prevCart[pickle.name] || { ...pickle, quantity: 0 };
      return {
        ...prevCart,
        [pickle.name]: { ...existingItem, quantity: existingItem.quantity + 1 },
      };
    });
  };

  const handleIncreaseQuantity = (pickleName) => {
    setCart((prevCart) => {
      const item = prevCart[pickleName];
      return {
        ...prevCart,
        [pickleName]: { ...item, quantity: item.quantity + 1 },
      };
    });
  };

  const handleDecreaseQuantity = (pickleName) => {
    setCart((prevCart) => {
      const item = prevCart[pickleName];
      if (item.quantity > 1) {
        return {
          ...prevCart,
          [pickleName]: { ...item, quantity: item.quantity - 1 },
        };
      } else {
        const { [pickleName]: _, ...remainingCart } = prevCart;
        return remainingCart;
      }
    });
  };

  const handleOrder = () => {
    const message = encodeURIComponent(
      `Hi AV Pickles, I'm ${custName}, I've found your Pickles from your Website. \nI need *${selectedPickle.name}* (*${selectedPickle.quantity}*).\n\n *Address Details* :\nName: ${custName}\nD.No: ${doorNumber}\nStreet: ${street}\nVillage/City: ${village}\nDistrict: ${district}\nPincode: ${pincode}\nMobile No: ${mobileNumber}`
    );
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
    handleCloseModal();
  };

  const handlePayment = (amount, pickleName) => {
    const upiLink = `upi://pay?pa=avcollectionsdivyateja@ybl&pn=Donga Divya Teja&am=${amount}&cu=INR&tn=${encodeURIComponent(
      `Order Payment for ${pickleName}`
    )}`;

    window.location.href = upiLink;
  };
  const handleOpenModal = (pickle) => {
    setSelectedPickle(pickle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCustName("");
    setDoorNumber("");
    setDistrict("");
    setMobileNumber("");
    setPincode("");
    setStreet("");
    setVillage("");
  };

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

  return (
    <div className="container-fluid d-flex flex-wrap justify-content-center">
      {pickles.map((pickle, index) => (
        <div
          key={index}
          className="d-flex flex-column align-items-center col-12"
        >
          <div className="card col-12 col-md-6 col-lg-4 p-1 m-1 bg-warning">
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
            <div className="card-footer d-flex justify-content-around">
              {/* <button
                onClick={() => handleOpenModal(pickle)}
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#25D366",
                  color: "#fff",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Order on WhatsApp
              </button> */}
              <div className="card-footer d-flex justify-content-around">
                <button onClick={() => handleAddToCart(pickle)}>
                  Add to Cart
                </button>
                <div className="d-flex align-items-center">
                  <button onClick={() => handleDecreaseQuantity(pickle.name)}>
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>
                    {cart[pickle.name]?.quantity || 0}
                  </span>
                  <button onClick={() => handleIncreaseQuantity(pickle.name)}>
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handlePayment(pickle.price + 80, pickle.name)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#5e60c3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "2px",
                }}
              >
                Pay Now
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

      {showModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <h4>Enter Your Address</h4>
            <div>
              <label className="fw-bold">Name</label>
              <input
                type="text"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">D.No</label>
              <input
                type="text"
                value={doorNumber}
                onChange={(e) => setDoorNumber(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">Street</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">Village/City</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">Mobile No</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>

            <button
              onClick={handleOrder}
              style={{
                padding: "10px 20px",
                backgroundColor: "#25D366",
                color: "#fff",
                borderRadius: "5px",
                marginBottom: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Order
            </button>
            <button
              onClick={handleCloseModal}
              style={{
                padding: "10px 20px",
                backgroundColor: "red",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
