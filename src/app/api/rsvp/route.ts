import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

interface CreateRSVPPAGE {
  eventTitle: string;
  eventDescription: string;
  collectMaybeData: boolean;
  collectNotComingData: boolean;
  ageRestricted: boolean;
  minimumAgeRequirement: number;
  showAttendingCount: boolean;
  showAttendees: boolean;
  userId: string;
  themeId: number;
};

interface GetRSVPPAGE {
  eventTitle: string;
  eventDescription: string;
  collectMaybeData: boolean;
  collectNotComingData: boolean;
  ageRestricted: boolean;
  minimumAgeRequirement: number;
  showAttendingCount: boolean;
  showAttendees: boolean;
  userId: string;
  themeId: number;
  token: string;
}

export async function POST(request: Request) {
  const body: CreateRSVPPAGE = await request.json();
  const client = new DynamoDBClient({});
  const token = crypto.randomUUID();

  const params = {
    TableName: "rsvp-tokens",
    Item: {
      token: { S: token },
      themeId: { N: "1" },
      userId: { S: "1" },
    },
  };
}
