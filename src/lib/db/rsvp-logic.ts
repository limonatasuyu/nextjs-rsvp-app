import { ICreateRSVPDTO, IGetRSVPPageByTokenDTO, IGetRSVPPagesByUserDTO } from "../dto/rsvp.dto";
import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../db";
import { randomBytes } from "crypto";

export async function getRSVPPagesByUser(dto: IGetRSVPPagesByUserDTO) {
  const params = {
    TableName: "rsvp-pages",
    IndexName: "userId-index",
    KeyConditionExpression: "#userId = :userIdValue",
    ExpressionAttributeNames: {
      "#userId": "userId",
    },
    ExpressionAttributeValues: {
      ":userIdValue": dto.userId,
    },
  };

  try {
    const data = await ddb.send(new QueryCommand(params));
    return data.Items;
  } catch (err) {
    console.error("Error querying GSI:", JSON.stringify(err));
    throw err;
  }
}

export async function getRSVPPageByToken(dto: IGetRSVPPageByTokenDTO) {
  const params = {
    TableName: "rsvp-pages",
    Key: {
      token: dto.token,
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
