# Locally Booting Genius Ai

## Prerequisites
- Node.js installed on your machine
- npm (Node Package Manager) installed

## Steps

### 1. Install Dependencies
```bash
# Move to the project directory
cd my-next-project

# Install project dependencies
npm install
```

### 2. Run the Project Locally
```bash
# Start the development server
npm run dev
```

Open your browser and visit [http://localhost:3000](http://localhost:3000) to view your Next.js application.

---

# Launching Genius Ai on Vercel

To launch your NextJs project you will need to push it to your github repository then visit [Vercel](https://vercel.com) to open an account with your github account that has the repository then you will be able to launch the application from it's repository using the vercel dashboard. You can see more on this on this link [Vercel how to deploy project](https://vercel.com/docs/deployments/overview)

---

# Clerk Key for Next.js

1. Go to [Clerk Dashboard](https://dashboard.clerk.dev/login) and log in or sign up.
2. Create a new Clerk application.
3. Obtain the API Key from the Clerk dashboard.
4. Place the obtained API Key in your Next.js project's `.env` file.

Example `.env` file:

```env
CLERK_FRONTEND_API_KEY=your-clerk-api-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-next-publishable-key
```
Also ensure to change the Next Public App Url to the domain of the platform once hosted online. Once launching the project locally you can have it as localhost but once you deploy it on vercel or host it on a private server you will nedd to change it to the domain name that it has online.

```env
NEXT_PUBLIC_APP_URL=your-platforms-domain-name
```
---

# Prisma Database URL Key from PlanetScale

1. Log in to [PlanetScale](https://planetscale.com/).
2. Navigate to your database.
3. Obtain the Prisma database URL.
4. Place the obtained database URL in your Next.js project's `.env` file.

Example `.env` file:

```env
DATABASE_URL=your-database-url
```

---

# Replicate API Token

1. Log in to your Replicate account.
2. Navigate to your account settings or API section.
3. Obtain the Replicate API token.
4. Place the obtained token in your Next.js project's `.env` file.

Example `.env` file:

```env
REPLICATE_API_TOKEN=your-replicate-token
```
---

# UploadThing Token for Next.js

1. Sign up or log in to [UploadThing](https://uploadthing.com/).
2. Create a new project.
3. Obtain the project's API token.
4. Place the obtained API token in your Next.js project's `.env` file.

Example `.env` file:

```env
UPLOADTHING_API_TOKEN=your-uploadthing-api-token
UPLOADTHING_APP_ID=your-uploadthing-app-id
```

---

# Paystack Secret Key

1. Log in to your Paystack account.
2. Navigate to the Developers section.
3. Obtain the Paystack Secret Key.
4. Place the obtained Secret Key in your Next.js project's `.env` file.

Example `.env` file:

```env
PAYSTACK_SECRET_KEY=your-paystack-secret-key
```

---

Make sure to replace "your-clerk-api-key," "your-clerk-next-publishable-key," "your-platforms-domain-name," "your-replicate-token," "your-database-url," "your-uploadthing-api-token," "your-uploadthing-app-id," and "your-paystack-secret-key" with the actual keys you obtain from the respective services.

Feel free to reach out if you have any questions or need further assistance.