"use client";

import { useSearchParams } from "next/navigation";
import JobList from "@/components/JobList/JobList";

export default function Jobs() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  console.log(query);

  return (
    <>
      <JobList searchText={query || ''} />  
    </>
  );
}
