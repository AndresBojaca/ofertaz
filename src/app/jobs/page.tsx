"use client";

import { useSearchParams } from "next/navigation";
import JobList from "@/components/JobList/JobList";
import TagsCard from "@/components/TagsCard/TagsCard";

export default function Jobs() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  console.log(query);

  return (
    <>
      <TagsCard />
      <JobList searchText={query || ''} />  
    </>
  );
}
