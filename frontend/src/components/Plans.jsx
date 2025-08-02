import { useState } from "react";
import PaymentCard from "./PaymentCard.jsx";

const plans = [
  {
    id: "free",
    name: "Free",
    amount: 0,
    features: [
      { feature: "Title Generation" },
      { feature: "Article Generation" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    amount: 15,
    duration: "month",
    features: [
      { feature: "Title Generation" },
      { feature: "Article Generation" },
      { feature: "Generate Images" },
      { feature: "Remove Background" },
      { feature: "Remove Object" },
      { feature: "Resume Review" },
    ],
  },
];

const Plans = () => {
  const [currentPlan, setCurrentPlan] = useState("Free");
  return (
    <section className="w-full flex flex-col items-center justify-center py-14">
      <h1 className="text-4xl font-semibold">Choose Your Plan</h1>
      <p className="mt-8 text-secondary text-center max-w-md leading-6">
        Start for free and scale up as you grow. Find the perfect plan for your
        content creation needs.
      </p>

      <div className="flex flex-wrap justify-center mt-14 w-full px-4 lg:px-40 gap-6">
        {plans.map((plan, index) => (
          <PaymentCard plan={plan} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Plans;
