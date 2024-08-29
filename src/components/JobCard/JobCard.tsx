
'use client';

import { useDispatch } from 'react-redux'
import { addTag } from '@/store//TagsSlice'
import "./JobCard.css";
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import Link from "next/link";

export default function JobCard(props: any) {

  const dispatch = useDispatch();

  return (
    <div className="job__card dark:bg-slate-900 bg-slate-50 relative">
     
    { 
    // Aquí se añade un badge si la oferta es nueva 
    props.date.includes('horas') || props.date.includes('dia') || props.date.includes('días')  ? 
      <div className="flex items-center space-x-2 absolute -left-3 top-3">
        <span className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded badge-new">
          Nuevo
        </span>
      </div> 
      : null
      }

      <div className="job__card--logo shadow-xl shadow-black/5 rounded-[10px] dark:shadow-white/10">
        <ProfilePicture url={props.logo} borderRadius='10' name={props.company} />
      </div>
      <div className="job__card--info">
        <h1 className="job__card__company--text">
          {props.company}
        </h1>
        <Link href={`/offers/${props.id}`}>
          <h2 className="job__card__role--text text-cyan-400">{props.position}</h2>
        </Link>
        <div className="job__card--tools">
          {props.role && (
            <div className="tool bg-black/5 dark:bg-white/5 text-slate-900 dark:text-slate-50" onClick={() => dispatch(addTag(props.role))}>
              {props.role}
            </div>
          )}
          {props.level && (
            <div className="tool bg-black/5 dark:bg-white/5 text-slate-900 dark:text-slate-50" onClick={() => dispatch(addTag(props.level))}>
              {props.level}
            </div>
          )}
          {props.skills.map((skill: any, index: any) => (
            <div key={index} className="tool bg-black/5 dark:bg-white/5 text-slate-900 dark:text-slate-50" onClick={() => dispatch(addTag(skill))}>
              {skill}
            </div>
          ))}
        </div>
        <h3 className="job__card__features--text text-slate-500">
          {props.date}
          <span className="dot">·</span>
          {props.contract}
          <span className="dot">·</span>
          {props.location}
        </h3>
      </div>
    </div>
  );
}
