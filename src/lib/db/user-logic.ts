import { ddb } from "../db";
import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

export async function getUserByEmail(email: string) {
  const getParams = {
    TableName: "next-auth",
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1PK = :gsi1pk",
    ExpressionAttributeValues: {
      ":gsi1pk": `USER#${email}`,
    },
  };

  try {
    const result = await ddb.send(new QueryCommand(getParams));
    return result?.Items?.[0];
  } catch (err: unknown) {
    console.error("Error:", JSON.stringify(err));
  }
}

export async function getCredentialsAccountByEmail(email: string) {
  const params = {
    TableName: "next-auth",
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1PK = :gsi1pk",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":gsi1pk": "ACCOUNT#credentials",
      ":email": email,
    },
  };

  const result = await ddb.send(new QueryCommand(params));
  return result.Items?.[0];
}

export async function createUser(user: { email: string; hashedPassword: string; name: string }) {
  const { email, hashedPassword, name } = user;
  const existingUser = await getUserByEmail(email);
  const id = existingUser?.id ?? uuidv4();

  const userItem = {
    TableName: "next-auth",
    Item: {
      pk: `USER#${id}`,
      sk: `USER#${id}`,
      id,
      GSI1PK: `USER#${email}`,
      GSI1SK: `USE#${email}`,
      email,
      emailVerified: false,
      name,
      type: "USER",
    },
  };

  const accountItem = {
    TableName: "next-auth",
    Item: {
      pk: `USER#${id}`,
      sk: `ACCOUNT#credentials#${id}`,
      GSI1PK: "ACCOUNT#credentials",
      GSI1SK: `ACCOUNT#${id}`,
      provider: "credentials",
      providerAccountId: id,
      email,
      userId: id,
      password: hashedPassword,
      type: "ACCOUNT",
    },
  };

  const existingCredentialsAccount = await getCredentialsAccountByEmail(email);
  if (existingCredentialsAccount) {
    throw new Error("User with this email already exists");
  }

  try {
    if (!existingUser) {
      await Promise.all([ddb.send(new PutCommand(userItem)), ddb.send(new PutCommand(accountItem))]);
    } else {
      await ddb.send(new PutCommand(accountItem));
    }

    return { id, email, name };
  } catch (err: unknown) {
    console.error("Error creating user:", JSON.stringify(err));
    throw err;
  }
}
