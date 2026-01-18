import https from 'https';

const PORTAL_ID = '244225374';
const FORM_ID = 'b631cbcc-1f01-47f9-926c-715a4cb2cd8a';

const data = JSON.stringify({
    fields: [
        { name: 'email', value: 'antigravity_verification@example.com' },
        { name: 'firstname', value: 'Antigravity Verification' },
        { name: 'company', value: 'AI Response Check' }
    ],
    context: {
        pageUri: 'https://gtm-360.com/verification',
        pageName: 'Verification Script'
    }
});

const options = {
    hostname: 'api.hsforms.com',
    path: `/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log(`Testing HubSpot Form: ${FORM_ID} on Portal: ${PORTAL_ID}`);

const req = https.request(options, (res) => {
    let body = '';
    console.log(`Status Code: ${res.statusCode}`);

    res.on('data', (d) => {
        body += d;
    });

    res.on('end', () => {
        try {
            const parsed = JSON.parse(body);
            console.log('Response Body:', JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log('Response Body (Raw):', body);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
