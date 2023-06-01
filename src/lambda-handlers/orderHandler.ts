import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://dynamodb-local:8000",
});

export const handler = async (
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    try {
        switch (event.httpMethod) {
        case "GET":
            return getOrder(event, context);
        case "POST":
            return createOrder(event, context);
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({ message: "Method Not Allowed" }),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};

async function getOrder(
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Method Not Implemented" }),
    };
}

async function createOrder(event: APIGatewayEvent, context: Context) {
    const cmd = new PutItemCommand({
        TableName: "Main",
        Item: {
            PK: { S: "USER#123" },
            SK: { S: "USER#123" },
        },
    });

    const res = await client.send(cmd);

    console.log(res);

    return {
        statusCode: 200,
        body: JSON.stringify(res),
    };
}
