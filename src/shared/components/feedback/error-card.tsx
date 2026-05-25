import { AlertCircle } from 'lucide-react';

import { Text } from '../typography/Text';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

export const ErrorCard = ({
  title,
  description,
  informativeMessage,
}: {
  title: string;
  description: string;
  informativeMessage?: string;
}) => (
  <Card className="w-full max-w-md border-red-200 shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-red-600">
        <AlertCircle className="h-6 w-6" />
        {title}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <Text className="text-sm text-slate-600 dark:text-slate-300">{description}</Text>
    </CardContent>

    {informativeMessage && (
      <CardFooter>
        <div className="w-full rounded-md border border-red-100 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <Text className="text-center text-sm font-medium text-red-800 dark:text-red-300">
            {informativeMessage}
          </Text>
        </div>
      </CardFooter>
    )}
  </Card>
);
