type SiteConfig = {
	name: string;
	description: string;
	navLinks: {
		[key: string]: {
			text: string;
			to: string;
		};
	};
	sessionName: string;
};

const siteConfig = {
	name: "Pondipetals Emporium",
	description: "Your one stop shop for all things handmade",
};

export default siteConfig as SiteConfig;
