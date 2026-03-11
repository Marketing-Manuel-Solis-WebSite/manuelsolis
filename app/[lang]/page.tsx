import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = dynamic(() => import('../components/About'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

const Services = dynamic(() => import('../components/Services'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

const Testimonials = dynamic(() => import('../components/Testimonials'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

const Team = dynamic(() => import('../components/Team'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

const Offices = dynamic(() => import('../components/Offices'), {
  loading: () => <div className="w-full h-[800px] bg-[#001540]" />
});

const ContactForm = dynamic(() => import('../components/ContactForm'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#001540] grain">
      <Hero />
      <Header />
      <div className="content-auto">
        <About />
      </div>
      <div className="content-auto">
        <Services />
      </div>
      <div className="content-auto">
        <Testimonials />
      </div>
      <div className="content-auto">
        <Team />
      </div>
      <div className="content-auto">
        <Offices />
      </div>
      <div className="content-auto">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
