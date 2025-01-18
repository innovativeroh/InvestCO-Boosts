import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiShoppingBasket } from "react-icons/ci";
import { MdOutlineStar } from "react-icons/md";

interface Feedback {
  id: number;
  message: string;
  score: number;
  created_at: number;
}

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("https://dev.sellix.io/v1/feedback", {
          headers: {
            Authorization: "Bearer TzuvcHcNViFZQbK9x06NYP51j8s9ONV5SKjAS1L1UXLVnv7upnQs2z8jQuKsfTOl",
          },
        });
        setFeedbacks(response.data.data.feedback);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch feedbacks.");
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div id="feedbacks"></div>
      <div className="m-auto max-w-[1200px] text-center mt-20">
        <p className="Montserrat text-sm m-auto text-purple-500 gap-2 flex justify-center items-center">
          <CiShoppingBasket size={20} /> What Customers Say About Us
        </p>
      </div>
      <div className="max-w-[1200px] mt-10 mb-10 m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {feedbacks.map((feedback) => {
            const date = new Date(feedback.created_at * 1000);
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(date);
            return (
              <div
                key={feedback.id}
                className="bg-gradient-to-br from-purple-900 to-violet-800 p-4 rounded-xl border-[1px] border-purple-800 transition-all duration-300 hover:from-violet-600 hover:to-purple-700 hover:text-white group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-[1] flex items-center">
                    {[...Array(feedback.score)].map((_, index) => (
                      <MdOutlineStar key={index} size={20} className="text-violet-400 group-hover:text-white" />
                    ))}
                  </div>
                  <div className="flex-[1] text-right">
                    <span className="text-xs text-purple-200">{formattedDate}</span>
                  </div>
                </div>
                <div className="text-left text-sm mt-5 text-purple-200 group-hover:text-white">
                  {feedback.message}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Feedbacks;