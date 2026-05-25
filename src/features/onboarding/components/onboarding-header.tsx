import { Heading } from '@/shared/components/typography/Heading';
import { Text } from '@/shared/components/typography/Text';

type Props = {
  title: string;
  description: string;
};

export function OnboardingHeader({ title, description }: Props) {
  return (
    <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="space-y-2">
        <Heading as="h1" className="font-bold text-slate-900 dark:text-slate-100">
          {title}
        </Heading>
        <Text
          variant="lead"
          className="text-slate-600 dark:text-slate-300 text-base md:text-lg"
        >
          {description}
        </Text>
      </div>
    </div>
  );
}
