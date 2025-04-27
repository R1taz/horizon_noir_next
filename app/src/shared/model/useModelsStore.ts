import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { IModel } from '../types/models'

interface ModelsStore {
	models: IModel[]
	setModels: (models: IModel[]) => void
}

export const useModelsStore = create<ModelsStore>()(
	immer(set => ({
		models: [],
		setModels: models => set(state => ({ ...state, models })),
	}))
)
