type EnumType = {
	label: string;
	value: string;
};

export const getEnumConstant = (values = new Map()) => {
	const result: EnumType[] = [];
	values.forEach((value, key) => {
		result.push({ label: value, value: key });
	});
	return result;
};
