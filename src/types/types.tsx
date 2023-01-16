import { ReactNode } from "react";
import { IconType } from "react-icons";

export interface Publication {
  Index: string;
  NamePublication: string;
  Cost: string;
}
export interface Subscriber {
  ID: string;
  FullName: string;
  Address: string;
}

export interface Subscription {
  Index: string;
  ID: string;
  MonthOfSub: string;
  StartDate: string;
  idEntry: string;
}

export interface menuItem {
  path: string;
  name: string;
  icon: ReactNode;
}
