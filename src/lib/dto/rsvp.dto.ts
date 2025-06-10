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