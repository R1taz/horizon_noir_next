interface Params {
	userId: number
	carId: number
	paymentMethod: string
	deliveryType: string
	deliveryDealershipId: number
	deliveryAddress: string
	socket: WebSocket
}

export function createNewOrder(params: Params) {
	const newOrder = {
		type: 'NEW_ORDER',
		payload: {
			user_id: params.userId,
			car_id: params.carId,
			payment_method: params.paymentMethod,
			delivery_type: params.deliveryType,
			delivery_dealership_id: params.deliveryType === 'salon' ? params.deliveryDealershipId : null,
			delivery_address: params.deliveryType === 'custom_address' ? params.deliveryAddress : null,
		},
	}

	if (params.socket && params.socket.readyState === WebSocket.OPEN) {
		params.socket.send(JSON.stringify(newOrder))
	} else {
		console.warn('WebSocket не подключён')
	}
}
