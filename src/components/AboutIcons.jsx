import { FaGift, FaTruckFast, FaCalendarDays, FaBox } from "react-icons/fa6";

const AboutIcons = () => {
  const iconsData = [
    {
      icon: FaGift,
      title: "Best Prices & Offers",
      description: "Orders $50 or more",
    },
    {
      icon: FaTruckFast,
      title: "Free Delivery",
      description: "24/7 amazing services",
    },
    {
      icon: FaCalendarDays,
      title: "Great Daily Deal",
      description: "When you sign up",
    },
    {
      icon: FaBox,
      title: "Easy Returns",
      description: "Within 30 days",
    },
  ];

  return (
    <div className="bg-white flex items-center justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-32 py-10 max-w-screen-2xl">
        {iconsData.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 mb-2">
              <item.icon size={32} />
            </div>
            <h3 className="font-bold text-black">{item.title}</h3>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))
        }
      </div >
    </div >
  );
};

export default AboutIcons;
