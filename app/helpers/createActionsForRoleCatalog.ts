import { UserRole } from '../interfaces/userInterface'

interface RoleAction {
	label: string
	type: string
	action: ((params: unknown) => unknown) | null
}

export function createActionsForRoleCatalog(role: UserRole): RoleAction[] {
	if (role === UserRole.USER) {
		return [{ label: 'Подробнее', type: 'a', action: null }]
	}

	return [
		{ label: 'Редактировать', type: 'button', action: params => null },
		{ label: 'Подробнее', type: 'a', action: null },
	]
}
