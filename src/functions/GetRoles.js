const { app } = require('@azure/functions');
const { fetch } = require('node-fetch').default;

// add role names to this object to map them to group ids in your AAD tenant
const roleGroupMappings = {
    'admin': 'd8a60c1d-1181-4954-a269-2740704caeca',
    'editor': 'd8a60c1d-1181-4954-a269-2740704caeca'
};

app.http('GetRoles', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`GetRoles function received request: ${JSON.stringify(request)}`);

        const user = request.params || {};
        const roles = [];
    
        for (const [role, groupId] of Object.entries(roleGroupMappings)) {
            if (await isUserInGroup(groupId, user.accessToken, context)) {
                roles.push(role);
            }
        }

        context.log(`User roles: ${roles.join(', ')}`);

        return { 
            jsonBody: roles 
        };
    }
});

async function isUserInGroup(groupId, bearerToken, context) {
    const url = new URL('https://graph.microsoft.com/v1.0/me/memberOf');
    url.searchParams.append('$filter', `id eq '${groupId}'`);

    context.log(`Checking if user is in group ${groupId}`);
    context.log(`URL: ${url}`);

    /*
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
    });

    if (response.status !== 200) {
        return false;
    }

    const graphResponse = await response.json();
    const matchingGroups = graphResponse.value.filter(group => group.id === groupId);

    return matchingGroups.length > 0;
    */
    // Simulate a successful response for testing purposes
    return true; // Simulate that the user is in the group for testing purposes
}