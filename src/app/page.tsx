'use client';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { tiempoTranscurrido } from "@/lib/utils";
import axios from 'axios';
import SearchCard from "@/components/SearchCard/SearchCard";
import JobCard from "@/components/JobCard/JobCard";

interface Job {
  id: number;
  date: string;
  contract: string;
  location: string;
  logo: string;
  Company: any;
  role: string;
  position: string;
  level: string;
  skills: Array<any>;
}

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const tags = useSelector((state: any) => state.tags);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Job[]>(`${process.env.NEXT_PUBLIC_API_URL}/jobOffers`);
        setData(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
      <SearchCard setSearchText={setSearchText} />
      {filteredArr.map((job) =>
        <JobCard
          date={tiempoTranscurrido(job.date)}
          contract={job.contract}
          location={job.location}
          logo={job.Company.logo}
          company={job.Company.name}
          role={job.role}
          position={job.position}
          level={job.level}
          skills={job.skills}
        />
      )}
    </>
  );
}
