import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContextProvider";

const PaymentStatus = () => {
  const { status, navigate } = useAppContext();
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const handleStatus = async () => {
      if (status === "success") {
        setIsLoading(true);
        toast.success("Payment Successful.", {
          style: {
            border: "1px solid #2dc653",
            padding: "16px",
            color: "#2dc653",
          },
          iconTheme: {
            primary: "#2dc653",
            secondary: "#fff",
          },
        });
      } else if (status === "cancel") {
        toast.error("Payment Cancelled.", {
          style: {
            border: "1px solid #f21b3f",
            padding: "16px",
            color: "#f21b3f",
          },
          iconTheme: {
            primary: "#f21b3f",
            secondary: "#fff",
          },
        });
      }
    };

    let timeout = setTimeout(() => {
      setIsLoading(false), navigate("/");
    }, 4000);

    handleStatus();

    return () => clearTimeout(timeout);
  }, [status, navigate]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur">
          <div className="text-center">
            {/* Loader */}
            <div className="mx-auto w-[600px] backdrop-blur-3xl  rounded-xl overflow-hidden drop-shadow-2xl">
              <div className="flex p-8 justify-center items-center h-[450px]">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 border-4 border-t-transparent border-violet-500 rounded-full animate-spin mx-auto"></div>

                  <div className="text-violet-500 font-semibold text-4xl opacity-90 animate-fadeIn">
                    <p
                      className={`mt-10 ${
                        status === "success" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {status === "success"
                        ? "Payment Successful"
                        : "Payment Cancelled"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentStatus;
