import englishMessages from 'ra-language-english';

const customEnglishMessages = {
	...englishMessages,
	language: {
		name: "English",
	},
	admin: {
		app: {
			name: 'Plumia',
			site_url: 'https://www.plumia.co',
			contact_url: 'https://www.plumia.co/contact',
		},
		auth: {
			email: 'E-mail',
		},
		search: 'Search',
		theme: {
			name: 'Theme',
			light: 'Light',
			dark: 'Dark',
		},
		menu: {
			dashboard: 'Dashboard',
			models: 'Models',
			jobs: 'Jobs',
			users: 'Users',
			organizations: 'Organizations',
			parameters: 'Parameters',
			billing: 'Billing',
			invoices: 'Invoices',
			messages: 'Messages',
			configuration: 'Configuration',
			logout: 'Logout',
		},
		dashboard: {
			new_employees: 'New Employees',
			waiting_for_cards: 'En attente de carte',
			order: {
				items:
					'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
			},
			welcome: {
				title: 'Welcome to Plumia',
				subtitle: '',
				return_button: 'Back to the homepage',
				contact_button: 'Contact us',
			},
		},
		configuration: {
			title: "Configuration",
			theme: "Theme",
			themes: {
				light: "Light",
				dark: "Dark",
			},
			language: "Language",
			languages: {
				"en": "English",
				"fr": "French",
			},
		},
	},
	resources: {
		jobs: {
			name: 'Jobs',
			empty: 'No jobs',
			fields: {
				commands: 'Orders',
				first_seen: 'First seen',
				groups: 'Segments',
				last_seen: 'Last seen',
				last_seen_gte: 'Visited Since',
				name: 'Name',
				total_spent: 'Total spent',
				password: 'Password',
				confirm_password: 'Confirm password',
			},
			fieldGroups: {
				identity: 'Identity',
				address: 'Address',
				stats: 'Stats',
				history: 'History',
				password: 'Password',
				change_password: 'Change Password',
			},
			page: {
				delete: 'Delete Customer',
			},
			errors: {
				password_mismatch:
					'The password confirmation is not the same as the password.',
			},
		},
		models: {
			name: 'Models',
		}
	},
};

export default customEnglishMessages;
