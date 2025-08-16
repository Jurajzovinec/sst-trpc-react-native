import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { marshall } from '@aws-sdk/util-dynamodb';


const tableName: string = process.env['TABLE_NAME']!
const allowOrigins: string[] = process.env['ALLOW_ORIGINS']!.split(',')

if (!tableName || !allowOrigins) {
	throw new Error(`Missing ENV variables:
    TABLE_NAME: ${tableName}
    ALLOW_ORIGINS: ${allowOrigins}`)
}

const client = new DynamoDBClient({})

const headers = {
	'Access-Control-Allow-Origin': allowOrigins[0]!,
	'Access-Control-Allow-Credentials': 'true',
	'Content-Type': 'application/json'
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const body = event?.body ? JSON.parse(event.body) : {}

	const email = body?.email.trim().toLowerCase()

	if (!email) {
		return {
			statusCode: 400,
			headers,
			body: JSON.stringify({ error: 'Provide "email" in the request body' })
		}
	}

	await client.send(
		new PutItemCommand({
			TableName: tableName,
			Item: marshall({ email })
		})
	)

	return {
		statusCode: 200,
		headers,
		body: JSON.stringify({ message: 'Email added to the waiting list' })
	}
}
