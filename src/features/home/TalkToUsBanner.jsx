import { ArrowRight } from 'lucide-react';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Reveal from '../../components/common/Reveal';
import ContactPopupModal from '../common/ContactPopupModal';

export default function TalkToUsBanner() {
  const { openPopup } = useContactPopup();

  return (
    <Section className="py-0 sm:py-0">
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-primary-800 to-primary-600 p-8 sm:grid-cols-[auto_1fr_auto] sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop&crop=faces"
            alt=""
            className="mx-auto h-28 w-28 shrink-0 rounded-full border-4 border-white/20 object-cover sm:mx-0"
            loading="lazy"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Do you have further inquiries or require tailored assistance?
            </h2>
            <p className="mt-2 text-sm text-white/75">
              Our goal is to assist you in finding the right path for your future.
            </p>
          </div>
          <Button onClick={openPopup} variant="white" size="lg" className="mx-auto shrink-0 sm:mx-0">
            Talk to Us <ArrowRight size={16} />
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}