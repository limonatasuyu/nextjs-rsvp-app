import { JSX } from "react";
import { EventData } from "../events/types";

export type TemplateProps = {
  data: EventData;
};

export type TemplateType = ({ data }: TemplateProps) => JSX.Element;

export interface IAttendee {
  eventToken: string;
  preference: "yes" | "maybe" | "not-coming";
  title: string;
  name: string;
  email: string;
  tel: string;
  note?: string;
  age?: number;
}