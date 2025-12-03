export type BankConfig = {
	bankName: string;
	bankAccountHolder: string;
	bankNumber: string;
};

export function parseBankConfig(input: any): BankConfig | null {
	if (!input) return null;

	let cfg: any = input;

	if (typeof cfg === "string") {
		try {
			cfg = JSON.parse(cfg);
		} catch (e) {
			console.error("Invalid bankConfig JSON:", input);
			return null;
		}
	}

	const bankName = cfg.bankName ?? cfg.bank_name ?? "";
	const bankAccountHolder = cfg.bankAccountHolder ?? cfg.bank_account_holder ?? "";
	const bankNumber = cfg.bankNumber ?? cfg.bank_number ?? "";

	if (!bankName || !bankAccountHolder || !bankNumber) return null;

	return { bankName, bankAccountHolder, bankNumber };
}

export function parseConfig(input: any) {
	if (!input) return null;

	let cfg: any = input;

	if (typeof cfg === "string") {
		try {
			cfg = JSON.parse(cfg);
		} catch (e) {
			console.error("Invalid config JSON:", input);
			return null;
		}
	}

	var subPhone = cfg.subPhone ?? cfg.sub_phone ?? "";

	return { subPhone: subPhone };
}