import { cn } from '../../lib/utils';
import Container from './Container';

export default function Section({ id, className, containerClassName, children, as: Tag = 'section' }) {
  return (
    <Tag id={id} className={cn('py-16 sm:py-20 lg:py-24', className)}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
