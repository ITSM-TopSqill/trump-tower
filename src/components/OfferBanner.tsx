import React from "react";


const OfferBanner: React.FC = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 text-white text-center p-4 md:p-6 shadow-xl animate-[float_4s_ease-in-out_infinite] mt-4 min-h-[350px] md:h-[400px] flex flex-col items-center justify-center">
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#FFD700] via-[#FFCC33] to-[#FFD700] bg-clip-text text-transparent drop-shadow-lg gold-blink relative">
                ✨ Special Offer ✨
            </h1>
            <h2 className="text-lg md:text-3xl font-extrabold mb-1 drop-shadow-md mt-2 px-2">
                🏢 Godrej Majesty – Special PPM Scheme
            </h2>

            {/* Validity */}
            <div className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1 rounded-full inline-block text-sm md:text-md font-semibold mb-4 md:mb-6 mt-2 md:mt-4">
                🎉 Limited Period Offer 🎉
            </div>

            {/* Pricing grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 w-full max-w-4xl px-2">
                {[
                    { plan: "3 BHK-C+", price: "₹9,999/- per month" },
                    { plan: "3 BHK-O", price: "₹9,999/- per month" },
                    { plan: "4 BHK-C", price: "₹10,999/- per month" },
                    { plan: "4 BHK-O", price: "₹11,999/- per month" },
                ].map((offer, idx) => (
                    <div
                        key={idx}
                        className="bg-white/20 px-3 md:px-5 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-white/30 hover:scale-105 transition-transform text-center"
                    >
                        <div className="block">💎 {offer.plan}</div>
                        <div className="block mt-1 text-xs md:text-sm">➡️ {offer.price}</div>
                    </div>
                ))}
            </div>

            {/* Short & clear explanation */}
            <div className="bg-white/10 p-3 md:p-4 rounded-lg max-w-2xl mx-auto text-left text-sm md:text-md space-y-2 mt-4 mx-2">
                <p>📌 <strong>Book Now with Just 10% of the total cost. </strong></p>
                <p>📆 <strong>Pay the monthly scheme amount until possession – No hidden charges.</strong> </p>
                <p>🏠 <strong>Move in hassle-free with our easy payment plan.</strong></p>
            </div>

            <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

            <style >{`
        /* Blink with brightness instead of opacity */
        @keyframes goldBlink {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 6px rgba(255, 215, 0, 0.8));
          }
          50% {
            filter: brightness(1.5) drop-shadow(0 0 12px rgba(255, 223, 100, 1));
          }
        }
        .gold-blink {
          animation: goldBlink 1.2s infinite ease-in-out;
        }

        /* Sparkle Animation */
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.3) rotate(45deg); }
        }
        .sparkle {
          animation: sparkle 1.5s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default OfferBanner;
