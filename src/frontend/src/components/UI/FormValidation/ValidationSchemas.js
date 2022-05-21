import * as Yup from 'yup'
export function getProductFormValidationSchema() {
	const availableRules = {
		required: { message: 'Pole jest wymagane.' },
		maxLength: { max: 15, message: 'Przekroczono dopuszczalną ilość znaków.' },
		maxTwoDecimalPlaces: {
			regex: /^\d+(\.\d{1,2})?$/,
			message: 'Dopuszczalna wartość do drugiego miejsca po przecinku.',
		},
		maxNumber: {
			max: 8,
			message: 'Podana wartość jest nieprawidłowa.',
		},
	}

	return Yup.object({
		name: Yup.string()
			.max(availableRules.maxLength.max, availableRules.maxLength.message)
			.required(availableRules.required.message),
		index: Yup.string()
			.max(availableRules.maxLength.max, availableRules.maxLength.message)
			.required(availableRules.required.message),
		ean: Yup.string()
			.max(availableRules.maxLength.max, availableRules.maxLength.message)
			.required(availableRules.required.message),

		category: Yup.string().required(availableRules.required.message),
		unit: Yup.string().required(availableRules.required.message),
		packagingType: Yup.string().required(availableRules.required.message),
		preferredPalletType: Yup.string().required(availableRules.required.message),
		inCollectivePackage: Yup.string()
			.required(availableRules.required.message)
			.matches(availableRules.maxTwoDecimalPlaces.regex, availableRules.maxTwoDecimalPlaces.message)
			.max(availableRules.maxNumber.max, availableRules.maxNumber.message),
		stackedOnPallet: Yup.string()
			.matches(availableRules.maxTwoDecimalPlaces.regex, availableRules.maxTwoDecimalPlaces.message)
			.max(availableRules.maxNumber.max, availableRules.maxNumber.message),
		minimumLevelOfStocks: Yup.string()
			.matches(availableRules.maxTwoDecimalPlaces.regex, availableRules.maxTwoDecimalPlaces.message)
			.max(availableRules.maxNumber.max, availableRules.maxNumber.message),
	})
}
