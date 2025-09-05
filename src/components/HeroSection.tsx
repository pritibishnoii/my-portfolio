import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from './ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import heroBackground from '@/assets/hero-bg.jpg';
import profileImage from '@/assets/hero.png';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animations
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

      // Profile image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.2, delay: 0.5, ease: 'back.out(1.7)' }
      );

      // Social icons animation
      gsap.fromTo(
        socialRef.current?.children || [],
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, delay: 1, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div ref={textRef} className="text-center lg:text-left space-y-6">
          <div className="space-y-4">
            <p className="text-brand-accent-light text-lg font-medium">Hello, I'm</p>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Priti<span className="bg-gradient-accent bg-clip-text text-transparent">bishNoi</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl text-gray-300 font-light">
              MERN Stack Developer
            </h2>
          </div>
          
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Passionate full-stack developer with expertise in MongoDB, Express.js, React, and Node.js. 
            I create modern, scalable web applications that deliver exceptional user experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToSection('projects')}
              className="group"
            >
              View My Work
              <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button
              variant="minimal"
              size="xl"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <Download className="mr-2" />
                <a href="cv.pdf" download="priticv.pdf">  Download CV</a>
            </Button>
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="flex gap-4 justify-center lg:justify-start pt-6">
            <a
              href="https://github.com/pritibishnoii"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/priti-bishnoi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:priti12bishnoi@gmail.com"
              className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div
            ref={imageRef}
            className="relative w-80 h-80 lg:w-96 lg:h-96"
          >
            <div className="absolute inset-0 bg-gradient-accent rounded-full blur-xl opacity-30 animate-glow-pulse"></div>
            <img
              src={profileImage}
              alt="Pritibish Noi - MERN Stack Developer"
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-glow">
              MERN
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/70" size={32} />
      </div>
    </section>
  );
};

export default HeroSection;