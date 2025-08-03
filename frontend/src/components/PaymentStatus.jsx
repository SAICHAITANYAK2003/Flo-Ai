import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="text-center mt-10">
      {status === "success"
        ? toast.success("Payment Successful.", {
            style: {
              border: "1px solid #2dc653",
              padding: "16px",
              color: "#2dc653",
            },
            iconTheme: {
              primary: "#2dc653",
              secondary: "#2dc653",
            },
          })
        : toast.error("Payment Cancelled.", {
            style: {
              border: "1px solid #f21b3f",
              padding: "16px",
              color: "#f21b3f",
            },
            iconTheme: {
              primary: "#f21b3f",
              secondary: "#f21b3f",
            },
          })}
    </div>
  );
};

export default PaymentStatus;
