"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";

type PropsType = {
  cursor: string;
};

export function MoreData({ cursor }: PropsType) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleMoreClick = () => {
    const keyword = searchParams.get("keyword");
    setSearchParams({ cursor: cursor, keyword: keyword! });
  };

  return <Button onClick={handleMoreClick}>More</Button>;
}
