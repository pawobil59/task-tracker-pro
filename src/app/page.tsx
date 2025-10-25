export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Task Tracker Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organize your life with our premium task management app. 
            Free tier includes 5 tasks, upgrade to Premium for unlimited tasks and advanced features.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Plan</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Up to 5 tasks</li>
              <li>✓ Basic categories</li>
              <li>✓ Task completion tracking</li>
              <li>✓ Simple interface</li>
            </ul>
            <div className="mt-4 text-2xl font-bold text-gray-900">$0/month</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Plan</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Unlimited tasks</li>
              <li>✓ All categories</li>
              <li>✓ Priority levels</li>
              <li>✓ Advanced features</li>
              <li>✓ Priority support</li>
            </ul>
            <div className="mt-4 text-2xl font-bold text-blue-600">$5/month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
