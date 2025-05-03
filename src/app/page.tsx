'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
                Empower Your Learning Journey with{' '}
                <span className="text-primary">Expert Guidance</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
              Take charge of your future with access to expertly curated educational content, cutting-edge courses, and practical resources tailored to your goals. Whether you&apos;re a student, a job seeker, or a lifelong learner, our platform keeps you ahead with:
              <br></br>
             🎓 Comprehensive and up-to-date learning materials
              <br></br>
             💼 Latest job and internship opportunities across industries
              <br></br> 
             🚀 Skill-building courses designed by professionals
              <br></br> 
             🧠 Personalized recommendations to match your career path
              <br></br>   
             🌐 A community of learners and mentors supporting your growth
              <br></br>
            Start your journey today and build the future you deserve — one skill at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/courses">
                  <Button size="lg">Explore Courses</Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    Read Blog
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative w-full h-[600px] animate-float">
        <Image
                  src="/gyanpng .png"
                  alt="Let&apos;s Support Instructor"
                  fill
                  className="object-contain object-center"
          priority
        />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Why Choose <span className="text-primary">Let&apos;s Support</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive educational resources and career guidance to help
              you achieve your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-dark-200 p-6 rounded-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Are We Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <Image
                  src="/gyan1.jpg"
                  alt="Let&apos;s Support Channel"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
                Who Are <span className="text-primary">We</span>
              </h2>
              <p className="text-gray-400 mb-6">
                Let&apos;s Support is a dedicated platform committed to transforming the educational landscape. 
                We believe in making quality education accessible to everyone, regardless of their background 
                or circumstances.
              </p>
              <p className="text-gray-400 mb-6">
                Our team consists of passionate educators, industry experts, and technology enthusiasts 
                who work together to create a comprehensive learning ecosystem. We combine traditional 
                teaching methods with modern technology to deliver an engaging and effective learning 
                experience.
              </p>
              <p className="text-gray-400 mb-8">
                At Let&apos;s Support, we&apos;re not just about providing courses; we&apos;re about building a 
                community of lifelong learners. Our mission is to empower individuals with the knowledge 
                and skills they need to succeed in their careers and personal growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about">
                  <Button>Learn More</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'Expert-Led Courses',
    description: 'Learn from industry experts through our carefully curated courses.',
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: 'Career Updates',
    description: 'Stay informed about the latest job opportunities in your field.',
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Educational Blog',
    description: 'Access insightful articles and resources to enhance your knowledge.',
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8"
        />
      </svg>
    ),
  },
];
