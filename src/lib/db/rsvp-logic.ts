import {
  ICreateRSVPDTO,
  IGetRSVPPageByTokenDTO,
  IGetRSVPPagesByUserDTO,
  IDeleteRSVPPageDTO,
  ISaveAttendeeByTokenDTO,
  IGetAttendeesByEventTokenDTO,
  IDeleteAttendeeByTokenDTO,
} from "../dto/rsvp.dto";
import { PutCommand, GetCommand, QueryCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../db";
import { v4 as uuidv4 } from "uuid";

export async function deleteAttendeeByToken(dto: IDeleteAttendeeByTokenDTO) {
  const page = await getRSVPPageByTokenWithUserId({ token: dto.token });

  if (!page) {
    throw new Error("Page not found");
  }

  if (page.userId !== dto.userId) {
    throw new Error("Unauthorized");
  }

  const updatedAttendees = (page.attendees || []).filter(
    (attendee: { id: string }) => attendee.id !== dto.attendeeId
  );

  if (updatedAttendees.length === page.attendees.length) {
    throw new Error("Attendee not found");
  }

  const params = {
    TableName: "rsvp-pages",
    Key: { token: dto.token },
    UpdateExpression: "SET attendees = :attendees",
    ExpressionAttributeValues: {
      ":attendees": updatedAttendees,
    },
  };

  try {
    const response = await ddb.send(new UpdateCommand(params));

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to delete attendee");
    }

    return { success: true, error: "" };
  } catch (error) {
    console.error("Error deleting attendee:", error);
    throw new Error("Internal error while deleting attendee");
  }
}

export async function getAttendeesByEventToken(dto: IGetAttendeesByEventTokenDTO) {
  const params = {
    TableName: "rsvp-pages",
    Key: {
      token: dto.eventToken,
    },
    ProjectionExpression: "attendees, showAttendees",
  };
  try {
    const data = await ddb.send(new GetCommand(params));
    if (!data.Item) {
      return null;
    }
    if (!data.Item.showAttendees) {
      throw new Error("Attendees are not visible for this event");
    }
    return data.Item.attendees || [];
  } catch (error) {
    console.error("Error fetching attendees:", JSON.stringify(error));
    throw error;
  }
}

export async function saveAttendeeByToken(dto: ISaveAttendeeByTokenDTO) {
  const newAttendee = {
    id: uuidv4(),
    preference: dto.preference,
    note: dto.note,
    title: dto.title,
    name: dto.name,
    email: dto.email,
    tel: dto.tel,
    age: dto.age ? dto.age.toString() : undefined,
    comment: dto.comment,
  };

  const params = {
    TableName: "rsvp-pages",
    Key: {
      token: dto.eventToken,
    },
    UpdateExpression: "SET attendees = list_append(if_not_exists(attendees, :empty), :new)",
    ExpressionAttributeValues: {
      ":new": [newAttendee],
      ":empty": [],
    },
  };

  try {
    const command = new UpdateCommand(params);
    const response = await ddb.send(command);
    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to save attendee");
    }
    return { success: true, error: "" };
  } catch (error) {
    console.error("Error saving attendee:", JSON.stringify(error));
    throw error;
  }
}

export async function updateRSVPPage(dto: ICreateRSVPDTO) {
  const existingPage = await getRSVPPageByTokenWithUserId({ token: dto.token });
  if (!existingPage) {
    throw new Error("Page not found");
  }
  if (existingPage.userId !== dto.userId) {
    throw new Error("Unauthorized");
  }
  const params = {
    TableName: "rsvp-pages",
    Item: {
      token: dto.token,
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
      throw new Error("Failed to update RSVP page");
    }
    return { token: dto.token };
  } catch (error) {
    console.error("Error updating RSVP page:", JSON.stringify(error));
    throw error;
  }
}

export async function deleteRSVPPage(dto: IDeleteRSVPPageDTO) {
  const page = await getRSVPPageByTokenWithUserId({ token: dto.token });
  if (!page) {
    throw new Error("Page not found");
  }

  if (page.userId !== dto.userId) {
    throw new Error("Unauthorized");
  }

  const params = {
    TableName: "rsvp-pages",
    Key: {
      token: dto.token,
    },
  };

  try {
    await ddb.send(new DeleteCommand(params));
  } catch (err) {
    console.error("Error deleting item:", JSON.stringify(err));
    throw err;
  }
}

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

async function getRSVPPageByTokenWithUserId(dto: IGetRSVPPageByTokenDTO) {
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
    return Item.Item;
  } catch (error) {
    console.error("Error fetching RSVP page:", JSON.stringify(error));
    throw error;
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
    return {
      ...Item.Item,
      userId: undefined,
      attendees: Item.Item.showAttendees ? Item.Item.attendees : undefined,
      attendeeCount: Item.Item.showAttendingCount ? Item.Item.attendees.length : 0,
    };
  } catch (error) {
    console.error("Error fetching RSVP page:", JSON.stringify(error));
    throw error;
  }
}

export async function createRSVPPage(dto: ICreateRSVPDTO) {
  const params = {
    TableName: "rsvp-pages",
    Item: {
      token: dto.token,
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
      attendees: [],
    },
  };

  try {
    const command = new PutCommand(params);
    const response = await ddb.send(command);
    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to create RSVP page");
    }
    return { token: dto.token };
  } catch (error) {
    console.error(JSON.stringify(error));

    throw error;
  }
}
