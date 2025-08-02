import { useSearchParams } from "react-router-dom";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="text-center mt-10">
      {status === "success" ? (
        <h1 className="text-green-500 text-xl">✅ Payment Successful!</h1>
      ) : (
        <h1 className="text-red-500 text-xl">❌ Payment Cancelled</h1>
      )}
    </div>
  );
};

export default PaymentStatus;
