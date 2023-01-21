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
  await fsPromises.writeFile('./storage/titulos.json', JSON.stringify(listTitles, null, 2))
  return true
}

export const addTitle = async (title: NuevoTitulo): Promise<number | boolean> => {
  const wasFound = findByTitle(title.idtitulo)
  if (wasFound) return false
  const id = Math.max(...titles.map(titulo => titulo.id)) + 1
  const newTitle = { id, ...title }
  titles.push(newTitle)
  await fsPromises.writeFile('./storage/titulos.json', JSON.stringify(titles, null, 2))
  return id
}

export const moveTitles = async (originDate: string, destinyDate: string): Promise<Titulo[] | boolean> => {
  const selectedTitles = titles.filter(title => title.fecha_creacion === originDate)
  if (!selectedTitles.length) return false
  const excludedTitles = titles.filter(title => title.fecha_creacion != originDate)
  let modifiedTitles = selectedTitles.map(titulo => {
    titulo.fecha_creacion = destinyDate
    return titulo
  })
  const newTitles = [...excludedTitles, ...modifiedTitles]
  await fsPromises.writeFile('./storage/titulos.json', JSON.stringify(newTitles, null, 2))
  return newTitles
}

export const titlePayment = async (titleID: number, amount: number): Promise<boolean> => {
  const selectedTitle = titles.find(title => title.id === titleID)
  if (!selectedTitle) return false
  const excludedTitles = titles.filter(title => title.id != titleID)
  let total = selectedTitle.valor - amount
  let statusPago = total <= 0
  let updatedTitle = {
    ...selectedTitle,
    valor: (statusPago) ? 0 : total,
    pagocuota: (statusPago) ? 'y' : 'n'
  }
  let newTitles = [...excludedTitles, updatedTitle]
  await fsPromises.writeFile('./storage/titulos.json', JSON.stringify(newTitles, null, 2))
  return statusPago
}