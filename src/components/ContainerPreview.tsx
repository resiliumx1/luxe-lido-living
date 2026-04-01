import { useNavigate } from "react-router-dom";
import containerCourtyardImg from "@/assets/container_courtyard.jpg";
import SectionLabel from "@/components/SectionLabel";
import GoldCTA from "@/components/container/GoldCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContainerPreview() {
  const navigate = useNavigate();
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 bg-ocean-deep relative overflow-hidden" ref={sectionRef}>
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[18vw] font-light text-off-white/[0.03] leading-none">AL</span>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
          {/* Left — image */}
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src={containerCourtyardImg}
              alt="Container home courtyard in Antigua"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-ocean-deep/80 backdrop-blur-sm text-gold font-sans text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-md">
              A. Lindsay Luxe Estates
            </div>
          </div>

          {/* Right — content */}
          <div>
            <SectionLabel text="Container Homes" light />
            <h2 className="font-serif text-4xl md:text-5xl text-off-white mb-4">
              Modern Living,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-soft)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Delivered.
              </span>
            </h2>
            <p className="font-sans text-off-white/60 text-base leading-relaxed mb-8 max-w-md">
              Own a fully completed container home starting from $88,000 XCD. Factory-built, hurricane-resilient, and delivered to your doorstep in weeks — not months.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 mb-8">
              {[
                { num: "$88K", label: "Starting" },
                { num: "3", label: "Packages" },
                { num: "8 Wks", label: "Delivery" },
              ].map((s) => (
                <div key={s.label}>
                  <span className="font-serif text-2xl text-gold block leading-none">{s.num}</span>
                  <span className="font-sans text-[10px] text-off-white/40 tracking-wider uppercase mt-1 block">{s.label}</span>
                </div>
              ))}
            </div>

            <GoldCTA variant="solid" onClick={() => navigate("/container-homes")}>
              Explore Container Homes
            </GoldCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
