export type CookieSetOptions = {
	path?: string;
	httpOnly?: boolean;
	sameSite?: 'strict' | 'lax' | 'none';
	maxAge?: number;
};

export type Cookies = {
	set: (name: string, value: string, options?: CookieSetOptions) => void;
};

export type SignupErrors = {
	passwordMismatchError: boolean;
	passwordMissingError: boolean;
	passwordStrengthError: boolean;
	nameError: boolean;
};

export type User = {
	id: string;
	password_hash: string | null;
	name: string;
	email: string;
	mobile: string | null;
	role: string;
	metadata: Metadata;
	dark_mode: boolean;
	image_url: string | null;
};

export type Metadata = {
	none: string | null;
};

export type userResponse = {
	id: string;
	name: string;
	email: string;
	mobile: string;
};
