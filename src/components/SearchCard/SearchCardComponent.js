import React, { useEffect, useState } from "react";
import closelogo from "../../assets/images/icon-remove.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  removeallTags,
  removeTag,
  addTag,
} from "../../features/tags/tagsSlice";
import "./SearchCard.css";

function SearchCard({ setSearchText }) {
  const tags = useSelector((state) => state.tags);
  const tagsStorage = localStorage.getItem("tags");
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (JSON.parse(tagsStorage)) {
      // Si encontró tags en el storage cambia el estado
      JSON.parse(tagsStorage)?.map((tag) => dispatch(addTag(tag)));
    }
  }, [dispatch, tagsStorage]);

  const handleInputChange = (e) => {
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
      <div className="search__card">
        <div className="search__input--container">
          <div className="search__input">
            <input
              placeholder="Buscar por Tecnología, Lenguaje, Framework, Locación etc..."
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="clear-btn"
            onClick={() => clearFilter()}
          >
            <h1>Borrar</h1>
          </div>
        </div>
        <div className="tools-container">
          {tags.map((tool, index) => (
            <div key={index} className="tool">
              <span>{tool}</span>
              <div
                className="close-btn"
                onClick={() => dispatch(removeTag(tool))}
              >
                <img src={closelogo} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
