
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { tiempoTranscurrido } from "@/lib/utils";
import JobCard from "@/components/JobCard/JobCard";
import { Job } from "@/types/Job";
import { SkeletonJobCards, SkeletonSearchCard } from "../Skeleton/Skeleton";

interface JobListProps {
  searchText: string;
}

export default function JobList({ searchText }: JobListProps) {

  // Estado para almacenar los datos de la API
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const tags = useSelector((state: any) => state.tags);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get<Job[]>(`${process.env.NEXT_PUBLIC_API_URL}/jobOffers`);
        setLoading(false);
        setData(response.data);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <> <SkeletonSearchCard /> <SkeletonJobCards />  </>;
  

  // Filter Tags
  const filters = tags.length > 0 ? tags : [];

  const filteredArr = data.filter((job) => {
    const tags = [job.role, job.level].concat(job.skills);
    const matchesTags = filters.every((f: any) => tags.includes(f));
    const matchesSearchText = job.position.toLowerCase().includes(searchText.toLowerCase()) ||
      job.Company.name.toLowerCase().includes(searchText.toLowerCase()) ||
      tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    return matchesTags && matchesSearchText;
  });

  return (
    <>
      {filteredArr.map((job) => (
        <JobCard
        key={job.id}
        id={job.id}
        date={tiempoTranscurrido(job.date)}
        contract={job.contract}
        location={job.location}
        Company={job.Company}
        role={job.role}
        position={job.position}
        level={job.level}
        skills={job.skills}
      />
      ))}
    </>
  );
}