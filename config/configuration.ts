export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  credentials: {
    client_id: process.env.FORGE_CLIENT_ID,
    client_secret: process.env.FORGE_CLIENT_SECRET,
    callback_url: process.env.FORGE_CALLBACK_URL,
  },
  scopes: {
    // Required scopes for the server-side application
    internal: [
      'bucket:create',
      'bucket:read',
      'data:read',
      'data:create',
      'data:write',
    ],
    // Required scope for the client-side viewer
    public: ['viewables:read'],
  },
});
