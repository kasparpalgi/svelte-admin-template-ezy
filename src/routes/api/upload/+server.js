import { getBackblazeDetails, getBucketId, getUploadUrl, uploadFile } from '$lib/server/upload';
import { generateRandomString } from '$lib/utils/randomStringGeneration';

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
    try {
        const data = await event.request.formData();
        const imageFile = data.get('imageFile');
        const imageSHA1 = data.get('imageSHA1');
        const fileNameStart = data.get('fileNameStart');

        if (!(imageFile instanceof File)) {
            console.error('imageFile is not a File');
            return new Response(JSON.stringify({ error: 'imageFile is not a File' }), { status: 400 });
        }

        if (typeof imageSHA1 !== 'string' || typeof fileNameStart !== 'string') {
            console.error('imageSHA1 or fileNameStart is not a string');
            return new Response(JSON.stringify({ error: 'imageSHA1 or fileNameStart is not a string' }), { status: 400 });
        }

        const { apiUrl, authorizationToken, accountId } = await getBackblazeDetails();
        const bucketId = await getBucketId(apiUrl, authorizationToken, accountId, 'maxilla');
        const { uploadUrl, uploadAuthToken } = await getUploadUrl(apiUrl, authorizationToken, bucketId);

        const generateFilename = fileNameStart + '-' + generateRandomString();
        const fileName = generateFilename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileSize = imageFile.size;

        await uploadFile(uploadUrl, uploadAuthToken, imageFile, fileName, fileSize, imageSHA1);

        return new Response(fileName, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log('Server Error: ', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({
            success: false,
            message: 'Internal Server Error',
            error: errorMessage
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
