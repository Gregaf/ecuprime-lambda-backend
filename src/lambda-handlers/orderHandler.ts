import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

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
        }
    } catch (error) {
        console.error(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "hello world",
        }),
    };
};

async function getOrder(
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
    };
}
