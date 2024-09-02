import * as React from "react"
import { X } from "lucide-react";
import "./TagsCard.css";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "../ui/separator";
import { FiltersList } from "../FiltersList/FilterList";


export default function TagsCard() {

  return (
    <>
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white p-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/jobs">Empleos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Filtro</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </h3>
        <div>

          <div className="my-4">
            <FiltersList />
          </div>
        </div>
      </div>
    </>
  );
}