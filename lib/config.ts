export const isProduction = process.env.NODE_ENV === "production";

export const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

export const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";

export const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";
