import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider/AuthenticationContextProvider";

const ButtonBuy = ({ large, price, id }) => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    if (!price || isNaN(price) || price <= 0) {
      alert("Invalid amount for payment");
      return;
    }

    const options = {
      key: "rzp_test_RtyUUL2QwvFazU", // Replace with your Razorpay Key ID
      amount: price * 100, // Amount in subunits (e.g., 100 = ₹1)
      currency: "USD",
      name: "Your Organization Name",
      description: "Product Purchase",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // Optional: Add post-payment logic here, like saving the payment record
      },
      prefill: {
        name: user?.name || "Customer Name",
        email: user?.email || "customer@example.com",
        contact: user?.contact || "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleButton = () => {
    if (user) {
      navigate("/check-out");
    } else {
      makePayment(); // Trigger Razorpay payment on button click
    }
  };

  return (
    <button
      onClick={handleButton}
      className={`bg-main text-center ${large && "ml-4"} sm:text-xl w-full py-3 
        mt-4 text-white rounded dark:bg-sky-500 capitalize`}
    >
      {price > 0 ? "Buy Now" : "Enroll Now"}
    </button>
  );
};

export default ButtonBuy;
