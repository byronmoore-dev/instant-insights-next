import * as React from "react";
import { SVGProps } from "react";

export const SidebarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={13} height={13} fill="none" {...props}>
    <rect width={12} height={11.188} x={0.5} y={0.5} rx={1.5} />
    <path d="M2 .5h2.375v11.188H2a1.5 1.5 0 0 1-1.5-1.5V2A1.5 1.5 0 0 1 2 .5Z" />
  </svg>
);

export const AddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={9} height={9} fill="none" {...props}>
    <rect width={1.286} height={9} x={3.857} rx={0.4} />
    <rect width={1.286} height={9} x={9} y={3.857} rx={0.4} transform="rotate(90 9 3.857)" />
  </svg>
);

export const ViewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={11} height={11} fill="none" {...props}>
    <rect width={10.4} height={10.4} x={0.3} y={0.3} strokeOpacity={0.8} strokeWidth={0.6} rx={5.2} />
    <rect width={4.4} height={4.4} x={3.3} y={3.3} strokeOpacity={0.8} strokeWidth={0.6} rx={2.2} />{" "}
  </svg>
);

export const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={18} fill="none" {...props}>
    <rect width={7.4} height={7.4} x={0.3} y={10.3} strokeOpacity={0.8} strokeWidth={0.6} rx={1.7} />
    <rect width={7.4} height={7.4} x={10.3} y={10.3} strokeOpacity={0.8} strokeWidth={0.6} rx={1.7} />
    <rect width={7.4} height={7.4} x={0.3} y={0.3} strokeOpacity={0.8} strokeWidth={0.6} rx={1.7} />
    <rect width={7.4} height={7.4} x={10.3} y={0.3} strokeOpacity={0.8} strokeWidth={0.6} rx={1.7} />
  </svg>
);

export const UploadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg strokeWidth={2} className="h-6 w-6" viewBox="0 0 24 24" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    />
  </svg>
);

export const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg strokeWidth={1.5} className="h-6 w-6" viewBox="0 0 24 24" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

export const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6" viewBox="0 0 24 24" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125"
    />
  </svg>
);
