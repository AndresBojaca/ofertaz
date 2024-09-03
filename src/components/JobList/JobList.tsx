"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { tiempoTranscurrido } from "@/lib/utils";
import JobCard from "@/components/JobCard/JobCard";
import TagsCard from "@/components/TagsCard/TagsCard";
import { Job } from "@/types/Job";
import { SkeletonJobCards, SkeletonSearchCard } from "../Skeleton/Skeleton";
import { RootState } from "@/store/store";

interface JobListProps {
  searchText: string;
}

export default function JobList({ searchText }: JobListProps) {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const filters = useSelector((state: RootState) => state.filters);

  const isFilterEmpty = (filter: string[]) => filter.length === 0 || (filter.length === 1 && filter[0] === "");

  const filteredArr = data.filter((job) => {
    // Verifica si hay texto de búsqueda o si algún filtro no está vacío
    const isFiltering = searchText !== "" || !Object.values(filters).every(isFilterEmpty);

    // Filtro de búsqueda por texto
    const matchesSearchText =
      job.position.toLowerCase().includes(searchText.toLowerCase()) ||
      job.Company.name.toLowerCase().includes(searchText.toLowerCase());

    // Filtrado por skills
    const matchesSkills =
      isFilterEmpty(filters.skills) || filters.skills.some((skill) => job.skills.includes(skill));
    // Filtrado por ubicación (remoto)
    const matchesLocation =
      isFilterEmpty(filters.location) || filters.location.some((locationOption) => job.location.includes(locationOption));
    // Filtrado por fecha (simulación de horas o días)
    const matchesDate =
      isFilterEmpty(filters.date) || filters.date.some((dateOption) => tiempoTranscurrido(job.date).includes(dateOption));
    // Filtrado por nivel
    const matchesLevel =
      isFilterEmpty(filters.level) || filters.level.some((levelOption) => job.level.includes(levelOption));
    // Filtrado por compañía
    const matchesCompany =
      isFilterEmpty(filters.company) || filters.company.some((companyOption) => job.Company.name.includes(companyOption));
    // Si hay búsqueda por texto o filtros, aplicamos la lógica de filtrado
    if (isFiltering) {
      return matchesSearchText && matchesSkills && matchesLocation && matchesDate && matchesLevel && matchesCompany;
    }
    // Si no hay filtros ni búsqueda por texto, devolvemos todos los trabajos
    return true;
  });

  useEffect(() => {
    setLoading(true);
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

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <> <SkeletonSearchCard /> <SkeletonJobCards /> </>;

  return (
    <>
      <TagsCard />
      {filteredArr.length === 0 && <div className="text-center text-slate-500 dark:text-slate-400">No se encontraron resultados</div>}
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
