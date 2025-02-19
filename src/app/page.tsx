"use client";

import { ExpandableMap } from "~/components/expandable-map";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import FeedCard, { FeedCardProps } from "@/components/feedcard";
import { CreatePost } from "~/components/create-a-post";
import ProfileSidebar from "~/components/profile-sidebar";
import DiscoverVolunteers from "~/components/discover-volunteers";
import { getPosts } from "~/lib/api";
import { useClerk } from "@clerk/nextjs";
import { updateUserRecomandationScoreOnScroll } from "~/lib/helpers/updateRecommandationScore";
import { ChristmasCountdown } from "~/components/christmas-countdown";

export default function Component() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);
  const { user } = useClerk();
  const [excludedPostIds, setExcludedPostIds] = useState<number[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<FeedCardProps[], Error>({
      queryKey: ["posts"],
      enabled: !!user,
      initialPageParam: 0,
      gcTime: 0,
      queryFn: async ({ pageParam }) => {
        const posts = await getPosts(
          pageParam as number,
          user?.id as string,
          excludedPostIds
        );

        setExcludedPostIds((prev) => [
          ...prev,
          ...posts.map((post) => post.id),
        ]);

        return posts.map((post) => ({
          ...post,
          id: post.id.toString(),
          registrationStart: post.registrationStart.toISOString(),
          registrationEnd: post.registrationEnd.toISOString(),
          requiredPeople: post.requiredPeople ?? undefined,
        }));
      },
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 5 ? allPages.length : undefined,
    });

  useEffect(() => {
    async function callUpdateRecommandationScore() {
      await updateUserRecomandationScoreOnScroll(user?.id as string);
    }

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          await callUpdateRecommandationScore();
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const observer = observerRef.current;
    const lastPost = lastPostRef.current;

    if (lastPost && observer) {
      observer.observe(lastPost);
    }

    return () => {
      if (lastPost && observer) {
        observer.unobserve(lastPost);
      }
    };
  }, [data]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-2 relative">
      <Navbar />
      <div className="mt-12" />

      <div className="grid sm:grid-cols-3 gap-8 p-8 place-content-center lg:max-w-7xl items-start justify-center">
        <div className="hidden sm:flex place-content-end">
          <ProfileSidebar />
        </div>
        <div className="flex flex-col gap-4 col-span-3 sm:col-span-2 lgxl:col-span-1">
          <CreatePost />
          <ChristmasCountdown />
          <div className="flex flex-col gap-4">
            {status === "pending" && <div>Loading...</div>}
            {status === "error" && <div>Error fetching posts</div>}
            {status === "success" &&
              data.pages.map((group, pageIndex) => (
                <div key={pageIndex} className="flex flex-col gap-4">
                  {group.map((post: FeedCardProps, index: number) => (
                    <div
                      key={post.id}
                      ref={
                        pageIndex === data.pages.length - 1 &&
                        index === group.length - 1
                          ? lastPostRef
                          : null
                      }
                    >
                      <FeedCard {...post} />
                    </div>
                  ))}
                </div>
              ))}
          </div>
          {isFetchingNextPage && <div>Loading more...</div>}
        </div>
        <div className="hidden lgxl:flex">
          <DiscoverVolunteers />
        </div>
      </div>

      <ExpandableMap apiKey="AIzaSyDZzn4QXRdUAVXnRxfXXroa4E2ThsONiJM" />
    </div>
  );
}
