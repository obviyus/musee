export function dashify(id: string): string {
	if (id.length < 7) return id;
	return `${id.slice(0, 3)}-${id.slice(3, -3)}-${id.slice(-3)}`;
}
