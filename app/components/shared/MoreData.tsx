"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Chapter = {
  id: number;
  aired: string;
  summary: string;
  title: string;
  url: string;
};

type PropsType = {
  chapters: Chapter[];
  cursor: string;
  more: string;
};

export function MoreData({ chapters, cursor, more }: PropsType) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [chaptersList, setChaptersList] = useState<Chapter[]>([]);
  console.log(chapters);

  const handleMoreClick = () => {
    const keyword = searchParams.get("keyword") ?? "";
    setSearchParams({ cursor: cursor, keyword: keyword!, more: "1" });
  };

  useEffect(() => {
    if (chapters.length) {
      if (more === "1") {
        setChaptersList((prev) => [...prev, ...chapters]);
      } else setChaptersList(chapters);
    }
  }, [chapters]);

  return (
    <>
      {!!chaptersList.length &&
        chaptersList.map((chapter) => {
          return (
            <Card className="min-w-md" key={chapter.id}>
              <CardHeader>
                <CardTitle>{chapter.title}</CardTitle>
                <CardDescription>{chapter.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {"Aired: "}
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(chapter.aired)
                  )}
                </p>
              </CardContent>
            </Card>
          );
        })}
      {chapters.length === 5 && <Button onClick={handleMoreClick}>More</Button>}
    </>
  );
}
