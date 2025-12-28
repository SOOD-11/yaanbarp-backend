
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, Flag } from "lucide-react";
import { addPoints } from "@/lib/gamification";
import { toast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: number;
  author: string;
  authorAvatar?: string;
  content: string;
  date: string;
  likes: number;
  userLiked: boolean;
}

// Sample initial comments
const sampleComments: Comment[] = [
  {
    id: 1,
    author: "Prakash Shetty",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    content: "This article brings back memories of watching Yakshagana performances in my village. The costumes and makeup are truly spectacular!",
    date: "2 days ago",
    likes: 12,
    userLiked: false
  },
  {
    id: 2,
    author: "Meera Kamath",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    content: "I never knew the history behind Yakshagana was so rich. Thanks for sharing these details. Would love to know more about the music that accompanies these performances.",
    date: "1 day ago",
    likes: 8,
    userLiked: false
  }
];

interface CommentSectionProps {
  postTitle: string;
}

export function CommentSection({ postTitle }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: Date.now(),
        author: "Guest User",
        content: newComment,
        date: "Just now",
        likes: 0,
        userLiked: false
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment("");
      setIsSubmitting(false);
      
      // Award points for commenting
      const levelUp = addPoints(10, "Joining the conversation");
      
      if (levelUp > 0) {
        toast({
          title: "Level Up!",
          description: `You've reached level ${levelUp}!`,
          duration: 3000,
        });
      } else {
        toast({
          title: "+10 points",
          description: "Thanks for sharing your thoughts!",
          duration: 2000,
        });
      }
    }, 800);
  };
  
  const toggleLike = (id: number) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        const newLiked = !comment.userLiked;
        
        // Only add points when liking, not unliking
        if (newLiked) {
          addPoints(2, "Appreciating a comment");
        }
        
        return {
          ...comment,
          likes: newLiked ? comment.likes + 1 : comment.likes - 1,
          userLiked: newLiked
        };
      }
      return comment;
    }));
  };
  
  return (
    <div className="mt-16 bg-white rounded-xl p-6 shadow-sm border border-[#00555A]/10">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="text-[#00555A] w-5 h-5" />
        <h3 className="font-display text-xl font-bold text-[#00555A]">
          Join the conversation
        </h3>
      </div>
      
      <div className="mb-6">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts on this article..."
          className="min-h-[100px] border-[#00555A]/20 focus-visible:ring-[#00555A]"
        />
        <div className="flex justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            Be respectful and constructive in your comments.
          </p>
          <Button 
            onClick={handleCommentSubmit} 
            disabled={!newComment.trim() || isSubmitting}
            className="bg-[#00555A] hover:bg-[#CC4E5C]"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            Be the first to comment on this article!
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-b border-[#00555A]/10 pb-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  {comment.authorAvatar ? (
                    <AvatarImage 
                      src={comment.authorAvatar} 
                      alt={comment.author} 
                    />
                  ) : (
                    <AvatarFallback className="bg-[#00555A] text-white">
                      {comment.author.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm">{comment.author}</h4>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  
                  <p className="mt-1 text-sm">{comment.content}</p>
                  
                  <div className="flex gap-4 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-7 px-2 flex items-center gap-1 ${comment.userLiked ? 'text-[#CC4E5C]' : ''}`}
                      onClick={() => toggleLike(comment.id)}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 flex items-center gap-1"
                      onClick={() => toast({
                        title: "Report submitted",
                        description: "Thanks for helping keep our community respectful.",
                        duration: 2000,
                      })}
                    >
                      <Flag className="h-3.5 w-3.5" />
                      <span className="text-xs">Report</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
