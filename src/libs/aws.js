import { Amplify, Storage } from 'aws-amplify';

const config = {
	s3: {
		REGION: 'us-east-1',
		BUCKET: 'adamldoyle-notes',
	},
	apiGateway: {
		REGION: 'us-east-1',
		URL: 'https://yeenhsdfvj.execute-api.us-east-1.amazonaws.com/prod',
	},
	cognito: {
		REGION: 'us-east-1',
		USER_POOL_ID: 'us-east-1_GB9AKcVLY',
		APP_CLIENT_ID: '4dker76ltislnlq4guok1bjf7g',
		IDENTITY_POOL_ID: 'us-east-1:a86c1a34-80ff-4586-b0ac-ca86117ed902',
	},
};

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
