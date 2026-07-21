import SEO from '../../components/common/SEO';
import Hero from './Hero';
import StatsBand from './StatsBand';
import CertifyingBodies from './CertifyingBodies';
import DomainGrid from './DomainGrid';
import OutcomeCards from './OutcomeCards';
import FeaturedCourses from './FeaturedCourses';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import LearnerStories from './LearnerStories';
import CTASection from './CTASection';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Career-Boosting Certifications & Live Mentor-Led Courses"
        description="Build real-world skills that get you hired with mentor-led programs in Agile, AI, Cloud, Cyber Security and DevOps. Live cohorts, capstones and career support."
        canonicalPath="/"
      />
      <Hero />
      <StatsBand />
      <CertifyingBodies />
      <DomainGrid />
      <OutcomeCards />
      <FeaturedCourses />
      <HowItWorks />
      <Testimonials />
      <LearnerStories />
      <CTASection />
    </>
  );
}
