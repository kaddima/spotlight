export type TCreatedUserEvent = {
	data: {
		birthday: string;
		created_at: number;
		email_addresses: {
			email_address: string;
			id: string;
			linked_to: unknown[];
			object: string;
			verification: {
				status: string;
				strategy: string;
			};
		}[];

		external_accounts: unknown[];
		external_id: string;
		first_name: string;
		gender: string;
		id: string;
		image_url: string;
		last_name: string;
		last_sign_in_at: number;
		object: string;
		password_enabled: boolean;
		phone_numbers: number[];
		primary_email_address_id: string;
		primary_phone_number_id: string;
		primary_web3_wallet_id: string;
		private_metadata: Record<string, unknown>;
		profile_image_url: string;
		public_metadata: Record<string, unknown>;
		two_factor_enabled: boolean;
		unsafe_metadata: Record<string, unknown>;
		updated_at: number;
		username: string;
		web3_wallets: unknown[];
	};
	instance_id: string;
	object: string;
	timestamp: number;
	type: "user.created";
};
