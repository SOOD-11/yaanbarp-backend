import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ReactionBarProps {
  onInteraction: (points: number, message: string) => void;
}

const ReactionBar = ({ onInteraction }: ReactionBarProps) => {
  const [hasReaction, setHasReaction] = useState(false);
  const [reactionCount, setReactionCount] = useState(42);
  const [isSaved, setIsSaved] = useState(false);

  const toggleReaction = () => {
    if (hasReaction) {
      setReactionCount(prev => prev - 1);
    } else {
      setReactionCount(prev => prev + 1);
      onInteraction(2, "Liked article");
    }
    setHasReaction(!hasReaction);
  };

  const handleShare = () => {
    const shareData = {
      title: document.title,
      text: "Check out this blog!",
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        onInteraction(1, "Shared article");
      }).catch(() => {
        toast({ title: "Sharing cancelled or failed." });
      });
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast({ title: "🔗 Link copied!", description: "You can now paste it anywhere to share." });
      onInteraction(1, "Copied blog link");
    }
  };

  const handleSave = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setIsSaved(true);
        toast({
          title: "📑 Saved to clipboard",
          description: "Blog link copied. You can paste it anywhere.",
        });
        onInteraction(2, "Saved blog link");
      })
      .catch(() => {
        toast({
          title: "❌ Failed to save",
          description: "Clipboard copy failed.",
        });
      });
  };

  return (
    <div className="mt-8 p-4 bg-[#EDE8D0]/20 rounded-lg border border-[#EDE8D0] flex items-center justify-between">
      <div className="flex gap-4">
       

        <Button
          variant="ghost"
          size="sm"
          className="flex gap-2 items-center"
          onClick={handleShare}
        >
          📤 Share
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex gap-2 items-center transition-all",
          isSaved ? "text-[#00555A] bg-[#00555A]/10" : ""
        )}
        onClick={handleSave}
      >
        {isSaved ? "📑" : "🔖"} {isSaved ? "Saved" : "Save"}
      </Button>
    </div>
  );
};

export default ReactionBar;