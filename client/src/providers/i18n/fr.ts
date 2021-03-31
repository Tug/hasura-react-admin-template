import frenchMessages from 'ra-language-french';

const customFrenchMessages = {
	...frenchMessages,
	language: {
		name: "Francais",
	},
	auth: {
		email: 'E-mail',
	},
	admin: {
		app: {
			name: 'Plumia',
			site_url: 'https://www.plumia.co',
		},
		search: 'Rechercher',
		language: 'Langue',
		theme: {
			name: 'Theme',
			light: 'Clair',
			dark: 'Obscur',
		},
		menu: {
			dashboard: 'Tableau de bord',
			models: 'Modèles',
			jobs: 'Jobs',
			users: 'Utilisateurs',
			organizations: 'Organisations',
			parameters: 'Paramètre',
			billing: 'Prélèvements',
			invoices: 'Factures',
			messages: 'Messages',
			configuration: 'Configuration',
			logout: 'Se déconnecter',
			profile: 'Mon Profil',
		},
		dashboard: {
			new_employees: 'Nouveaux employés',
			waiting_for_cards: 'Waiting for cards',
			pending_orders: 'Commandes à traiter',
			order: {
				items:
					'par %{customer_name}, un poster |||| par %{customer_name}, %{nb_items} posters',
			},
			welcome: {
				title: "Bienvenue sur l'application Plumia",
				subtitle:
					"Nous travaillons à l'ajout de nouvelles fonctionnalités pour vous permettre de bénéficier de tous les services Luxlunch en ligne!",
				return_button: 'Retour au site',
				contact_button: 'Contactez nous',
			},
		},
		configuration: {
			title: "Configuration",
			theme: "Thème",
			themes: {
				light: "Clair",
				dark: "Sombre",
			},
			language: "Langage",
			languages: {
				"en": "Anglais",
				"fr": "Francais",
			},
		},
	},
	resources: {
		jobs: {
			name: 'Client |||| Clients',
			fields: {
				address: 'Rue',
				birthday: 'Anniversaire',
				city: 'Ville',
				commands: 'Commandes',
				first_name: 'Prénom',
				first_seen: 'Première visite',
				groups: 'Segments',
				has_newsletter: 'Abonné à la newsletter',
				has_ordered: 'A commandé',
				last_name: 'Nom',
				last_seen: 'Vu le',
				last_seen_gte: 'Vu depuis',
				latest_purchase: 'Dernier achat',
				name: 'Nom',
				total_spent: 'Dépenses',
				zipcode: 'Code postal',
				password: 'Mot de passe',
				confirm_password: 'Confirmez le mot de passe',
			},
			fieldGroups: {
				identity: 'Identité',
				address: 'Adresse',
				stats: 'Statistiques',
				history: 'Historique',
				password: 'Mot de passe',
				change_password: 'Changer le mot de passe',
			},
			page: {
				delete: 'Supprimer le client',
			},
			errors: {
				password_mismatch:
					'La confirmation du mot de passe est différent du mot de passe.',
			},
		},
		models: {
			name: 'Modèles',
		},
		users: {
			title: 'Utilisateurs',
			role: 'Role',
		}
	},
};

export default customFrenchMessages;
