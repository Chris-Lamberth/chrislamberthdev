export function safeExternalUrl(value, protocols = ['https:', 'http:']) {
	if (typeof value !== 'string') return null;

	try {
		const url = new URL(value);
		return protocols.includes(url.protocol) ? url.href : null;
	} catch {
		return null;
	}
}
