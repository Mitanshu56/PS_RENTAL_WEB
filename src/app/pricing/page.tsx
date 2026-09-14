import { PricingPage } from '@/pages/Pricing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | PS Rental',
  description: 'Choose your PlayStation rental plan. Flexible, affordable gaming with no hidden fees.',
};

export default function PricingRoute() {
  return <PricingPage />;
}
