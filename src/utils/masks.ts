import moment from "moment";

export const phoneRegex = /^(\(?[0-9]{2}\)?)\s?([0-9]{4,5}-?\s?)([0-9]{4}?)$/;
export const cepRegex = /^([0-9]{5})-?\s?([0-9]{3}?)$/;
export const numberRegex = /^\d+$/;
export const dateRegex = /([0-9]{2})\/?\s?([0-9]{2})\/?\s?([0-9]{4})/;
export const cpfRegex = /^([0-9]{3}).?\s?([0-9]{3}?).?([0-9]{3})-?\s?([0-9]{2})$/;
export const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
export const percentageRegex = /^([0-9]{3}).?\s?([0-9]{2}?)/;
export const emailRegex =
	/^([a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))$/;
export const alphaNumericRegex = /[^a-zA-Z0-9]/g;

export const mask = (value: any, type: any) => {
	let newValue;
	switch (type) {
		case "text":
			newValue = textMask(value);
			break;
		case "phone":
			newValue = phoneMask(value);
			break;
		case "cep":
			newValue = cepMask(value);
			break;
		case "number":
			newValue = numberMask(value);
			break;
		case "date":
			newValue = dateMask(value);
			break;
		case "document":
			newValue = cpfMask(value);
			break;
		case "cpf":
			newValue = cpfMask(value);
			break;
		case "cnpj":
			newValue = cnpjMask(value);
			break;
		case "email":
			newValue = emailMask(value);
			break;

		case "default":
			newValue = defaultMask(value);
			break;

		default:
			break;
	}
};

export const textMask = (value: string) =>
	value.replace(/\b[a-z]/g, (f: string) => f?.toUpperCase());

export const phoneMask = (value: string | null) => {
	if (value != null) {
		const cleanValueSpaces = value.replace(/[^0-9]/g, "").trim();
		const result = cleanValueSpaces.replace(phoneRegex, "($1) $2-$3");
		return result;
	}
};

export const cepMask = (value: string | null) => {
	if (value != null) {
		const cleanValueSpaces = value.replace(/[^0-9]/g, "").trim();
		const result = cleanValueSpaces.replace(cepRegex, "$1-$2");
		return result;
	}
};

export const numberMask = (value: string) => {
	const cleanValueSpaces = value.replace(/[^0-9]/g, "").trim();
	const result = cleanValueSpaces.replace(numberRegex, "$1");
	return result;
};

export const cpfCnpjMask = (value: string | null) => {
	if (value != null) {
		const cleanValueSpaces = value.replace(/[^0-9]/g, "").trim();
		if (cleanValueSpaces.length <= 11) {
			return cpfMask(value);
		} else {
			return cnpjMask(value);
		}
	}
	return "";
};

export const cpfMask = (value: string | null) => {
	if (value != null) {
		const cleanValueSpaces = value.replace(/[^0-9]/g, "").trim();
		const result = cleanValueSpaces.replace(cpfRegex, "$1.$2.$3-$4");
		return result;
	}
	return "";
};

export const cnpjMask = (value: string | null) => {
	if (value != null) {
		const cleanValueSpaces = value.replace(/[^0-9]/g, "").trim();
		const result = cleanValueSpaces.replace(cnpjRegex, "$1.$2.$3/$4-$5");
		return result;
	}
	return "";
};

export const percentageMask = (value: any) => {
	if (value != null) {
		let result = value;
		if (typeof value === "string") result = Number(value.replace(/[^0-9]/g, "").trim());
		return `${result.toFixed(2).replace(".", ",")}%`;
	}
	return "-";
};

export const dateMask = (
	value: string | undefined
) => {
	if (value != null) {
		const valueSplit = value?.split(" ")[0];
		const newValue = valueSplit?.split("-")?.reverse()?.join();
		const cleanValueSpaces = newValue?.replace(/[^0-9]/g, "").trim();
		const result = cleanValueSpaces?.replace(dateRegex, "$1/$2/$3");
		return result;
	}
	return "";
};

export const padTo2Digits = (num: number) => {
	return num.toString().padStart(2, "0");
};

export const justDateMask = (date: string | number | Date = "") => {
	if (date) {
		let data = new Date(date);
		data.setDate(data.getDate());
		const dd = padTo2Digits(data.getDate());
		const mm = padTo2Digits(data.getMonth() + 1);
		const yyyy = data.getFullYear();

		return [dd, mm, yyyy].join("/");
	}
	return "";
};

export const hourMask = (value = "") => {
	if (!value) {
		return "";
	}
	const [hora, minuto] = value?.toUpperCase()?.split(" ")[1]?.split(":") || [];
	return `${hora}:${minuto}`;
};

export const percentMask = (value = "") => {
	if (!value) {
		return "";
	}
	return `${value}%`;
};

export const dateTimeMask = (value: any) => {
	if (!value) {
		return "";
	}
	return toMoment(value)?.format("DD/MM/YYYY[ ]HH:mm:ss");
};

export const reserveDateTimeMask = (
	value: { _isAMomentObject: any; format: (arg0: string) => any } | null
) => {
	if (value != null) {
		if (value._isAMomentObject) {
			return value.format("YYYY-MM-DDTHH:mm:ss");
		}
	}
	return "";
};

export const emailMask = (value: string | null) => {
	if (value != null) {
		const result = value.replace(emailRegex, "$1");
		return result;
	}
};

export const defaultMask = (value: any) => value;

export const monetaryMask = (value: any, precison = 2) => {
	if (value != null) {
		let result = value;
		if (typeof value === "string") {
			result = Number(value.replace(/[^0-9]/g, "").trim());
		}
		return result
			.toFixed(precison)
			.replace(".", ",")
			.replace(/(\d)(?=(\d{3})+,)/g, "$1.");
	}
	return "";
};

export const monetaryUnmask = (value: string | null) => {
	if (value != null) {
		return Number(value.replace(/\./g, "").replace(",", "."));
	}
	return "0";
};

export const realMask = (value: number | null) => {
	if (value != null) {
		return "R$ ".concat(monetaryMask(value));
	}
	return monetaryMask(value);
};

export const toMoment = (data: moment.MomentInput, formato: boolean | undefined = undefined) => {
	if (data) {
		return moment(data, formato);
	}
	return null;
};

export const roundPrecision = (num = 0, precision = 2) => {
	return Number(num.toFixed(precision));
};

export const alphaNumeric = (value: string | null) => {
	if (value != null) {
		return value.replace(alphaNumericRegex, "").trim();
	}
};

const isJson = (string: string) => {
	try {
		JSON.parse(string);
	} catch (e) {
		return false;
	}

	return true;
};

export const jsonMask = (json = "") => {
	if (!json) {
		return null;
	}

	if (!isJson(json)) {
		return json;
	}
	return JSON.stringify(JSON.parse(json), null, 2);
};

export const xmlMask = (xml = "") => {
	var formatted = "";
	var reg = /(>)(<)(\/*)/g;
	xml = xml.replace(/(>)\s+(<)/g, "><").replace(reg, "$1\r\n$2$3");
	var pad = 0;
	xml.split("\r\n").forEach(node => {
		var indent = 0;
		if (node.match(/.+<\/\w[^>]*>$/)) {
			indent = 0;
		} else if (node.match(/^<\/\w/)) {
			if (pad != 0) {
				pad -= 1;
			}
		} else if (node.match(/^<\w[^>][^\/]>.$/)) {
			indent = 1;
		} else {
			indent = 0;
		}
		var padding = "";
		for (var i = 0; i < pad; i++) {
			padding += "  ";
		}
		formatted += padding + node + "\r\n";
		pad += indent;
	});
	return formatted;
};

export const aplicaMascara = (documento: string, mascara: string) => {
	if (!mascara) {
		return documento;
	}
	const caracteresEspeciais = mascara.replace(/\w/g, "").split("");
	const caracteresRegex = new RegExp(
		caracteresEspeciais
			.reduce((acc: any, caractere: any) => `${acc}\\${caractere}|`, "")
			.replace(/\|$/, ""),
		"g"
	);
	const mascaraSplit = mascara.split(caracteresRegex);
	const mascaraJoin = mascaraSplit.map((el: string | any[]) => `(\\w{${el.length}})`).join("");
	const mascaraRegex = new RegExp(`^${mascaraJoin}$`);
	let mascaraReplace = "";

	for (let i in mascaraSplit) {
		mascaraReplace += `\$${Number(i) + 1}${caracteresEspeciais[i] || ""}`;
	}
	return documento.replace(mascaraRegex, mascaraReplace.replace(/\\$/, ""));
};

export const removeMascara = (documento: any, mascara: string) => {
	if (!mascara) {
		return documento;
	}

	const caracteresEspeciais = [...new Set(mascara.replace(/\w/g, "").split(""))];
	let retorno = documento;
	for (let caractere of caracteresEspeciais) {
		retorno = retorno.replaceAll(caractere, "");
	}
	return retorno;
};

export const removeCaracteresEspeciais = (documento = "") => {
	return documento.replaceAll(/[^0-9A-Za-z]/g, "");
};

export const ligaPalavras =
	(separador = "") =>
	(...palavras: any) =>
		(palavras || []).filter((e: any) => !!e).join(separador);

export const concatenando = (arrayPalavras = [], divisor = "-") => {
	return ligaPalavras(divisor)(...arrayPalavras);
};

export const textWithoutAccents = (text = "") => {
	return text
		.toString()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "");
};

export const capitalizaPriLetraDeCadaPalavra = (texto: string = ""): string => {
	if (!texto) {
		return "";
	}
	return texto?.replace(/\w\S*/g, txt => {
		return txt?.charAt(0)?.toUpperCase() + txt?.substring(1)?.toLowerCase();
	});
};

export const ellipsisText = (text: string = "", length: number = 20) => {
	const ellipsisText =
		text.length > length ? text.substring(0, length - 3) + "..." : text.substring(0, length);

	return ellipsisText;
};
