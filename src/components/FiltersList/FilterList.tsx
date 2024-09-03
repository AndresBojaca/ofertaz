"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { addFilter, removeAllFilters } from "@/store/filterSlice";
import { FiltersState } from "@/store/types";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function FiltersList() {
  const dispatch = useDispatch(); // Hook para usar dispatch de Redux
  const filters = useSelector((state: { filters: FiltersState }) => state.filters); // Obtén el estado de los filtros del store

  const DATE_OF_PUBLICATION_OPTIONS = ["Hoy", "Ayer", "Última Semana", "Último Mes"];
  const EXPERIENCE_LEVEL_OPTIONS = ["Junior", "Semi-Senior", "Senior"];
  const COMPANY_OPTIONS = ["Google", "Facebook", "Amazon", "Netflix", "Apple"];
  const LOCATION_OPTIONS = ["Remoto", "Madrid, España", "Ciudad de México, México"];
  const SKILLS_OPTIONS = ["JavaScript", "Node.js", "React", "MySQL"];

  const [checkedDateItems, setCheckedDateItems] = useState<Record<string, Checked>>(
    DATE_OF_PUBLICATION_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );

  const [checkedExperienceItems, setCheckedExperienceItems] = useState<Record<string, Checked>>(
    EXPERIENCE_LEVEL_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );

  const [checkedCompanyItems, setCheckedCompanyItems] = useState<Record<string, Checked>>(
    COMPANY_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );

  const [checkedLocationItems, setCheckedLocationItems] = useState<Record<string, Checked>>(
    LOCATION_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );

  const [checkedSkillsItems, setCheckedSkillsItems] = useState<Record<string, Checked>>(
    SKILLS_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );


  useEffect(() => {
    // Sincroniza el estado local con el estado del store de Redux
    setCheckedDateItems((prevState) => ({
      ...prevState,
      ...DATE_OF_PUBLICATION_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: filters.date.includes(option) }), {}),
    }));

    setCheckedExperienceItems((prevState) => ({
      ...prevState,
      ...EXPERIENCE_LEVEL_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: filters.level.includes(option) }), {}),
    }));

    setCheckedCompanyItems((prevState) => ({
      ...prevState,
      ...COMPANY_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: filters.company.includes(option) }), {}),
    }));

    setCheckedLocationItems((prevState) => ({
      ...prevState,
      ...LOCATION_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: filters.location.includes(option) }), {}),
    }));

    setCheckedSkillsItems((prevState) => ({
      ...prevState,
      ...SKILLS_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: filters.skills.includes(option) }), {}),
    }));
  }, [filters]); // Dependencia del estado del store de Redux

  const handleCheckedChange = (
    setItems: React.Dispatch<React.SetStateAction<Record<string, Checked>>>,
    filterType: keyof FiltersState
  ) => (item: string, checked: Checked) => {
    setItems((prevState) => ({
      ...prevState,
      [item]: checked,
    }));
    dispatch(addFilter({ filterType, value: item }));
  };

  const getSelectedText = (items: Record<string, Checked>) => {
    const selectedItems = Object.keys(items).filter((key) => items[key]);
    return selectedItems.length > 0 ? (
      <div>
        :<span className="bg-cyan-400 ml-2 text-white px-2 py-0.5 rounded-full text-sm">{selectedItems.join(", ")}</span>
      </div>
    ) : (
      ""
    );
  };

  const handleRemoveAllFilters = () => {
    dispatch(removeAllFilters());
    setCheckedDateItems(DATE_OF_PUBLICATION_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {}));
    setCheckedExperienceItems(EXPERIENCE_LEVEL_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {}));
    setCheckedCompanyItems(COMPANY_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {}));
    setCheckedLocationItems(LOCATION_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {}));
  };

  return (
    <div className="flex gap-4">
      {/* Filtro de Fecha de Publicación */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-sm shadow-md">
          <Button variant="outline">
            Fecha de Publicación {getSelectedText(checkedDateItems)}
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {DATE_OF_PUBLICATION_OPTIONS.map((item) => (
            <DropdownMenuCheckboxItem
              className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              key={item}
              checked={checkedDateItems[item]}
              onCheckedChange={(checked) => handleCheckedChange(setCheckedDateItems, "date")(item, checked)}
            >
              <DropdownMenuLabel>{item}</DropdownMenuLabel>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtro de Nivel de Experiencia */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-sm shadow-md">
          <Button variant="outline">
            Nivel de Experiencia {getSelectedText(checkedExperienceItems)}
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {EXPERIENCE_LEVEL_OPTIONS.map((item) => (
            <DropdownMenuCheckboxItem
              className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              key={item}
              checked={checkedExperienceItems[item]}
              onCheckedChange={(checked) => handleCheckedChange(setCheckedExperienceItems, "level")(item, checked)}
            >
              <DropdownMenuLabel>{item}</DropdownMenuLabel>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtro de Empresa */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-sm shadow-md">
          <Button variant="outline">
            Empresa {getSelectedText(checkedCompanyItems)}
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {COMPANY_OPTIONS.map((item) => (
            <DropdownMenuCheckboxItem
              className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              key={item}
              checked={checkedCompanyItems[item]}
              onCheckedChange={(checked) => handleCheckedChange(setCheckedCompanyItems, "company")(item, checked)}
            >
              <DropdownMenuLabel>{item}</DropdownMenuLabel>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtro de Locacion */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-sm shadow-md">
          <Button variant="outline">
            Locación {getSelectedText(checkedLocationItems)}
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {LOCATION_OPTIONS.map((item) => (
            <DropdownMenuCheckboxItem
              className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              key={item}
              checked={checkedLocationItems[item]}
              onCheckedChange={(checked) => handleCheckedChange(setCheckedLocationItems, "location")(item, checked)}
            >
              <DropdownMenuLabel>{item}</DropdownMenuLabel>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtro de Skills */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-sm shadow-md">
          <Button variant="outline">
            Etiquetas {getSelectedText(checkedSkillsItems)}
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {SKILLS_OPTIONS.map((item) => (
            <DropdownMenuCheckboxItem
              className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              key={item}
              checked={checkedSkillsItems[item]}
              onCheckedChange={(checked) => handleCheckedChange(setCheckedSkillsItems, "skills")(item, checked)}
            >
              <DropdownMenuLabel>{item}</DropdownMenuLabel>
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Botón para quitar todas las etiquetas */}
      <Button onClick={handleRemoveAllFilters} variant="default" className="text-sm dark:text-slate-400 text-slate-800 flex gap-2 hover:bg-transparent">
        Restablecer <Trash2 className="text-red-500 w-4 h-4" />
      </Button>
    </div>
  );
}
