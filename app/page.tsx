"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  PieChart,
  Shield,
  Zap,
  FileText,
  TrendingUp,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Star,
  Menu,
  X,
} from "lucide-react";
import ClickSpark from "@/components/ui/ClickSpark";

/* ─────────────────────────── D3 AURORA BACKGROUND ─────────────────────── */
const AuroraBackground = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const W = window.innerWidth;
    const H = window.innerHeight;
    svg.attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);

    const defs = svg.append("defs");

    // Radial gradient 1
    const g1 = defs.append("radialGradient").attr("id", "aurora1");
    g1.append("stop").attr("offset", "0%").attr("stop-color", "#ef4444").attr("stop-opacity", 0.4);
    g1.append("stop").attr("offset", "100%").attr("stop-color", "#ef4444").attr("stop-opacity", 0);

    // Radial gradient 2
    const g2 = defs.append("radialGradient").attr("id", "aurora2");
    g2.append("stop").attr("offset", "0%").attr("stop-color", "#f97316").attr("stop-opacity", 0.25);
    g2.append("stop").attr("offset", "100%").attr("stop-color", "#f97316").attr("stop-opacity", 0);

    // Radial gradient 3
    const g3 = defs.append("radialGradient").attr("id", "aurora3");
    g3.append("stop").attr("offset", "0%").attr("stop-color", "#dc2626").attr("stop-opacity", 0.2);
    g3.append("stop").attr("offset", "100%").attr("stop-color", "#dc2626").attr("stop-opacity", 0);

    // Grid lines
    const gridG = svg.append("g").attr("opacity", 0.04);
    for (let x = 0; x < W; x += 80) {
      gridG.append("line").attr("x1", x).attr("y1", 0).attr("x2", x).attr("y2", H)
        .attr("stroke", "#ffffff").attr("stroke-width", 0.5);
    }
    for (let y = 0; y < H; y += 80) {
      gridG.append("line").attr("x1", 0).attr("y1", y).attr("x2", W).attr("y2", y)
        .attr("stroke", "#ffffff").attr("stroke-width", 0.5);
    }

    // Glow orbs
    const orb1 = svg.append("ellipse")
      .attr("cx", W * 0.3).attr("cy", H * 0.2).attr("rx", 350).attr("ry", 250)
      .attr("fill", "url(#aurora1)");

    const orb2 = svg.append("ellipse")
      .attr("cx", W * 0.8).attr("cy", H * 0.5).attr("rx", 300).attr("ry", 200)
      .attr("fill", "url(#aurora2)");

    const orb3 = svg.append("ellipse")
      .attr("cx", W * 0.5).attr("cy", H * 0.8).attr("rx", 280).attr("ry", 180)
      .attr("fill", "url(#aurora3)");

    // Floating particles
    const particles = Array.from({ length: 60 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const particleG = svg.append("g");
    const dots = particleG
      .selectAll("circle")
      .data(particles)
      .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", "#ef4444")
      .attr("opacity", d => d.opacity);

    // Animate orbs
    const animateOrbs = () => {
      orb1.transition().duration(4000).ease(d3.easeSinInOut)
        .attr("cx", W * 0.3 + Math.sin(Date.now() / 3000) * 60)
        .attr("cy", H * 0.2 + Math.cos(Date.now() / 4000) * 40)
        .on("end", animateOrbs);
    };
    animateOrbs();

    // Tick particles
    const tick = () => {
      particles.forEach(p => { p.y -= p.speed; if (p.y < -10) p.y = H + 10; });
      dots.attr("cy", d => d.y);
      requestAnimationFrame(tick);
    };
    tick();
  }, []);

  return <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ─────────────────────────── D3 LINE CHART ────────────────────────────── */
const D3LineChart = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const W = 560, H = 260;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("width", "100%").attr("height", "100%");

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = [28, 38, 34, 52, 47, 63, 58, 72, 68, 85, 80, 95];

    const x = d3.scalePoint().domain(months).range([40, W - 20]);
    const y = d3.scaleLinear().domain([0, 110]).range([H - 30, 10]);

    const defs = svg.append("defs");
    const grad = defs.append("linearGradient").attr("id", "chart-area-grad").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 1);
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#ef4444").attr("stop-opacity", 0.3);
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#ef4444").attr("stop-opacity", 0);

    const lineGrad = defs.append("linearGradient").attr("id", "line-grad").attr("x1", 0).attr("x2", 1).attr("y1", 0).attr("y2", 0);
    lineGrad.append("stop").attr("offset", "0%").attr("stop-color", "#f97316");
    lineGrad.append("stop").attr("offset", "100%").attr("stop-color", "#ef4444");

    // Grid lines
    const yTicks = [0, 25, 50, 75, 100];
    yTicks.forEach(t => {
      svg.append("line").attr("x1", 40).attr("x2", W - 20).attr("y1", y(t)).attr("y2", y(t))
        .attr("stroke", "#ffffff").attr("stroke-opacity", 0.06).attr("stroke-width", 1);
      svg.append("text").attr("x", 32).attr("y", y(t) + 4).attr("fill", "#6b7280")
        .attr("font-size", 9).attr("text-anchor", "end").text(t + "%");
    });

    // Area
    const area = d3.area<number>()
      .x((_, i) => x(months[i])!)
      .y0(H - 30)
      .y1(d => y(d))
      .curve(d3.curveCatmullRom);

    svg.append("path").datum(data).attr("fill", "url(#chart-area-grad)").attr("d", area);

    // Line
    const line = d3.line<number>()
      .x((_, i) => x(months[i])!)
      .y(d => y(d))
      .curve(d3.curveCatmullRom);

    const path = svg.append("path").datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-grad)")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    const len = path.node()?.getTotalLength() || 0;
    path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
      .transition().duration(2500).ease(d3.easeCubicInOut).attr("stroke-dashoffset", 0);

    // Dots
    data.forEach((d, i) => {
      svg.append("circle")
        .attr("cx", x(months[i])!)
        .attr("cy", y(d))
        .attr("r", 0)
        .attr("fill", "#ef4444")
        .attr("stroke", "#1a1a1a")
        .attr("stroke-width", 2)
        .transition().delay(i * 200 + 500).duration(400).ease(d3.easeBackOut)
        .attr("r", 4);
    });

    // X axis labels
    months.forEach((m, i) => {
      svg.append("text").attr("x", x(m)!).attr("y", H - 10)
        .attr("fill", "#6b7280").attr("font-size", 9).attr("text-anchor", "middle").text(m);
    });
  }, []);

  return <svg ref={ref} />;
};

/* ─────────────────────────── NAV ───────────────────────────────────────── */
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-red-500 rounded-lg rotate-45 group-hover:rotate-[55deg] transition-transform duration-300" />
            <div className="absolute inset-1 bg-black rounded-md rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-black text-xs tracking-tight">DA</span>
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Dania<span className="text-red-500">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            Get started <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-2 md:hidden"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 px-4 text-lg text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 py-3 px-4 bg-red-500 text-white font-semibold rounded-xl text-center"
            >
              Get started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─────────────────────────── TILT CARD ─────────────────────────────────── */
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────── COUNT UP ─────────────────────────────────── */
const CountUp = ({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = (Date.now() - start) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─────────────────────────── TESTIMONIAL CARD ─────────────────────────── */
const testimonials = [
  {
    quote: "Dania Accounting completely transformed how we manage our finances. Clear, reliable and always on time.",
    name: "Maria Jensen",
    role: "CEO, TechFlow ApS",
    rating: 5,
  },
  {
    quote: "We saved weeks of admin work every month. Their payroll system is seamless and error-free.",
    name: "Lars Petersen",
    role: "Founder, Nordic Retail",
    rating: 5,
  },
  {
    quote: "Professional, responsive, and genuinely invested in our growth. Highly recommended.",
    name: "Sofia Andersen",
    role: "CFO, GreenScale A/S",
    rating: 5,
  },
];

/* ─────────────────────────── MAIN PAGE ─────────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ClickSpark sparkColor="#ef4444" sparkSize={5} sparkRadius={20} sparkCount={10} duration={500}>
      <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden selection:bg-red-500/30">
        <Navbar />

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Aurora BG */}
          <div className="absolute inset-0">
            <AuroraBackground />
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_40%,#080808_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 text-center max-w-6xl mx-auto px-4 pt-24"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium"
            >
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              Trusted by 200+ Danish companies
              <div className="flex -space-x-1 ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.05] mb-6"
            >
              Your finances,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-500">
                  perfectly
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              </span>
              <br />aligned.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Dania Accounting handles your bookkeeping, payroll, VAT, and annual reports
              — so you can focus entirely on growing your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#contact"
                className="group flex items-center gap-2 px-7 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] text-sm md:text-base"
              >
                Start for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="flex items-center gap-2 px-7 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-sm md:text-base backdrop-blur-sm"
              >
                See all services
              </a>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-20 flex flex-col items-center gap-2 text-gray-600 text-xs"
            >
              <ChevronDown className="w-5 h-5 animate-bounce" />
              Scroll to explore
            </motion.div>
          </motion.div>
        </section>

        {/* ── LOGOS / SOCIAL PROOF BAR ─────────────────────────────────── */}
        <section className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">
              Trusted by leading Danish companies
            </p>
            <div className="flex items-center justify-center flex-wrap gap-8 md:gap-16">
              {["TechFlow ApS", "Nordic Retail", "GreenScale A/S", "Apex Ventures", "Lumia Group"].map(company => (
                <span key={company} className="text-gray-600 font-semibold text-sm tracking-wide hover:text-gray-400 transition-colors cursor-default">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────── */}
        <section id="services" className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(239,68,68,0.04),transparent)]" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <span className="inline-block text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">What we do</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                Everything your business<br />needs, handled.
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl">
                A complete financial operations stack — from daily bookkeeping to strategic advice.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Bookkeeping",
                  icon: BarChart3,
                  desc: "Accurate, continuous financial records managed by dedicated professionals using modern cloud tools.",
                  tag: "Daily",
                  color: "from-red-500/20 to-transparent",
                  border: "border-red-500/20",
                },
                {
                  title: "Payroll",
                  icon: Zap,
                  desc: "Automated, compliant payroll for your whole team — from salary calculations to tax filings.",
                  tag: "Automated",
                  color: "from-orange-500/15 to-transparent",
                  border: "border-orange-500/20",
                },
                {
                  title: "Tax & VAT",
                  icon: Shield,
                  desc: "Stress-free corporate tax and VAT management — filed on time, every time, always compliant.",
                  tag: "Compliant",
                  color: "from-rose-500/15 to-transparent",
                  border: "border-rose-500/20",
                },
                {
                  title: "Annual Reports",
                  icon: FileText,
                  desc: "Comprehensive annual reporting aligned with Danish legislation and IFRS standards.",
                  tag: "Certified",
                  color: "from-red-500/10 to-transparent",
                  border: "border-red-500/15",
                },
                {
                  title: "Financial Advice",
                  icon: TrendingUp,
                  desc: "CFO-level strategic advisory to help you scale, optimise costs and improve cash flow.",
                  tag: "Strategic",
                  color: "from-orange-500/10 to-transparent",
                  border: "border-orange-500/15",
                },
                {
                  title: "Company Setup",
                  icon: PieChart,
                  desc: "Full incorporation and financial foundation setup for new Danish businesses.",
                  tag: "New businesses",
                  color: "from-rose-500/10 to-transparent",
                  border: "border-rose-500/15",
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <TiltCard
                    className={`group h-full p-7 rounded-2xl border ${service.border} bg-gradient-to-b ${service.color} hover:border-opacity-50 transition-all duration-300 cursor-default relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.05),transparent_60%)]" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                          <service.icon className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-gray-600 font-semibold border border-white/5 bg-white/[0.03] px-2.5 py-1 rounded-full">
                          {service.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
                      <div className="mt-6 flex items-center gap-2 text-red-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHART / INSIGHTS ─────────────────────────────────────────── */}
        <section className="py-24 bg-white/[0.015] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">Real-time insights</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                  Clarity in every number.
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  We don't just keep books — we give you live dashboards and reports that actually help you make decisions.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Live expense & revenue tracking",
                    "Profitability forecasts & trends",
                    "Cash flow visualisations",
                    "Custom KPI dashboards",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-200 text-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                >
                  Get your dashboard <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Revenue growth</p>
                      <p className="text-2xl font-bold text-white">+68% YoY</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                      ↑ Trending
                    </span>
                  </div>
                  <div className="h-56">
                    <D3LineChart />
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-black border border-white/10 text-xs text-gray-400 shadow-xl">
                  Updated live
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl bg-black border border-white/10 shadow-xl">
                  <p className="text-[10px] text-gray-500 mb-1">Tax saved this year</p>
                  <p className="text-lg font-bold text-white">DKK 84,200</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────────────────── */}
        <section id="stats" className="py-32">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">Numbers that speak for themselves.</h2>
              <p className="text-gray-500 text-lg">A decade of Danish accounting excellence.</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: 200, suffix: "+", label: "Active clients", icon: Users },
                { value: 12, suffix: " yrs", label: "In operation", icon: Award },
                { value: 99, suffix: "%", label: "Satisfaction rate", icon: Star },
                { value: 50, suffix: "M+", label: "DKK managed annually", icon: BarChart3 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-7 rounded-2xl border border-white/8 bg-white/[0.02] text-center group hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/20 transition-colors">
                    <stat.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black mb-2 text-white">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ─────────────────────────────────────────────────────── */}
        <section id="about" className="py-32 border-t border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_0%_50%,rgba(239,68,68,0.05),transparent)]" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">About us</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                  Built for modern<br />Danish businesses.
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  Dania Accounting was founded with a single mission: make professional financial management accessible to every company in Denmark — from startups to established enterprises.
                </p>
                <p className="text-gray-500 mb-10 leading-relaxed">
                  Our team of certified accountants and financial advisors combines deep local knowledge with modern cloud tools to deliver a service that's fast, accurate, and genuinely personal.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["FSR member", "IFRS certified", "GDPR compliant", "Cloud-first"].map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-gray-400 text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Testimonials */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
                    >
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-xl text-white font-medium leading-relaxed mb-8">
                        "{testimonials[activeTestimonial].quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                          {testimonials[activeTestimonial].name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                          <p className="text-gray-500 text-sm">{testimonials[activeTestimonial].role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex gap-2 mt-4">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === activeTestimonial ? "w-8 bg-red-500" : "w-2 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────────────────────── */}
        <section id="contact" className="py-32 border-t border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(239,68,68,0.08),transparent)]" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center"
              >
                <span className="inline-block text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">Get in touch</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                  Ready to align<br />your finances?
                </h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                  Talk to our team and get a free consultation. We'll show you exactly how Dania Accounting can save you time and money.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Phone", value: "+45 26 33 63 17" },
                    { icon: Mail, label: "Email", value: "info@daniaaccounting.com" },
                    { icon: MapPin, label: "Address", value: "Helsingør, Denmark" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">{label}</p>
                        <p className="text-white font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.07] transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Company</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.07] transition-all"
                        placeholder="Acme ApS"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.07] transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Service needed</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400 text-sm focus:outline-none focus:border-red-500/50 transition-all appearance-none">
                      <option value="" className="bg-[#111]">Select a service...</option>
                      <option value="bookkeeping" className="bg-[#111]">Bookkeeping</option>
                      <option value="payroll" className="bg-[#111]">Payroll</option>
                      <option value="tax" className="bg-[#111]">Tax & VAT</option>
                      <option value="reports" className="bg-[#111]">Annual Reports</option>
                      <option value="advisory" className="bg-[#111]">Financial Advice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.07] transition-all resize-none"
                      placeholder="Tell us about your business and what you need..."
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    type="submit"
                    className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] text-sm"
                  >
                    Send message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <footer className="border-t border-white/5 py-12 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <a href="#home" className="flex items-center gap-2.5">
                <div className="relative w-7 h-7">
                  <div className="absolute inset-0 bg-red-500 rounded-md rotate-45" />
                  <div className="absolute inset-1 bg-black rounded-sm rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-[9px]">DA</span>
                  </div>
                </div>
                <span className="font-bold text-base text-white">Dania<span className="text-red-500">.</span></span>
              </a>
              <div className="flex gap-6 text-sm text-gray-600">
                {navLinks.map(link => (
                  <a key={link.href} href={link.href} className="hover:text-gray-400 transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
                <a href="https://www.linkedin.com/company/dania-accounting" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">LinkedIn</a>
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-700">
              <p>© 2026 Dania Accounting. All rights reserved. CVR: 36040854</p>
              <p>Helsingør, Denmark · info@daniaaccounting.com · +45 26 33 63 17</p>
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
