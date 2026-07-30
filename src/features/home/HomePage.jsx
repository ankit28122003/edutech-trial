import SEO from '../../components/common/SEO';
import Hero from './Hero';
import TrustedBy from './TrustedBy';
import CertifyingBodies from './CertifyingBodies';
import DomainGrid from './DomainGrid';
import OutcomeCards from './OutcomeCards';
import FeaturedCourses from './FeaturedCourses';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import LearnerStories from './LearnerStories';
import CTASection from './CTASection';
import TalkToUsBanner from './TalkToUsBanner';
import DistinctionsAwards from './DistinctionsAwards';
import EnterpriseSolutions from './EnterpriseSolutions';
import  Served  from './Served'

export default function HomePage() {
  return (
    <>
      <SEO
        title="Career-Boosting Certifications & Live Mentor-Led Courses"
        description="Build real-world skills that get you hired with mentor-led programs in Agile, AI, Cloud, Cyber Security and DevOps. Live cohorts, capstones and career support."
        canonicalPath="/"
      />
      <Hero />
      <TrustedBy />
      <CertifyingBodies />
      <FeaturedCourses />
      <DomainGrid />
      <TalkToUsBanner />
      <Testimonials />

      {/* <HighDemandCategories /> */}
      {/* <OutcomeCards /> */}
      <HowItWorks />
      <LearnerStories />
      <EnterpriseSolutions />
      <DistinctionsAwards />
      <Served />
      <CTASection />
    </>
  );
}
