"use client";

import * as React from "react";
import { removeallTags, removeTag } from "@/store/TagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function FiltersList() {
  // Opciones de los diferentes filtros
  const DATE_OF_PUBLICATION_OPTIONS = ["Hoy", "Ayer", "Última Semana", "Último Mes"];
  const EXPERIENCE_LEVEL_OPTIONS = ["Junior", "Semi-Senior", "Senior"];
  const COMPANY_OPTIONS = ["Google", "Facebook", "Amazon", "Netflix", "Apple"];
  const REMOTE_OPTIONS = ["Remoto", "Presencial", "Híbrido"];

  const dispatch = useDispatch();
  const tags = useSelector((state: any) => state.tags); // Obtener los tags del store

  // Estados independientes para cada filtro
  const [checkedDateItems, setCheckedDateItems] = React.useState<Record<string, Checked>>(
    DATE_OF_PUBLICATION_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );

  const [checkedExperienceItems, setCheckedExperienceItems] = React.useState<Record<string, Checked>>(
    EXPERIENCE_LEVEL_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );

  const [checkedCompanyItems, setCheckedCompanyItems] = React.useState<Record<string, Checked>>(
    COMPANY_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );

  const [checkedRemoteItems, setCheckedRemoteItems] = React.useState<Record<string, Checked>>(
    REMOTE_OPTIONS.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );

  const [checkedTagsItems, setCheckedTagsItems] = React.useState<Record<string, Checked>>({});

  // useEffect para sincronizar el estado local de tags con el estado del store
  React.useEffect(() => {
    // Crear un objeto con el estado checked basado en los tags del store
    const updatedCheckedTagsItems = tags.reduce((acc: Record<string, Checked>, tag: string) => {
      acc[tag] = true; // Marcar como true si el tag está en el store
      return acc;
    }, {});

    // Actualizar el estado local
    setCheckedTagsItems(updatedCheckedTagsItems);
  }, [tags]); // Ejecutar cuando cambie 'tags' en el store

  // Manejadores de cambio de estado para cada filtro
  const handleCheckedChange = (
    setItems: React.Dispatch<React.SetStateAction<Record<string, Checked>>>
  ) => (item: string, checked: Checked) => {
    setItems((prevState) => ({
      ...prevState,
      [item]: checked,
    }));
  };

  const handleCheckedChangeTag = (
    setItems: React.Dispatch<React.SetStateAction<Record<string, Checked>>>
  ) => (item: string, checked: Checked) => {
    setItems((prevState) => ({
      ...prevState,
      [item]: checked,
    }));
    // Remover el tag del store si el item no está checked
    if (!checked) {
      dispatch(removeTag(item)); // Llamada a la acción de Redux
    }
  };

  // Obtener texto seleccionado para mostrar junto al botón
  const getSelectedText = (items: Record<string, Checked>) => {
    const selectedItems = Object.keys(items).filter((key) => items[key]);
    return selectedItems.length > 0 ? <div>:<span className="bg-cyan-400 ml-2 text-white px-2 py-0.5 rounded-full text-xs">{selectedItems.join(", ")}</span></div> : "";
  };

  const handleRemoveAllTags = () => { 
    dispatch(removeallTags()); // Llamada a la acción de Redux
    setCheckedTagsItems({}); // Limpiar el estado local
  }

  return (
    <div className="flex gap-4">
      {/* Filtro de Fecha de Publicación */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-xs shadow-md">
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
              checked={checkedDateItems[item]} // El estado correspondiente a esta opción
              onCheckedChange={(checked) =>
                handleCheckedChange(setCheckedDateItems)(item, checked)
              } // Manejador de cambio
            >
              <DropdownMenuLabel>{item}</DropdownMenuLabel>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtro de Nivel de Experiencia */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-xs shadow-md">
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
              onCheckedChange={(checked) =>
                handleCheckedChange(setCheckedExperienceItems)(item, checked)
              }
            >
              <DropdownMenuLabel>{item}</DropdownMenuLabel>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtro de Empresa */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-xs shadow-md">
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
              onCheckedChange={(checked) =>
                handleCheckedChange(setCheckedCompanyItems)(item, checked)
              }
            >
              <DropdownMenuLabel>{item}</DropdownMenuLabel>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtro de Remoto */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-xs shadow-md">
          <Button variant="outline">
            Remoto {getSelectedText(checkedRemoteItems)}
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {REMOTE_OPTIONS.map((item) => (
            <DropdownMenuCheckboxItem
              className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              key={item}
              checked={checkedRemoteItems[item]}
              onCheckedChange={(checked) =>
                handleCheckedChange(setCheckedRemoteItems)(item, checked)
              }
            >
              <DropdownMenuLabel>{item}</DropdownMenuLabel>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Tags */}
      {tags.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="text-slate-900 dark:text-slate-50 border-0 font-thin text-xs shadow-md">
            <Button variant="outline">
              Etiquetas {tags.length > 0 && <span className="bg-cyan-400 ml-2 text-white px-2 py-0.5 rounded-full text-xs">{tags.join(", ")}</span>}
              <ChevronDown className="w-3 h-3 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {tags.map((item: any) => (
              <DropdownMenuCheckboxItem
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                key={item}
                checked={checkedTagsItems[item] || false} // Utilizar el estado local sincronizado con el store
                onCheckedChange={(checked) =>
                  handleCheckedChangeTag(setCheckedTagsItems)(item, checked)
                }
              >
                <DropdownMenuLabel>{item}</DropdownMenuLabel>
              </DropdownMenuCheckboxItem>
            ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm"><div onClick={handleRemoveAllTags} className="text-xs align-middle justify-center flex gap-2 text-slate-900 cursor-pointer dark:text-slate-50">Quitar Todas <Trash2 className="text-red-500 w-4 h-4" /></div></DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      }
    </div>
  );
}
