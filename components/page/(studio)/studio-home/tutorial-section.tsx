import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

const TutorialsSection = () => {
  const tutorials = [
    {
      id: 1,
      title: "Create a comic from a story",
      description:
        "Welcome to Dashtoon Studio! In this video, we'll guide you through the initial steps of creating your first comic using our AI-powered platform.",
      thumbnail: "/images/studio/tutorial-1.jpg",
      duration: "5 min",
      tag: "Beginner",
    },
    {
      id: 2,
      title: "From screenplay to comic",
      description:
        "In this Dashtoon Studio tutorial, we dive into the details of editing your comic. Learn how to refine panels, adjust dialogues...",
      thumbnail: "/images/studio/tutorial-1.jpg",
      duration: "8 min",
      tag: "Intermediate",
    },
    {
      id: 3,
      title: "Character consistency guide",
      description:
        "In this Dashtoon Studio tutorial, we focus on refining character details in your comic to ensure visual consistency.",
      thumbnail: "/images/studio/tutorial-1.jpg",
      duration: "6 min",
      tag: "Advanced",
    },
    {
      id: 4,
      title: "How to get consistent dress",
      description:
        "In this Dashtoon Studio tutorial, we focus on fixing and refining your character's clothing consistency across panels.",
      thumbnail: "/images/studio/tutorial-1.jpg",
      duration: "4 min",
      tag: "Tips",
    },
    {
      id: 5,
      title: "Get amazing hands in comics",
      description:
        "In this Dashtoon Studio tutorial, we address a common issue with AI-generated art - drawing realistic hands in comic panels.",
      thumbnail: "/images/studio/tutorial-1.jpg",
      duration: "7 min",
      tag: "Advanced",
    },
    {
      id: 6,
      title: "Editing panel backgrounds",
      description:
        "In this Dashtoon Studio tutorial, we focus on correcting and enhancing the background elements of your comic panels.",
      thumbnail: "/images/studio/tutorial-1.jpg",
      duration: "9 min",
      tag: "Intermediate",
    },
  ];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Beginner":
        return "bg-comic-green text-black";
      case "Intermediate":
        return "bg-comic-orange text-black";
      case "Advanced":
        return "bg-comic-red text-white";
      case "Tips":
        return "bg-comic-purple text-white";
      default:
        return "bg-comic-yellow text-black";
    }
  };

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold font-comic text-4xl text-foreground tracking-tight">Tutorials</h2>
        <Button variant="outline" className="border-4 border-black font-bold hover:bg-comic-yellow">
          Show All
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.id} className="card-comic group cursor-pointer overflow-hidden">
            <div className="relative">
              <img
                src={tutorial.thumbnail}
                alt={tutorial.title}
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <PlayCircle className="h-12 w-12 text-white" />
              </div>
              <div className="absolute top-2 left-2">
                <Badge className={`${getTagColor(tutorial.tag)} border-2 border-black font-bold`}>{tutorial.tag}</Badge>
              </div>
              <div className="absolute right-2 bottom-2 rounded bg-black/80 px-2 py-1 font-bold text-white text-xs">
                {tutorial.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2 line-clamp-2 font-bold text-lg">{tutorial.title}</h3>
              <p className="line-clamp-3 text-muted-foreground text-sm">{tutorial.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TutorialsSection;
