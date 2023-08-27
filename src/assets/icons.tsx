import * as React from "react";
import { SVGProps } from "react";

export const SidebarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" {...props}>
    <rect width={12} height={11.188} x={0.5} y={0.5} stroke="#fff" rx={1.5} />
    <path stroke="#fff" d="M2 .5h2.375v11.188H2a1.5 1.5 0 0 1-1.5-1.5V2A1.5 1.5 0 0 1 2 .5Z" />
  </svg>
);

export const AddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={9} fill="none" {...props}>
    <rect width={1.286} height={9} x={3.857} fill="#D9D9D9" rx={0.4} />
    <rect width={1.286} height={9} x={9} y={3.857} fill="#D9D9D9" rx={0.4} transform="rotate(90 9 3.857)" />
  </svg>
);

export const ViewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={11} height={11} fill="none" {...props}>
    <rect width={10.4} height={10.4} x={0.3} y={0.3} stroke="#fff" strokeOpacity={0.8} strokeWidth={0.6} rx={5.2} />
    <rect width={4.4} height={4.4} x={3.3} y={3.3} stroke="#fff" strokeOpacity={0.8} strokeWidth={0.6} rx={2.2} />{" "}
  </svg>
);

export const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <rect width={7.4} height={7.4} x={0.3} y={10.3} stroke="#fff" strokeOpacity={0.8} strokeWidth={0.6} rx={1.7} />
    <rect width={7.4} height={7.4} x={10.3} y={10.3} stroke="#fff" strokeOpacity={0.8} strokeWidth={0.6} rx={1.7} />
    <rect width={7.4} height={7.4} x={0.3} y={0.3} stroke="#fff" strokeOpacity={0.8} strokeWidth={0.6} rx={1.7} />
    <rect width={7.4} height={7.4} x={10.3} y={0.3} stroke="#fff" strokeOpacity={0.8} strokeWidth={0.6} rx={1.7} />
  </svg>
);
