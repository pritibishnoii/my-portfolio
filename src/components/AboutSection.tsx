import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Server, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const expertise = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks.'
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Building robust server-side applications with Node.js, Express.js, and RESTful APIs.'
    },
    {
      icon: Database,
      title: 'Database Design',
      description: 'Designing efficient database schemas and optimizing queries with MongoDB and SQL databases.'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Developing mobile-responsive applications that work seamlessly across all devices.'
    }
  ];

  const stats = [
    { number: '1+', label: 'Years Experience' },
    { number: '7+', label: 'Projects Completed' },
    { number: '2', label: 'Companies Worked' },
    { number: '12+', label: 'Technologies' }
  ];

  const workExperience = [
    {
      role: 'Full Stack Developer',
      company: 'Rittz Digital',
      period: 'Feb 2025 - April 2025',
      description: 'Working on E-commerce solutions and MERN stack development with focus on UI/UX and API integration.',
      achievements: [
        'Worked on Ecom-Website Dashboard',
        'Developed MERN Stack Projects',
        'Built reusable UI components',
        'Implemented API integration solutions'
      ]
    },
    {
      role: 'Full Stack Developer Intern',
      company: 'Cuvette',
      period: 'Feb 2024 - Oct 2024',
      description: 'Gained hands-on experience in full-stack development, contributing to multiple MERN projects.',
      achievements: [
        'Worked on MERN Full Stack Projects',
        'Helped create UI components',
        'Learned industry best practices',
        'Collaborated with development teams'
      ]
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-surface">
      <div className="container mx-auto px-4">
        <div ref={contentRef} className="text-center mb-16 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            I'm a passionate MERN Stack developer with experience creating 
            dynamic web applications. I love turning complex problems into simple, 
            beautiful designs that provide meaningful user experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* About Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-text-primary">My Journey</h3>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Started my journey as a self-taught developer, driven by curiosity and passion 
                for technology. I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) 
                and have extensive experience with modern development tools and practices.
              </p>
              <p>
                I believe in writing clean, maintainable code and staying updated with the latest 
                industry trends. My goal is to create applications that not only meet business 
                requirements but also provide exceptional user experiences.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </div>

          {/* Expertise Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-surface rounded-xl border border-surface-accent hover:shadow-custom-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="text-white" size={24} />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Work <span className="bg-gradient-primary bg-clip-text text-transparent">Experience</span>
          </h3>
          <div className="max-w-4xl mx-auto space-y-8">
            {workExperience.map((exp, index) => (
              <div
                key={index}
                className="bg-surface rounded-xl p-8 border border-surface-accent hover:shadow-custom-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-text-primary">{exp.role}</h4>
                    <p className="text-brand-accent font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-text-secondary font-medium bg-surface-secondary px-4 py-2 rounded-full mt-2 md:mt-0 self-start">
                    {exp.period}
                  </span>
                </div>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {exp.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-accent mt-2 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-surface rounded-xl border border-surface-accent hover:shadow-custom-md transition-all duration-300"
            >
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-text-secondary font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;