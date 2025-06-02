import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

if (typeof window !== "undefined") {
  throw new Error("this file must not be imported on the client")
}

const client = new DynamoDBClient({
  region: process.env.AUTH_DYNAMODB_REGION,
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID!,
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET!,
  },
})

export const ddb = DynamoDBDocumentClient.from(client)