import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skills animation
      gsap.fromTo(
        skillsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Progress bars animation
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach((bar) => {
        const width = bar.getAttribute('data-width') || '0';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const frontendSkills = [
    { name: 'HTML', level: 95, color: 'from-orange-500 to-red-500' },
    { name: 'CSS', level: 90, color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', level: 88, color: 'from-yellow-500 to-orange-500' },
    { name: 'TypeScript', level: 85, color: 'from-blue-600 to-blue-400' },
    { name: 'React', level: 92, color: 'from-cyan-500 to-blue-500' }
  ];

  const backendSkills = [
    { name: 'Node.js', level: 85, color: 'from-green-600 to-green-400' },
    { name: 'Next.js', level: 80, color: 'from-gray-800 to-gray-600' },
    { name: 'MongoDB', level: 82, color: 'from-green-500 to-emerald-500' },
    { name: 'Tailwind CSS', level: 95, color: 'from-teal-500 to-cyan-500' },
    { name: 'NPM', level: 88, color: 'from-red-600 to-red-400' }
  ];

  const tools = [
    { name: 'Figma', level: 75 },
    { name: 'Postman', level: 85 },
    { name: 'VSCode', level: 95 },
    { name: 'Git & GitHub', level: 90 }
  ];

  const SkillCategory = ({ title, skills, showProgress = true }: any) => (
    <div className="bg-surface rounded-xl p-6 border border-surface-accent hover:shadow-custom-lg transition-all duration-300">
      <h3 className="text-xl font-bold text-text-primary mb-6 text-center">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill: any, index: number) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-secondary font-medium">{skill.name}</span>
              {showProgress && <span className="text-text-muted text-sm">{skill.level}%</span>}
            </div>
            {showProgress ? (
              <div className="w-full bg-surface-secondary rounded-full h-2 overflow-hidden">
                <div
                  className={`progress-bar h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-300`}
                  data-width={skill.level}
                />
              </div>
            ) : (
              <div className="w-full bg-surface-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="progress-bar h-full bg-gradient-accent rounded-full transition-all duration-300"
                  data-width={skill.level}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Here are the technologies and tools I work with to bring ideas to life. 
            I'm always learning and adapting to new technologies in the ever-evolving web development landscape.
          </p>
        </div>

        <div ref={skillsRef} className="grid lg:grid-cols-3 gap-8 mb-12">
          <SkillCategory title="Frontend Development" skills={frontendSkills} />
          <SkillCategory title="Backend Development" skills={backendSkills} />
          <SkillCategory title="Tools & Technologies" skills={tools} showProgress={false} />
        </div>

        {/* Tech Stack Icons */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-8">Technologies I Love</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'HTML', color: 'text-orange-500' },
              { name: 'CSS', color: 'text-blue-500' },
              { name: 'JavaScript', color: 'text-yellow-500' },
              { name: 'TypeScript', color: 'text-blue-600' },
              { name: 'React', color: 'text-cyan-500' },
              { name: 'Next.js', color: 'text-gray-800' },
              { name: 'MongoDB', color: 'text-green-500' },
              { name: 'Tailwind CSS', color: 'text-cyan-500' },
              { name: 'NPM', color: 'text-red-600' },
              { name: 'Figma', color: 'text-purple-500' },
              { name: 'Postman', color: 'text-orange-600' },
              { name: 'VSCode', color: 'text-blue-600' }
            ].map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-surface rounded-full border border-surface-accent hover:shadow-custom-md hover:scale-105 transition-all duration-300 group"
              >
                <span className={`font-semibold ${tech.color} group-hover:text-brand-accent transition-colors duration-300`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;