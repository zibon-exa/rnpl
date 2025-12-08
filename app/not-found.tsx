import { UnderConstruction } from '@/components/under-construction';

export default function NotFound() {
  return (
    <UnderConstruction
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved. We're working on improving the navigation."
      standalone={true}
    />
  );
}

