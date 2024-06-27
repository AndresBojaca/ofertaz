import React from 'react'
import { useDispatch } from 'react-redux'
import { addTag } from '../../features/tags/tagsSlice'
import "./JobCard.css";

function JobCard(props) {

  const dispatch = useDispatch()
  return (
    <div className="job__card">
      <div className="job__card--logo">
        <img src={require(`../../assets${props.logo}`)} alt="" />
      </div>
      <div className="job__card--info">
        <h1 className="job__card__company--text">
          {props.company}
          {props.new === true && (
            <span className="job__card--badje-new">Nuevo!</span>
          )}
          {props.featured === true && (
            <span className="job__card--badje-featured">Recomendado</span>
          )}
        </h1>
        <h2 className="job__card__role--text">{props.position}</h2>
        <h3 className="job__card__features--text">
          {props.postedAt}
          <span className="dot">·</span>
          {props.contract}
          <span className="dot">·</span>
          {props.location}
        </h3>
      </div>
      <div className="job__card--tools">
        {props.role && (
          <div className="tool" onClick={() => dispatch(addTag(props.role))}>
            {props.role}
          </div>
        )}
        {props.level && (
          <div className="tool" onClick={() => dispatch(addTag(props.level))}>
            {props.level}
          </div>
        )}
        {props.languages.map((language) => (
          <div
            key={language}
            onClick={() => dispatch(addTag(language))}
            className="tool"
          >
            {language}
          </div>
        ))}
        {props.tools.map((tool, index) => (
          <div key={index} className="tool" onClick={() => dispatch(addTag(tool))}>
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}
export default JobCard;
