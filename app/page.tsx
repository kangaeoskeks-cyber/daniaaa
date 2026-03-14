"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, BarChart3, PieChart, Shield, Zap } from "lucide-react";
import BubbleMenu from "@/components/ui/BubbleMenu";
import BounceCards from "@/components/ui/BounceCards";
import ClickSpark from "@/components/ui/ClickSpark";
import GlassSurface from "@/components/ui/GlassSurface";
import { RatingBadge } from "@/components/foundations/rating-badge";

const D3Chart = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove();

      const width = 600;
      const height = 400;
      const data = Array.from({ length: 50 }, () => Math.random() * 100);

      const x = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
      const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

      const line = d3.line<number>()
        .x((d, i) => x(i))
        .y(d => y(d))
        .curve(d3.curveMonotoneX);

      svg.attr("width", "100%")
         .attr("height", "100%")
         .attr("viewBox", `0 0 ${width} ${height}`);

      // Add gradient
      const defs = svg.append("defs");
      const gradient = defs.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", y(0))
        .attr("x2", 0).attr("y2", y(100));
      
      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#ef4444"); // red
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "#f97316"); // orange

      const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 3)
        .attr("d", line);

      const totalLength = path.node()?.getTotalLength() || 0;

      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(3000)
        .ease(d3.easeCubicInOut)
        .attr("stroke-dashoffset", 0);
    }
  }, []);

  return <svg ref={d3Container} className="w-full h-full drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />;
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const navItems = [
    { label: 'Home', href: '#home', rotation: -5, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
    { label: 'Services', href: '#services', rotation: 5, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
    { label: 'About', href: '#about', rotation: -5, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
    { label: 'Contact', href: '#contact', rotation: 5, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } }
  ];

  return (
    <ClickSpark sparkColor="#ef4444" sparkSize={6} sparkCount={12}>
      <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-red-500/30 overflow-hidden font-sans relative z-0">
        
        {/* Navigation */}
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
          <GlassSurface width={400} height={60} borderRadius={30} className="border border-white/10" opacity={0.1}>
            <div className="flex w-full items-center justify-between px-2">
              <span className="text-xl font-bold tracking-tighter text-white ml-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                DANIA
              </span>
              <BubbleMenu items={navItems} menuBg="#ef4444" menuContentColor="#ffffff" className="relative !top-0" />
            </div>
          </GlassSurface>
        </div>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-[#0A0A0A] to-[#0A0A0A] -z-10" />
          
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full -z-10 opacity-30 pointer-events-none">
            <D3Chart />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center max-w-5xl mx-auto z-10"
          >
            <RatingBadge rating={5} title="Top Rated Accounting" subtitle="Over 200+ Danish clients" className="mb-8" />
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
              Accounting redefined for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                modern businesses
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Dania Accounting brings clarity to your finances. We handle bookkeeping, payroll, and taxes so you can focus on building the future.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm">
                Explore Services
              </button>
            </div>
          </motion.div>
        </section>

        {/* Features / Services Section */}
        <section id="services" className="py-32 relative z-10 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-20">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Everything you need.<br/>Nothing you don't.</h2>
              <p className="text-gray-400 text-xl max-w-2xl">A comprehensive suite of financial services powered by expert knowledge and seamless technology integration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Bookkeeping", icon: BarChart3, desc: "Accurate, daily financial records maintained by dedicated professionals." },
                { title: "Payroll Administration", icon: Zap, desc: "Automated and compliant payroll processing for your entire team." },
                { title: "Tax Declarations", icon: Shield, desc: "Stress-free corporate tax filing and VAT management." },
                { title: "Annual Reports", icon: PieChart, desc: "Comprehensive yearly reporting aligned with Danish legislation." }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.05] hover:border-red-500/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}

              <div className="lg:col-span-2 p-8 rounded-3xl bg-red-500 relative overflow-hidden flex items-center">
                <div className="relative z-10 w-full">
                  <h3 className="text-3xl font-bold text-white mb-4">Need tailored financial advice?</h3>
                  <p className="text-red-100 mb-8 max-w-md">Our CFO-level advisory helps you scale operations effectively and optimize your cash flow.</p>
                  <button className="bg-white text-red-500 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    Talk to an expert <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-20 pointer-events-none w-96 h-96">
                  <D3Chart />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Showcase (BounceCards) */}
        <section className="py-32 bg-black border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Visualizing Your Success</h2>
              <p className="text-gray-400 text-xl mb-8">We don't just crunch numbers. We provide clear, visual insights into your business's health and trajectory.</p>
              <ul className="space-y-4">
                {["Real-time dashboards", "Expense tracking", "Profitability forecasts"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-gray-300">
                    <CheckCircle2 className="text-red-500 w-6 h-6" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 flex justify-center perspective-1000">
              <BounceCards 
                images={[
                  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400&h=400",
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500&h=500",
                  "https://images.unsplash.com/photo-1507676184212-d0c30a514e82?auto=format&fit=crop&q=80&w=600&h=600",
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=700&h=700",
                  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=300&h=300"
                ]}
                containerWidth={500}
                containerHeight={400}
              />
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-red-900/20 via-[#0A0A0A] to-[#0A0A0A] -z-10" />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Ready to align your finances?</h2>
            <p className="text-xl text-gray-400 mb-12">Join hundreds of companies that trust Dania Accounting for their financial management.</p>
            
            <GlassSurface width="100%" height="auto" borderRadius={32} className="p-8 border border-white/10 mx-auto max-w-2xl" opacity={0.03}>
              <form className="flex flex-col gap-4 text-left relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Acme Inc" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors h-32 resize-none" placeholder="How can we help you?" />
                </div>
                <button className="w-full bg-red-500 text-white rounded-xl py-4 font-semibold mt-4 hover:bg-red-600 transition-colors pointer-events-auto">
                  Send Message
                </button>
              </form>
            </GlassSurface>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 bg-black relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="font-bold text-xl tracking-tight">DANIA</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 Dania Accounting. All rights reserved. CVR: 36040854</p>
            <div className="flex gap-6 text-sm font-medium text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>

      </div>
    </ClickSpark>
  );
}
