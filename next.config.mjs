const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/api/:path*",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8088/api/:path*"
                        : "http://127.0.0.1:8088/api/:path*",
            },
            {
                source: "/docs",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8088/docs"
                        : "http://127.0.0.1:8088",
            },
            {
                source: "/openapi.json",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8088/openapi.json"
                        : "http://127.0.0.1:8088",
            },
        ];
    },
};

export default nextConfig;
