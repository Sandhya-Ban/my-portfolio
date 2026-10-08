import profileImage from "../assets/profile.jpeg";
import ThreeScene from "./ThreeScene";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* 3D Background */}
      <div className="absolute inset-0">
        <ThreeScene />
      </div>

      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[160px]" />

      {/* Navigation */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-8">

        <div className="text-lg font-semibold tracking-wide">
          SANDHYA<span className="text-purple-400">.</span>
        </div>

        <div className="hidden gap-8 text-sm text-gray-400 md:flex">
          <a href="#work" className="transition hover:text-white">
            Work
          </a>

          <a href="#about" className="transition hover:text-white">
            About
          </a>

          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </div>

      </nav>

      {/* Hero */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl items-center px-6">

        <div className="grid w-full items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT */}
          <div>

            <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-purple-400">
              Full Stack Developer
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">

              Building
              <span className="block text-gray-400">
                digital experiences
              </span>

              <span className="block">
                that <span className="text-purple-400">work.</span>
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-gray-400 md:text-lg">
              I'm Sandhya, a Full Stack Developer focused on building
              scalable web applications with React, TypeScript, Python
              and FastAPI.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="#work"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition duration-300 hover:-translate-y-1 hover:bg-gray-200"
              >
                View My Work →
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/5"
              >
                Let's Talk
              </a>

            </div>

            {/* Technologies */}
            <div className="mt-10 flex flex-wrap gap-3">

              {[
                "React",
                "TypeScript",
                "Python",
                "FastAPI",
                "PostgreSQL",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs text-gray-400"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative flex min-h-[550px] items-center justify-center">

            {/* Halo */}
            <div className="absolute h-[360px] w-[360px] rounded-full bg-purple-500/10 blur-[80px]" />

            {/* Decorative ring */}
            <div className="absolute h-[430px] w-[430px] rounded-full border border-purple-500/10" />

            <div className="absolute h-[360px] w-[360px] rounded-full border border-white/5" />

            {/* Photo */}
            <div className="relative z-10">

              <img
                src={profileImage}
                alt="Sandhya B"
                className="h-[520px] w-auto object-contain drop-shadow-[0_25px_80px_rgba(139,92,246,0.25)]"
              />

            </div>

            {/* Floating badge */}
            <div className="absolute bottom-20 left-4 z-20 rounded-2xl border border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl">

              <p className="text-xs text-gray-500">
                Currently building
              </p>

              <p className="mt-1 text-sm font-medium">
                Full Stack Applications
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-gray-600 md:block">
        Scroll to explore
      </div>

    </section>
  );
}

export default Hero;