import fs from 'fs';
import path from 'path';

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const folderName = searchParams.get('folderName');

	if (!folderName) {
		return new Response(JSON.stringify({ error: 'Missing folderName query param' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const folderPath = path.join(process.cwd(), 'public', folderName);

	let files = [];
	try {
		files = fs.readdirSync(folderPath).filter(file =>
			/\.(jpg|jpeg|png|gif|webp)$/i.test(file)
		);
	} catch (err) {
		return new Response(JSON.stringify({ error: 'Failed to read folder or folder not found' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	if (files.length === 0) {
		return new Response(JSON.stringify({ error: 'No images found in folder' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const randomFile = files[Math.floor(Math.random() * files.length)];
	const picturePath = `/${folderName}/${randomFile}`;

	return new Response(JSON.stringify({ picturePath }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
