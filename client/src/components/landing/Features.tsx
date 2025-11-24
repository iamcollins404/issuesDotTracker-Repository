const exploreHighlights = [
  {
    title: 'easily manage',
    description: 'simplify issue tracking with an intuitive interface that keeps work flowing',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    title: 'reminders',
    description: 'never miss a deadline with smart reminders and notifications',
    gradient: 'from-blue-400 to-cyan-600',
  },
  {
    title: 'team access',
    description: 'collaborate seamlessly through shared access and real-time updates',
    gradient: 'from-orange-400 to-red-600',
  },
]

const featureGrid = [
  {
    title: 'Priority Tracking',
    description: 'organize work by priority and status with custom labels',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    title: 'Real-time Updates',
    description: 'stay in sync with live updates and instant notifications',
    gradient: 'from-pink-500 to-orange-600',
  },
  {
    title: 'Smart Search',
    description: 'find issues instantly with powerful filters and search',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    title: 'Analytics Dashboard',
    description: 'track progress with detailed insights and reports',
    gradient: 'from-yellow-500 to-red-600',
  },
  {
    title: 'Team Access',
    description: 'collaborate with role-based permissions and shared workspaces',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    title: 'API',
    description: 'integrate seamlessly with RESTful API and webhooks',
    gradient: 'from-cyan-500 to-blue-600',
  },
]

function Features() {
  return (
    <div className="space-y-32 py-16">
      <section id="explore" className="js-fade px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="fade-in text-large font-black lowercase">explore tracker</h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {exploreHighlights.map((card, index) => (
              <div
                key={card.title}
                className="card-hover fade-in rounded-3xl border border-white/5 bg-[#1A1A1A] p-8"
                style={{ transitionDelay: `${index * 0.07}s` }}
              >
                <div className={`mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br ${card.gradient}`}></div>
                <h3 className="text-2xl font-bold capitalize">{card.title}</h3>
                <p className="mt-3 text-sm text-white/60">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="card-hover mt-10 overflow-hidden rounded-3xl border border-white/5">
            <div className="flex h-[400px] items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.03]">
              <p className="text-center text-lg text-white/60">Dashboard preview coming soon</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="js-fade bg-white/[0.02] px-6 py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="fade-in text-large font-black lowercase">features</h2>

          <div className="mt-20 grid gap-8 md:grid-cols-2">
            {featureGrid.map((feature, index) => (
              <div
                key={feature.title}
                className="card-hover fade-in rounded-3xl border border-white/5 bg-[#1A1A1A] p-10 transition-all hover:border-white/20"
                style={{ transitionDelay: `${index * 0.07}s` }}
              >
                <div className={`mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient}`}></div>
                <h3 className="text-4xl font-bold">{feature.title}</h3>
                <p className="mt-4 text-lg text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features
