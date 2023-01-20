import titlesData from '../../storage/titulos.json'
import { Titulo } from '../types/types'

const titles: Titulo[] = titlesData as Titulo[]

export const getTitles = (): Titulo[] => titles

export const findByID = (_id: number) => null
export const deleteByID = (_id: number) => null