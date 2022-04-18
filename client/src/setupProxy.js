const createProxyMiddleware = require("http-proxy-middleware");

module.exports = (app) => {
	app.use(
		["/api", "/auth/google"],
		createProxyMiddleware({
			target: "http://localhost:3001",
			headers: {
				Connection: "keep-alive",
			},
		})
	);
};
