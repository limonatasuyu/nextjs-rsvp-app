import { ICreateRSVPDTO } from "../dto/rsvp.dto";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../db";
import { randomBytes } from "crypto";

export async function getRSVPPageByToken(token: string) {
  const params = {
    TableName: "rsvp-pages",
    Key: {
      token: token,
    },
  };

  try {
    const Item = await ddb.send(new GetCommand(params));
    if (!Item.Item) {
      return null;
    }
    return { ...Item.Item, userId: undefined };
  } catch (error) {
    console.error("Error fetching RSVP page:", JSON.stringify(error));
    throw error;
  }
}

export async function createRSVPPage(dto: ICreateRSVPDTO) {
  const token = randomBytes(32).toString("hex");
  console.log("token: ", token);
  const params = {
    TableName: "rsvp-pages",
    Item: {
      token: token,
      userId: dto.userId,
      eventTitle: dto.eventTitle,
      eventDescription: dto.eventDescription,
      collectMaybeData: dto.collectMaybeData,
      collectNotComingData: dto.collectNotComingData,
      ageRestricted: dto.ageRestricted,
      minimumAgeRequirement: dto.minimumAgeRequirement.toString() ?? "0",
      showAttendingCount: dto.showAttendingCount,
      showAttendees: dto.showAttendees,
      collectNote: dto.collectNote,
      templateId: dto.templateId.toString(),
    },
  };

  try {
    const command = new PutCommand(params);
    const response = await ddb.send(command);
    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to create RSVP page");
    }
    return { token };
  } catch (error) {
    console.error(JSON.stringify(error));

    throw error;
  }
}
