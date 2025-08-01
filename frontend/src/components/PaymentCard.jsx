import { useState } from "react";

const PaymentCard = ({ plan, isCurrent, onSelect }) => {
  return (
    <div className="max-w-80 overflow-hidden rounded-lg shadow mx-4 flex flex-col ">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
        <h3 className="text-xl font-bold">{plan.id}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold">
            {plan.amount === 0 ? "Free" : `$${plan.amount}`}
          </span>
          {plan.amount !== 0 && (
            <span className="ml-1 text-base">/{plan.duration}</span>
          )}
        </div>
      </div>

      <div className="bg-white p-6 flex-1  flex flex-col items-center justify-between h-auto">
        <div>
          <p className="mb-6 text-gray-600">
            {plan.id === "Free"
              ? "Basic tools to get started quickly."
              : "Everything you need for advanced projects and teams."}
          </p>
          <ul className="mb-6 space-y-1 text-sm text-gray-700">
            {plan.features.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <svg
                  className="mt-0.5 mr-2 h-5 w-5 text-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{item.feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          hidden={isCurrent}
          onClick={onSelect}
          className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm text-white transition-opacity hover:opacity-90 cursor-pointer"
        >
          {!isCurrent ? "Current Plan" : "Choose Plan"}
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
