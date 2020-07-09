import * as Sentry from '@sentry/react';

const isLocal = process.env.NODE_ENV === 'development';

export function initSentry() {
	if (isLocal) {
		return;
	}

	Sentry.init({
		dsn:
			'https://79322ae43be54789bcf0f155419bb80e@o418041.ingest.sentry.io/5320014',
	});
}

export function logError(error, errorInfo = null) {
	if (isLocal) {
		return;
	}

	Sentry.withScope((scope) => {
		errorInfo && scope.setExtras(errorInfo);
		Sentry.captureException(error);
	});
}

export function onError(error) {
	console.error(error);

	let errorInfo = {};
	let message = error.toString();
	if (!(error instanceof Error) && error.message) {
		errorInfo = error;
		message = error.message;
		error = new Error(message);
	} else if (error.config && error.config.url) {
		errorInfo.url = error.config.url;
	}

	logError(error, errorInfo);
}
