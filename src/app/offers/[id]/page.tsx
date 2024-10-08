"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ProfilePicture from "@/components/ProfilePicture/ProfilePicture";
import { CircleCheckBig, CircleArrowRight, CircleArrowLeft,  MapPin, Timer, Users, LogIn } from "lucide-react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface JobOffer {
  id: number;
  title: string;
  date: string;
  description: string;
  position: string;
  contract: string;
  role: string;
  level: string;
  location: string;
  perks: Array<any>;
  skills: Array<any>;
  logo: string;
  Company: any;
  salary: number;
  salaryCurrency: string;
  applications: number;
  companyId: number;
}

export default function Offers() {

  const params = useParams();
  const router = useRouter();

  const userId = useSelector((state: RootState) => state.session?.user?.id);
  const token = useSelector((state: RootState) => state.session?.token);
  const isConfirmed = useSelector((state: RootState) => state.session?.isConfirmed);
  const isAuthenticated = useSelector((state: RootState) => state.session?.isAuthenticated);

  const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingAppliedButton, setloadingAppliedButton] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {

    const fetchDataAndCheckApplication = async () => {
      try {
        const response = await axios.get<JobOffer>(`${process.env.NEXT_PUBLIC_API_URL}/jobOffers/${params.id}`);
        setJobOffer(response.data);

        if (isAuthenticated != false && response.data.id) {
          try {
            const responseApplied = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/applications/user/${userId}/jobOffer/${response.data.id}`,
              {
                headers: {
                  'x-auth-token': token,
                },
              });
            setHasApplied(responseApplied.data?.applied);
          } catch {
            setHasApplied(false);
          }
        }
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDataAndCheckApplication();
  }, [params.id, userId]);

  const handleApply = async () => {
    setloadingAppliedButton(true);
    try {
      // Se envía la solicitud de aplicación
      const requestApplications = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/applications`,
        {
          userId: userId,
          jobOfferId: jobOffer?.id,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      // Si la solicitud fue exitosa, se muestra el botón de aplicado
      if (requestApplications.status === 201) {
        setTimeout(() => {
          setloadingAppliedButton(false);
          setHasApplied(true);
        }, 800);
      }
    } catch (error) {
      console.error('Error applying for job offer:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="relative h-[600px]">
        <div className="h-full bg-gradient-to-br from-cyan-500 to-blue-500 absolute w-svw -top-10 left-1/2 -translate-x-1/2">
          <Link href={'/'} className="absolute top-8 left-8 text-white flex gap-2"><CircleArrowLeft/> Ver mas empleos</Link>
          <div className="flex flex-col gap-4 justify-center items-center w-full h-full px-3 md:px-0">
            <div className="text-left flex gap-3 flex-col">
              <div className="flex gap-3 items-center">
                <div className="h-12 w-12">
                  <ProfilePicture url={jobOffer?.Company?.logo} borderRadius='10' name={jobOffer?.Company?.name} fontSize="15" />
                </div>
                <span className="text-slate-50 flex flex-col">
                  {jobOffer?.Company?.name}
                  <strong className="text-sm">{new Date(jobOffer?.date || 0).toLocaleDateString()}</strong>
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {jobOffer?.title}
              </h1>
              <div className="flex flex-col text-sm gap-2 text-white">
                <div className="flex gap-1">
                  <MapPin size={20} />
                  {jobOffer?.location}
                </div>
                <div className="flex gap-1">
                  <Users size={20} />
                  <strong>
                    {jobOffer?.applications}
                  </strong>
                  postulaciones
                </div>
                <span className="flex gap-1"><Timer size={20} /> Respuesta de <strong>{jobOffer?.Company?.responseTime}</strong></span>
              </div>
              <div className="flex gap-3 text-sm text-white bg-white/10 w-fit rounded-md p-2 pl-4">
                {jobOffer?.perks.map(perk =>
                  <span className="border-r border-white pr-3 last:border-0" key={perk}>{perk} </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-3/4 px-4">
            <h2 className="text-xl font-bold mb-4">Descripción</h2>
            <ScrollArea className="w-full rounded-md border p-4 dark:border-slate-800 border-slate-300 bg-slate-50 dark:bg-slate-900 mb-4">
              <div dangerouslySetInnerHTML={{ __html: jobOffer?.description || "" }} />
            </ScrollArea>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <h3 className="text-lg font-bold mb-4">Postulación</h3>
            <div className="rounded-md border p-4 dark:border-slate-800 border-slate-300 bg-slate-50 dark:bg-slate-900 ">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8">
                    <ProfilePicture url={jobOffer?.Company?.logo} borderRadius='6' name={jobOffer?.Company?.name} fontSize="15" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{jobOffer?.Company?.name} </p>
                    <p className="text-sm text-muted-foreground">Respuesta de {jobOffer?.Company?.responseTime} </p>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div>

                <Button
                  variant={loadingAppliedButton ? 'loading' : 'default'}
                  onClick={!isAuthenticated ? () => router.push('/login') : handleApply}
                  className={hasApplied ? "text-white text-center flex items-center justify-center w-full bg-green-500 opacity-100 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 hover:bg-green-500 pointer-events-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" : "text-white text-center flex items-center justify-center w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"}>

                  {!isAuthenticated && <span className="flex gap-2">Inicia Sesión para aplicar<LogIn size={20} /></span>}
                  {hasApplied && <span className="flex gap-2">Ya Aplicado <CircleCheckBig size={20} /></span>}
                  {!hasApplied && isAuthenticated && <span className="flex gap-2">Aplicar a esta oferta<CircleArrowRight size={20} /></span>}
                </Button>

                <button className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                  <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-slate-200 dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                    Compartir
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
