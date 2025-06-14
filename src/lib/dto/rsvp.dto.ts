export interface ICreateRSVPDTO {
  token: string;
  eventTitle: string;
  eventDescription: string;
  collectMaybeData: boolean;
  collectNotComingData: boolean;
  ageRestricted: boolean;
  minimumAgeRequirement: number;
  showAttendingCount: boolean;
  showAttendees: boolean;
  collectNote: boolean;
  templateId: number;
  userId: string;
}

export interface IGetRSVPPageByTokenDTO {
  token: string;
}

export interface IGetRSVPPagesByUserDTO {
  userId: string;
}

export interface IDeleteRSVPPageDTO {
  userId: string;
  token: string;
}

export interface ISaveAttendeeByTokenDTO {
  eventToken: string;
  preference: "yes" | "maybe" | "not-coming";
  note?: string;
  title: string;
  name: string;
  email: string;
  tel: string;
  age?: number;
  comment?: string;
}

export interface IGetAttendeesByEventTokenDTO {
  eventToken: string;
}

export interface IDeleteAttendeeByTokenDTO {
  userId: string;
  token: string;
  attendeeId: string;
}