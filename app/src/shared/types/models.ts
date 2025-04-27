export interface IModel {
	id: number
	brand_id: number
	model_name: string
	model_year: number
	body_type: BodyTypes
	fuel_type: string
	engine_type: string
	engine_volume: number
	power: number
	transmission: string
	drive_type: DriveTypes
	end_model_year?: number
}

enum BodyTypes {
	SEDAN = 'Седан',
	HATCHBACK = 'Хэтчбэк',
	WAGON = 'Универсал',
	SUV = 'Внедорожник',
	COUPE = 'Купе',
	CONVERTIBLE = 'Кабриолет',
}

enum DriveTypes {
	FWD = 'Передний',
	RWD = 'Задний',
	AWD = 'Полный',
}
