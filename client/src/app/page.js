import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Illustration side */}
            <div className="lg:w-1/2 animate-fade-in-up">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src="https://img.freepik.com/free-vector/food-donation-concept-illustration_114360-10196.jpg"
                  alt="Food Donation Illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Content side */}
            <div className="lg:w-1/2">
              <div className="max-w-xl">
                <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-2 animate-fade-in-up animate-delay-100">
                  Food Donation
                  <br />
                  Application
                </h1>
                <div className="w-20 h-1.5 bg-violet-400 rounded-full mb-8 animate-fade-in-up animate-delay-100" />

                <p className="text-lg text-slate-600 mb-8 leading-relaxed animate-fade-in-up animate-delay-200">
                  Food wastage is a critical global issue, with approximately 1.3 billion tons of food lost or wasted annually. This project tackles the issue using a Food Donation Application built with the MERN stack.
                </p>

                <p className="text-slate-600 mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
                  The application aims to redistribute surplus food from restaurants and households to Non-Governmental Organizations (NGOs) efficiently, minimizing wastage. The app provides real-time communication and logistics automation to ensure that food reaches those in need quickly.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up animate-delay-300">
                  <Link
                    href="/register"
                    className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all duration-300 text-base"
                  >
                    Start Donating →
                  </Link>
                  <Link
                    href="/login"
                    className="px-8 py-4 border-2 border-slate-200 text-slate-700 font-semibold rounded-2xl hover:bg-slate-50 transition-all duration-300 text-base"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Three simple steps to make a difference in your community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: '📝',
                title: 'Register & Submit',
                desc: 'Create your account and submit food donation details with images, quantity, and pickup location.',
              },
              {
                step: '02',
                icon: '🎫',
                title: 'Get Your Ticket',
                desc: 'A donation ticket is generated automatically. Track its status in real time from your dashboard.',
              },
              {
                step: '03',
                icon: '🚚',
                title: 'Pickup & Deliver',
                desc: 'Our admin team verifies, assigns pickup, and ensures your food reaches those who need it most.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="absolute -top-4 -left-2 text-6xl font-black text-slate-100 group-hover:text-green-50 transition">
                  {item.step}
                </div>
                <div className="relative">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '5,000+', label: 'Meals Donated' },
              { value: '1,200+', label: 'Active Donors' },
              { value: '300+', label: 'Pickups Done' },
              { value: '50+', label: 'Communities Served' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl lg:text-4xl font-extrabold">{stat.value}</p>
                <p className="text-green-100 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-lg text-slate-500 mb-8">
            Join thousands of donors who are already reducing food waste in their communities.
          </p>
          <Link
            href="/register"
            className="inline-flex px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 text-base"
          >
            Get Started for Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
                <span className="text-green-700 text-sm">🍽</span>
              </div>
              <span className="text-white font-bold text-lg">FoodShare</span>
            </div>
            <p className="text-sm">© 2024 FoodShare. Built to reduce food waste.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
