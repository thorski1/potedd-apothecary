/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ['image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ztortvslvwlssohzoxdd.supabase.co',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
			},
		],
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.module.rules.push({
				test: /\.(png|jpe?g|gif|webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: '/_next',
							name: 'static/media/[name].[hash].[ext]',
						},
					},
				],
			});
		}

		return config;
	},
};

module.exports = nextConfig