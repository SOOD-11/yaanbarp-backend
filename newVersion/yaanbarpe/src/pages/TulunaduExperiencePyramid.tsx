import Experiences from "./Experiences";

export default function PyramidLayout() {
    const tiers = [
      {
        name: "Immersive Package",
        icon: "🏛️",
        description: "7–9 Day Premium Immersive Experience",
        price: "₹20,000+",
        color: "bg-purple-100 text-purple-900"
      },
      {
        name: "Semi-Immersive Package",
        icon: "🎨",
        description: "4-Day Wide Exposure Experience",
        price: "₹10,000+",
        color: "bg-orange-100 text-orange-900"
      },
      {
        name: "Intermediate Package",
        icon: "🎭",
        description: "2-Day Deeper Cultural Exploration",
        price: "₹5,000+",
        color: "bg-yellow-100 text-yellow-900"
      },
      {
        name: "Basic Package",
        icon: "🌱",
        description: "Entry Level – Easy Accessibility",
        price: "₹1,000+",
        color: "bg-green-100 text-green-900"
      }
    ];
  
    return (
      <div className="py-10 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">△ Tulu Nadu Experience Pyramid</h2>
        <p className="text-muted-foreground mb-10">
          From basic accessibility to supreme immersion — a journey upwards.
        </p>
  
        <div className="flex flex-col items-center gap-4">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`w-full max-w-[${100 - index * 20}%] mx-auto rounded-lg border border-white shadow-md ${tier.color} py-4 px-6`}
            >
              <div className="flex flex-col items-center">
                <div className="text-3xl">{tier.icon}</div>
                <div className="text-lg font-semibold mt-2">{tier.name}</div>
                <div className="text-sm">{tier.description}</div>
                <div className="mt-2 font-bold">{tier.price}</div>
              </div>
            </div>
          ))}
        </div>
  
       <Experiences></Experiences>
      </div>
    );
  }