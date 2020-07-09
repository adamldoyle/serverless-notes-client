import { Amplify, Storage } from 'aws-amplify';

const dev = {
	s3: {
		REGION: 'us-east-1',
		BUCKET: 'serverless-notes-2-api-dev-attachmentsbucket-fu9w6jbk96j1',
	},
	apiGateway: {
		REGION: 'us-east-1',
		URL: 'https://8hur8tizoj.execute-api.us-east-1.amazonaws.com/dev',
	},
	cognito: {
		REGION: 'us-east-1',
		USER_POOL_ID: 'us-east-1_Sdz7rYcXn',
		APP_CLIENT_ID: '7uqs1fh7iv7r8v33klkhnih0oe',
		IDENTITY_POOL_ID: 'us-east-1:15adae19-3be8-453e-b985-f04f9867cdb8',
	},
};

const prod = {
	s3: {
		REGION: 'us-east-1',
		BUCKET: 'serverless-notes-2-api-prod-attachmentsbucket-5fqyqtjr490c',
	},
	apiGateway: {
		REGION: 'us-east-1',
		URL: 'https://7527zzjqh0.execute-api.us-east-1.amazonaws.com/prod',
	},
	cognito: {
		REGION: 'us-east-1',
		USER_POOL_ID: 'us-east-1_BAvauKQtB',
		APP_CLIENT_ID: '1oh6l707r8b3aeam0ainhbh4db',
		IDENTITY_POOL_ID: 'us-east-1:55c7bef0-23d9-44eb-ab04-e4c2ada213cc',
	},
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export function configure() {
	Amplify.configure({
		Auth: {
			mandatorySignIn: true,
			region: config.cognito.REGION,
			userPoolId: config.cognito.USER_POOL_ID,
			identityPoolId: config.cognito.IDENTITY_POOL_ID,
			userPoolWebClientId: config.cognito.APP_CLIENT_ID,
		},
		Storage: {
			region: config.s3.REGION,
			bucket: config.s3.BUCKET,
			identityPoolId: config.cognito.IDENTITY_POOL_ID,
		},
		API: {
			endpoints: [
				{
					name: 'notes',
					endpoint: config.apiGateway.URL,
					region: config.apiGateway.REGION,
				},
			],
		},
	});
}

export async function storeFile(file) {
	const filename = `${Date.now()}-${file.name}`;

	const stored = await Storage.vault.put(filename, file, {
		contentType: file.type,
	});

	return stored.key;
}

export async function getFile(filename) {
	return await Storage.vault.get(filename);
}
