import titlesData from '../../storage/titulos.json'
import { NuevoTitulo, Titulo } from '../types/types'
import { promises as fsPromises } from 'fs'

const titles: Titulo[] = titlesData as Titulo[]

export const getTitles = (): Titulo[] => titles

export const findByID = (id: number): Boolean => {
  const wasFound = titles.find(title => title.id === id)
  if (wasFound != null) return true
  return false
}

export const findByTitle = (idTitulo: string): Boolean => {
  const wasFound = titles.find(title => title.idtitulo === idTitulo)
  if (wasFound != null) return true
  return false
}

export const deleteByID = async (id: number): Promise<Boolean> => {
  const listTitles = titles.filter(title => title.id !== id)
  fsPromises.writeFile('./storage/titulos.json', JSON.stringify(listTitles, null, 2))
  return true
}

export const addTitle = async (title: NuevoTitulo): Promise<number> => {
  const id = Math.max(...titles.map(titulo => titulo.id)) + 1
  const newTitle = { id, ...title }
  titles.push(newTitle)
  fsPromises.writeFile('./storage/titulos.json', JSON.stringify(titles, null, 2))
  return id
}