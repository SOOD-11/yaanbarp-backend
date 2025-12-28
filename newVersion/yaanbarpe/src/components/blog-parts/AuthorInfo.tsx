
import { Button } from '@/components/ui/button';

interface AuthorInfoProps {
  author: string;
  authorImage: string;
  onViewProfile: () => void;
}

const AuthorInfo = ({ author, authorImage, onViewProfile }: AuthorInfoProps) => {
  return (
    <div className="rounded-xl border p-6 flex flex-col sm:flex-row gap-6 items-center hover:border-[#00555A] transition-colors">
      <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
        <img src={authorImage} alt={author} className="w-full h-full object-cover" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">About {author}</h3>
        <p className="text-muted-foreground mb-4">
          Cultural researcher and writer specializing in the traditions and heritage of Tulu Nadu. With over a decade of experience documenting the region's unique practices.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-[#00555A]"
          onClick={onViewProfile}
        >
          View More Articles
        </Button>
      </div>
    </div>
  );
};

export default AuthorInfo;
