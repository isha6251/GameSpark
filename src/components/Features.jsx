import { Truck, Lock, RotateCcw, Clock } from 'lucide-react'

const features = [
    { icon: Truck, text: 'Free Shipping', subtext: 'On orders over $100', color: 'text-pink-400' },
    { icon: Lock, text: 'Secure Payment', subtext: '100% protected payments', color: 'text-purple-400' },
    { icon: RotateCcw, text: 'Easy Returns', subtext: '30-day return policy', color: 'text-sky-400' },
    { icon: Clock, text: '24/7 Support', subtext: 'Dedicated customer service', color: 'text-green-400' },
]

const Features = () => {
    return (
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-6 sm:hover:scale-95 transition-all"
                        >
                            <feature.icon className={`h-12 w-12 mb-4 ${feature.color}`} />
                            <p className="text-lg font-semibold text-gray-800">{feature.text}</p>
                            <p className="mt-1 text-sm text-gray-600">{feature.subtext}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features
