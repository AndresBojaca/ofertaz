import React, { useEffect, useState } from "react";
import closelogo from "../../../public/icon-remove.svg";
import { X } from "lucide-react"

import { useDispatch, useSelector } from "react-redux";
import {
  removeallTags,
  removeTag,
  addTag,
} from "@/store/TagsSlice";
import "./SearchCard.css";

function SearchCard({ setSearchText }:any) {
  const tags = useSelector((state:any) => state.tags);
  const tagsStorage:any = localStorage.getItem("tags");
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (JSON.parse(tagsStorage)) {
      // Si encontró tags en el storage cambia el estado
      JSON.parse(tagsStorage)?.map((tag:any) => dispatch(addTag(tag)));
    }
  }, [dispatch, tagsStorage]);

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
    setSearchText(e.target.value);
  };

  const clearFilter = () => {
    setInputValue('');
    setSearchText('');
    dispatch(removeallTags());
  }

  return (
    <div className="w-full">
      <div className="search__card dark:bg-slate-900 bg-slate-50">
        <div className="search__input--container">
          <div className="search__input">
            <input
              placeholder="Buscar por Tecnología, Lenguaje, Framework, Locación etc..."
              value={inputValue}
              onChange={handleInputChange}
              className="dark:bg-slate-700 bg-slate-200 placeholder-slate-900 dark:placeholder-slate-50"
            />
          </div>
          <div className="clear-btn text-cyan-400"
            onClick={() => clearFilter()}
          >
            <h1>Borrar</h1>
          </div>
        </div>
        <div className="tools-container">
          {tags.map((tool:any, index:any) => (
            <div key={index} className="tool bg-cyan-400 text-slate-900">
              <span>{tool}</span>
              <div
                className="close-btn bg-slate-200 dark:bg-slate-800"
                onClick={() => dispatch(removeTag(tool))}
              >
                <X className="text-slate-500 dark:text-white h-5 font-bold" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
