'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { Separator } from "@/components/ui/separator";
import Link from "next/link"
import {
  ArrowUpRight,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SettingsAccountPage() {

  const [applications, setApplications] = useState<any[]>([]);
  const userId = useSelector((state: RootState) => state.session?.user?.id);
  const token = useSelector((state: RootState) => state.session?.token);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/applications/user/${userId}`, {
      headers: {
        'x-auth-token': `${token}`,
      },
    })
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Postulaciones</h3>
        <p className="text-sm text-muted-foreground">
          Visualiza las ofertas en las que haz aplicado.
        </p>
      </div>
      <Separator />
      <Card
        className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
      >
        <CardContent>

          {applications ?
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Oferta</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <Link href={`/offers/${application.jobOfferId}`}>
                        <div className="font-medium">{application.JobOffer.Company.name}</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          {application.JobOffer.title}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>{new Date(application.appliedAt).toLocaleDateString()}</TableCell>
                    <TableCell><Badge variant="outline" className='bg-orange-500/15 border-orange-500 text-orange-400'>{application.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            :
            <div className="mt-5">
              <span className=" text-sm text-slate-300">Sin Postulaciones</span>
            </div>
          }

        </CardContent>
      </Card>
    </div>
  );
}
