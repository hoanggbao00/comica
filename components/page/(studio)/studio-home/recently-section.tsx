import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

const RecentlySection = () => {
  const recentComics = [
    {
      id: 1,
      title: "My Epic Adventure",
      episodes: 3,
      thumbnail: "/images/studio/comic-example-1.jpg",
    },
    {
      id: 2,
      title: "Space Warriors",
      episodes: 1,
      thumbnail: "/images/studio/comic-example-1.jpg",
    },
  ];

  const EmptyCard = () => (
    <Card className="card-comic flex min-h-[280px] flex-col items-center justify-center border-dashed bg-muted/50 p-8">
      <div className="mb-4 rounded-full bg-comic-yellow/20 p-4">
        <Plus className="h-8 w-8 text-comic-purple" />
      </div>
      <h3 className="mb-2 font-bold text-lg text-muted-foreground">Create Your First Comic</h3>
      <p className="mb-4 text-center text-muted-foreground text-sm">Start your comic creation journey with AI</p>
      <Button className="btn-comic" asChild>
        <Link href="/studio/new-comic">Start Creating</Link>
      </Button>
    </Card>
  );

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const ComicCard = ({ comic }: { comic: any }) => (
    <Card className="card-comic group cursor-pointer overflow-hidden">
      <div className="relative">
        <img
          src={comic.thumbnail}
          alt={comic.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-lg border-2 border-black bg-comic-yellow px-2 py-1 font-bold text-black text-xs">
          {comic.episodes} EP
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-bold text-lg">{comic.title}</h3>
        <p className="text-muted-foreground text-sm">{comic.episodes} episodes</p>
      </div>
    </Card>
  );

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold font-comic text-4xl text-foreground tracking-tight">Recently</h2>
        <Button variant="outline" className="border-4 border-black font-bold hover:bg-comic-yellow">
          Show All
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {recentComics.length === 0 ? (
          <EmptyCard />
        ) : (
          <>
            {recentComics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
            <EmptyCard />
          </>
        )}
      </div>
    </section>
  );
};

export default RecentlySection;
