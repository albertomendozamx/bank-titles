import { NuevoTitulo, DescripcionTitulo, IDTitulo } from './types/types'

const parseIDTitulo = (idFromRequest: any): IDTitulo => {
  if (!isString(idFromRequest) || !isIDTitle(idFromRequest)) {
    throw new Error('Incorrect or missing id')
  }
  return idFromRequest
}
const parseDescription = (descriptionFromRequest: any): DescripcionTitulo => {
  if (!isString(descriptionFromRequest) || !isTitle(descriptionFromRequest)) {
    throw new Error('Incorrect or missing description')
  }
  return descriptionFromRequest
}
const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date')
  }
  return dateFromRequest
}
const parsePagocuota = (pagoCuotaFromRequest: any): string => {
  if (!isChar(pagoCuotaFromRequest)) {
    throw new Error('Incorrect or missing pagocuota')
  }
  return pagoCuotaFromRequest
}

const isIDTitle = (some: any): boolean => {
  return Object.values(IDTitulo).includes(some)
}
const isTitle = (some: any): boolean => {
  return Object.values(DescripcionTitulo).includes(some)
}
const isDate = (some: any): boolean => {
  return Boolean(Date.parse(some))
}
const isString = (some: any): boolean => {
  return typeof some === 'string'
}
const isChar = (some: any): Boolean => {
  return typeof some === 'string' && some.length === 1
}

const inspectTitle = (object: any): NuevoTitulo => {
  const newTitle: NuevoTitulo = {
    idtitulo: parseIDTitulo(object.idtitulo),
    titulo: parseDescription(object.titulo),
    clasificacion: object.clasificacion,
    valor: +object.valor,
    fecha_creacion: parseDate(object.fecha_creacion),
    fecha_vencimiento: parseDate(object.fecha_vencimiento),
    pagocuota: parsePagocuota(object.pagocuota),
  }
  return newTitle
}

export default inspectTitle
