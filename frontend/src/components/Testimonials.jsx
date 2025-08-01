import React from "react";
import { assets, dummyTestimonialData } from "../assets/assets";

const Testimonials = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-30 md:px-20">
      <h1 className="text-4xl font-semibold">Loved by Creators</h1>
      <p className="mt-8 text-secondary text-center w-xs max-w-md leading-6">
        Don't just take our word for it. Here's what our users are saying.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-15 ">
        {dummyTestimonialData.map((item, index) => (
          <div
            key={index}
            className=" shadow-lg px-4 py-6 space-y-9 border rounded-2xl border-gray-200 hover:-translate-y-1 transition-all duration-500"
          >
            {/* Stars Icons */}
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index}
                    src={
                      index < item.rating
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    alt="star-icon"
                    className="w-5 h-5"
                  />
                ))}
            </div>

            <p className="text-secondary">"{item.content}"</p>

            <div className="flex items-center gap-4 border-t border-gray-300 pt-3">
              <img
                src={item.image}
                alt="profile image"
                className="w-12 h-12 rounded-full "
              />
              <div>
                <h2>{item.name}</h2>
                <p className="text-secondary">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
