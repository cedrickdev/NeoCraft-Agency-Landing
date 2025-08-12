"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import React, { FunctionComponent } from "react";

interface BreadcrumbProps {
  label: string;
  href: string;
}

export const FullWidthHeader: FunctionComponent<{
  title: string;
  breadcrumb?: BreadcrumbProps[];
  className?: string;
}> = ({ title, breadcrumb, className }) => {
  return (
    <div
      className={cn(
        "pb-8 lg:pb-16 pt-4",
        className // Replace className with additional styling ie "bg-gradient-to-r from-teal-50 to-blue-50"
      )}
    >
      <div className="container mx-auto px-4 max-w-6xl ">
        {breadcrumb && (
          <Breadcrumb className="mt-16 text-inherit">
            <BreadcrumbList className="text-inherit">
              {breadcrumb?.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem className="text-inherit">
                    {index === breadcrumb.length - 1 ? (
                      <BreadcrumbPage className="text-inherit line-clamp-1">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        className="text-inherit opacity-60 line-clamp-1"
                        href={crumb.href}
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <div
          className={cn(
            "prose lg:prose-lg text-balance  px-4 text-inherit",
            breadcrumb ? "pt-16 lg:pt-18" : "pt-16 lg:pt-28"
          )}
        >
          <h1 className="text-inherit">{title}</h1>
        </div>
      </div>
    </div>
  );
};
