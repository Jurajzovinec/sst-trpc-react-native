import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {  unmarshall } from '@aws-sdk/util-dynamodb';


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

export const handler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const result = await client.send(
		new ScanCommand({
			TableName: tableName
		})
	)

	return {
		statusCode: 200,
		headers,
		body: JSON.stringify({
			items: result.Items ? result.Items.map(item => unmarshall(item)) : [],
			count: result.Count || 0
		})
	}
}
