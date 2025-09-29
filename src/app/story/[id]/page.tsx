import StoryHeader from '@/components/story/StoryHeader'
import StoryContent from '@/components/story/StoryContent'
import StoryActions from '@/components/story/StoryActions'
import RelatedStories from '@/components/story/RelatedStories'
import CommentsSection from '@/components/story/CommentsSection'

// Mock story data - replace with API call
const getStoryData = (id: string) => {
  return {
    id: parseInt(id),
    title: "The Midnight Train",
    author: {
      name: "Emma Wilson",
      username: "emmawrites",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      bio: "Fiction writer and coffee enthusiast",
      followers: 1247,
      isFollowing: false
    },
    content: `The old train station stood empty, its platforms echoing with memories of countless journeys. Sarah clutched her suitcase tighter as the midnight train approached, its headlight cutting through the darkness like a beacon of hope.

She had been waiting for this moment for months, ever since she received the letter that changed everything. The job offer in the city was more than just an opportunity—it was her chance to escape the small town that had held her back for so long.

As the train pulled into the station with a thunderous roar, Sarah felt a mixture of excitement and fear coursing through her veins. The conductor stepped down, his weathered face illuminated by the station's dim lights.

"All aboard!" he called out, his voice carrying across the empty platform.

Sarah took a deep breath and stepped forward. This was it—the beginning of her new life. As she climbed aboard the train, she couldn't help but look back one last time at the town she was leaving behind.

The train began to move, slowly at first, then picking up speed. Through the window, Sarah watched as the familiar landmarks of her childhood disappeared into the darkness. The old oak tree where she used to read, the corner store where she bought her first notebook, the school where she discovered her love for writing—all of it fading away like a distant memory.

But as the train carried her toward her future, Sarah felt something she hadn't experienced in years: hope. The city awaited, full of possibilities and new adventures. She opened her notebook and began to write, the rhythmic sound of the train on the tracks providing the perfect soundtrack for her thoughts.

"Chapter One," she wrote, "The Journey Begins."

Hours passed as the train cut through the night, carrying its passengers toward their destinations. Sarah dozed fitfully, her dreams filled with images of towering skyscrapers and bustling streets. When she woke, the first light of dawn was creeping across the horizon.

The conductor's voice crackled over the intercom: "Next stop, Central Station. All passengers for the city, please prepare to disembark."

Sarah gathered her belongings, her heart racing with anticipation. As the train pulled into the massive station, she marveled at the sight before her. Hundreds of people moved through the terminal like a choreographed dance, each with their own story, their own destination.

She stepped off the train and into her new life, ready to write the next chapter of her story.`,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop",
    genre: "Fiction",
    hashtags: ["#fiction", "#mystery", "#train", "#newbeginnings"],
    publishedAt: "2024-01-15T10:30:00Z",
    readTime: "8 min read",
    stats: {
      likes: 234,
      saves: 45,
      comments: 12,
      views: 1520
    },
    isLiked: false,
    isSaved: false
  }
}

export default function StoryPage({ params }: { params: { id: string } }) {
  const story = getStoryData(params.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <StoryHeader story={story} />
        <div className="bg-white">
          <StoryContent story={story} />
          <StoryActions story={story} />
          <CommentsSection storyId={story.id} />
        </div>
        <RelatedStories currentStoryId={story.id} genre={story.genre} />
      </div>
    </div>
  )
}
