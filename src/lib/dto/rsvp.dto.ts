export interface ICreateRSVPDTO {
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