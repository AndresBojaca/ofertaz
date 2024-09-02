"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { removeallTags, removeTag, addTag } from "@/store/TagsSlice";
import "./SearchCard.css";

function SearchCard() {
  const router = useRouter();
  // Tiempo de espera para el debounce
  const DEBOUNCE_TIME = 500;
  const tags = useSelector((state: any) => state.tags);
  // Estado para verificar si el componente se montó
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");

  // Debounce para el input
  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);

  useEffect(() => {
    // Usamos useEffect para cambiar el estado de 'mounted' solo en el cliente
    setMounted(true);
    // Si hay tags en el localStorage, los añadimos al store
    if (tags.length === 0) {
      tags.map((tag: any) => dispatch(addTag(tag)));
    }
  }, [dispatch, tags]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleInputSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita que el formulario se envíe si existe un form envolviendo el input
      router.push(`/jobs/?q=${debouncedSearch}`); // Navega a la página con el parámetro de búsqueda
    }
  };

  const clearFilter = () => {
    setSearch("");
    dispatch(removeallTags());
  };

  if (!mounted) return null;

  return (
    <>
      <div className="flex relative">
        <div className="search__input">
          <input
            placeholder="Buscar por Tecnología, Lenguaje, Framework, Locación etc..."
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleInputSearch}
            className="dark:bg-slate-700 bg-slate-200 dark:text-white text-slate-900 placeholder-slate-900 dark:placeholder-slate-300"
          />
        </div>
        <div className="clear-btn text-cyan-400" onClick={() => clearFilter()}>
          {search.length > 0 && (
            <X className="h-5 font-bold dark:text-white text-slate-900 absolute cursor-pointer right-2" />
          )}
        </div>
      </div>
    </>
  );
}

export default SearchCard;
