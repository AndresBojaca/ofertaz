
'use client';

import { useDispatch } from 'react-redux'
import { addFilter } from '@/store/filterSlice'
import "./JobCard.css";
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import Link from "next/link";
import { Wifi, MapPin } from 'lucide-react';

type JobCard = {
  id: number;
  date: string;
  contract: string;
  location: string;
  Company: {
    name: string
    logo: string
  }
  role: string;
  position: string;
  level: string;
  skills: string[];
}


export default function JobCard(props: JobCard) {

  const dispatch = useDispatch();

  return (
    <div className="job__card dark:bg-slate-900 bg-slate-50 relative">

      {
        // Aquí se añade un badge si la oferta es nueva 
        props.date.includes('horas') || props.date.includes('dia') || props.date.includes('días') ?
          <div className="flex items-center space-x-2 absolute -left-3 top-3">
            <span className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded badge-new">
              Nuevo
            </span>
          </div>
          : null
      }

      <div className="job__card--logo shadow-xl shadow-black/5 rounded-[10px] dark:shadow-white/10">
        <ProfilePicture url={props.Company.logo} borderRadius='10' name={props.Company.name} />
      </div>
      <div className="job__card--info">
        <h1 className="job__card__company--text">
          {props.Company.name}
        </h1>
        <Link href={`/offers/${props.id}`}>
          <h2 className="job__card__role--text text-cyan-400">{props.position}</h2>
        </Link>
        <div className="job__card--tools">
          {props.skills.map((skill: any, index: any) => (
            <div key={index} className="tool bg-black/5 dark:bg-white/5 text-slate-900 dark:text-slate-50" onClick={() => dispatch(addFilter({ filterType: 'skills', value: skill }))}>
              {skill}
            </div>
          ))}
        </div>
        <div className="job__card__features--text text-slate-500 text-xs flex">
          {props.date}
          <span className="dot">·</span>
          {props.contract}
          <span className="dot">·</span>
          {props.level}
          <span className="dot">·</span>
          <div className="flex inline-block align-middle justify-center gap-1">
          {props.location === 'Remoto' ? <Wifi className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
          {props.location}
          </div>
        </div>
      </div>
    </div>
  )
}
