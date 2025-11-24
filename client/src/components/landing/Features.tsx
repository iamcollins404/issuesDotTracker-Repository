const exploreHighlights = [
  {
    title: 'easily manage',
    description: 'simplify issue tracking with an intuitive interface that keeps work flowing',
    gradient: 'from-green-400 to-emerald-600',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'reminders',
    description: 'never miss a deadline with smart reminders and notifications',
    gradient: 'from-blue-400 to-cyan-600',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: 'team access',
    description: 'collaborate seamlessly through shared access and real-time updates',
    gradient: 'from-orange-400 to-red-600',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
      </svg>
    ),
  },
]

const featureGrid = [
  {
    title: 'Priority Tracking',
    description: 'organize work by priority and status with custom labels',
    gradient: 'from-blue-500 to-purple-600',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Real-time Updates',
    description: 'stay in sync with live updates and instant notifications',
    gradient: 'from-pink-500 to-orange-600',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Smart Search',
    description: 'find issues instantly with powerful filters and search',
    gradient: 'from-green-500 to-teal-600',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
      </svg>
    ),
  },
  {
    title: 'Analytics Dashboard',
    description: 'track progress with detailed insights and reports',
    gradient: 'from-yellow-500 to-red-600',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Team Access',
    description: 'collaborate with role-based permissions and shared workspaces',
    gradient: 'from-indigo-500 to-blue-600',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 1 1 0 5.292M15 21H3v-1a6 6 0 0 1 12 0v1zm0 0h6v-1a6 6 0 0 0-9-5.197M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
      </svg>
    ),
  },
  {
    title: 'API',
    description: 'integrate seamlessly with RESTful API and webhooks',
    gradient: 'from-cyan-500 to-blue-600',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
      </svg>
    ),
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
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient}`}>
                  {card.icon}
                </div>
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
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient}`}>
                  {feature.icon}
                </div>
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
