import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import {ExternalLink, Github, ChevronLeft, ChevronRight} from 'lucide-react';
import {code,movie,quiz,storeui,story,note,    razorpay,cacktail} from "../assets/constant"

gsap.registerPlugin(ScrollTrigger);
/** Project data type */
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'Quizee Builder',
      description: 'Quizee Builder is a modern, MERN stack-based form and quiz creation platform designed to make learning interactive and fun. With its intuitive interface, users can build quizzes with various question types, get real-time scoring and feedback, and easily share quizzes for collaboration.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: quiz,
      github: 'https://www.github.com/pritibishnoii/quizee_builder',
      live: 'https://quizee-builder.vercel.app/',
      featured: true
    },
    {
      id: 2,
      title: 'QuickKart',
      description: 'QuickKart is a modern, full-stack e-commerce web application that allows users to browse products, manage a shopping cart, and perform secure user authentication. Built with React + Vite frontend and Node.js backend with MongoDB, featuring Redux Toolkit for state management.',
      tags: ['React.js', 'Tailwindcss', 'Redux toolkit', 'RTK Query', 'Node.js', 'Express.js', 'MongoDB'],
      image: storeui,
      github: 'https://github.com/pritibishnoii/storeuiii',
      live: 'https://storeuiii.vercel.app/',
      featured: true
    },
    {
      id: 3,
      title: 'StoryApp',
      description: 'StoryApp is a creative storytelling platform built with the MERN stack, enabling users to write, share, and explore stories in a beautifully organized interface. With features like rich text editing, category-based browsing, StoryApp makes storytelling engaging and accessible for everyone.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: story,
      github: 'https://github.com/pritibishnoii/storyapp',
      live: 'https://storyapp-nine.vercel.app/',
      featured: false
    },
    {
      id: 4,
      title: 'Code Play',
      description: 'CodePlay is an edtech web application built using the MERN stack, designed to make learning to code interactive and enjoyable. It offers a hands-on coding environment with real-time code execution — making it an ideal platform for students and educators to practice and test their programming skills.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: code,
      github: 'https://github.com/pritibishnoii/StudyNotion?tab=readme-ov-file',
      live: 'https://codeplay-edtech-project.vercel.app/',
      featured: false
    },
    {
      id: 5,
      title: 'Pocket Notes',
      description: 'Pocket Notes is a lightweight and intuitive note-taking app built with React and styled using modular CSS for scoped and maintainable styling. It allows users to quickly create, edit, and organize notes into color-coded categories, offering a clean UI and smooth user experience for everyday productivity and mobile responsive design.',
      tags: ['React', 'CSS', 'React-icons', 'Redux'],
      image: note,
      github: 'https://www.github.com/pritibishnoii/notes-pocket-app',
      live: 'https://notes-pocket-app.vercel.app/',
      featured: false
    },
    {
      id: 6,
      title: 'Supper App',
      description: 'Built using MERN technologies (MongoDB, Express, React, Node.js), this movie application provides an engaging platform for movie enthusiasts. Features include movie browsing, detailed information display, and interactive user interface for an enhanced entertainment experience.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: movie,
      github: 'https://www.github.com/pritibishnoii/movie-app',
      live: 'https://movie-app-alpha-cyan.vercel.app/',
      featured: false
    },
    {
      id: 7,
      title: 'Razorpay Clone',
      description: 'Razorpay Clone is a front-end replica of the popular payment gateway platform, built using HTML, CSS, and JavaScript. This project replicates the sleek UI and responsive design of Razorpay\'s homepage, showcasing modern layouts, interactive elements, and smooth animations — all without any external frameworks.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Tailwindcss'],
      image:razorpay,
      github: 'https://www.github.com/pritibishnoii/Razorypay-clone',
      live: 'https://razorypay.netlify.app/',
      featured: false
    },
    {
          id: 8,
      title: 'Cacktail',
      description: 'The Cacktail Landing Page is a modern and visually appealing landing page designed to showcase a cocktail brand in a creative way.I built this project using React.js for component-based structure, Tailwind CSS for responsive and clean styling, and GSAP to add smooth animations and engaging transitions.The page highlights interactive elements, smooth scrolling effects, and an overall premium feel for better user experience.It is fully responsive across all devices, ensuring seamless accessibility for both desktop and mobile users.This project demonstrates my ability to combine design, animations, and functionality to deliver a polished front-end experience.',
      tags: [ 'React JS', 'TailwindCSS',"GSAP"],
      image:cacktail,
      github: 'https://github.com/pritibishnoii/cacktail',
      live: 'https://cacktail-landing-page.vercel.app/',
      featured: false
    }

  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial slider animation
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  const totalSlides = projects.length;
  
  const goToSlide = (index: number) => {
    if (index < 0 || index >= totalSlides) return;
    
    gsap.to(projectsRef.current, {
      xPercent: -100 * index,
      duration: 0.6,
      ease: 'power2.out',
    });
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = currentIndex + 1 >= totalSlides ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex - 1 < 0 ? totalSlides - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides]);

  const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => (
    <div className="group relative bg-surface rounded-xl overflow-hidden border border-surface-accent hover:shadow-custom-lg transition-all duration-500 h-full">
      {featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-accent text-white px-3 py-1 rounded-full text-sm font-medium">
          Featured
        </div>
      )}
      
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Project Links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-text-secondary leading-relaxed mb-4">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-surface-secondary text-text-secondary text-sm rounded-full border border-surface-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} />
              Live Demo
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github size={16} />
              Code
            </a>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Here are some of the projects I've worked on. Each project represents a unique challenge 
            and showcases different aspects of my development skills.
          </p>
        </div>

        {/* Slider Container */}
        <div ref={sliderRef} className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-surface border border-surface-accent rounded-full flex items-center justify-center hover:bg-surface-secondary transition-all duration-300 hover:shadow-custom-md -translate-x-6"
          >
            <ChevronLeft className="text-text-primary" size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-surface border border-surface-accent rounded-full flex items-center justify-center hover:bg-surface-secondary transition-all duration-300 hover:shadow-custom-md translate-x-6"
          >
            <ChevronRight className="text-text-primary" size={24} />
          </button>

          {/* Slider */}
          <div className="overflow-hidden rounded-xl">
            <div
              ref={projectsRef}
              className="flex transition-transform duration-600 ease-out"
            >
              {projects.map((project) => (
                <div key={project.id} className="flex-shrink-0 w-full px-4">
                  <ProjectCard project={project} featured={project.featured} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-accent shadow-glow'
                    : 'bg-surface-accent hover:bg-surface-secondary'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="accent" size="lg" asChild>
            <a
              href="https://github.com/pritibishnoii"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;