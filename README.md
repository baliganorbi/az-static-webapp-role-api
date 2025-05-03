# Azure Static Web App Role API

This repository contains the implementation of an Azure Function App designed to manage user roles for an Azure Static Web App. It provides an API endpoint to determine the roles of a user based on their membership in Azure Active Directory (AAD) groups.

## Purpose

This project was built to provide the API as a "Bring Your Own Function" option for the [Azure Static Webapp Roles](https://github.com/baliganorbi/az-static-webapp-roles) project. It integrates seamlessly with the Azure Static Webapp to manage user roles effectively.

## Features

- **Role Mapping**: Maps predefined roles (e.g., `admin`, `editor`) to Azure Active Directory group IDs.
- **Role Retrieval**: Exposes an HTTP endpoint (`GetRoles`) to retrieve the roles of a user based on their AAD group membership.
- **Integration with Microsoft Graph API**: Uses the Microsoft Graph API to verify if a user belongs to specific AAD groups.

## Project Structure

- **`src/index.js`**: Sets up the Azure Function App with HTTP streaming enabled.
- **`src/functions/GetRoles.js`**: Implements the `GetRoles` function, which handles HTTP requests to fetch user roles.
- **`host.json`**: Configures the Azure Function runtime, including logging and extension bundles.

## How It Works

1. **Role Mapping**: The `roleGroupMappings` object in `GetRoles.js` defines the mapping between role names and AAD group IDs.
2. **HTTP Endpoint**: The `GetRoles` function listens for `GET` and `POST` requests. It accepts a user's access token and checks their group membership.
3. **Microsoft Graph API**: The `isUserInGroup` helper function queries the Microsoft Graph API to determine if the user belongs to a specific group.

## Prerequisites

- **Azure Functions Core Tools**: Required to run and debug the function locally.
- **Node.js**: The project is built using Node.js.
- **Azure Active Directory**: The app relies on AAD for group-based role management.
- **Microsoft Graph API**: Used to fetch group membership information.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/az-static-webapp-role-api.git
   cd az-static-webapp-role-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Azure Active Directory:
   - Update the `roleGroupMappings` object in `src/functions/GetRoles.js` with your AAD group IDs.

4. Run the function locally:
   ```bash
   npm start
   ```

## Deployment

This project is designed to be deployed as part of an Azure Static Web App. The deployment process includes:

1. Pre-deployment tasks:
   - Prune unnecessary dependencies using the `npm prune (functions)` task.

2. Deployment:
   - Use the Azure Functions extension in Visual Studio Code or the Azure CLI to deploy the app.

## Debugging

The repository includes a preconfigured `launch.json` file for debugging the function locally. Use the "Attach to Node Functions" configuration to start debugging.

## Recommended Extensions

- [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions): Provides tools for developing and deploying Azure Functions.

## Notes

- The `GetRoles` function is configured with `authLevel: 'anonymous'` for demonstration purposes. In a production environment, consider using a more secure authentication level.
- Ensure that the Microsoft Graph API permissions are correctly configured for the app to query group memberships.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.