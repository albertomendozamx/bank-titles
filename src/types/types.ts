export enum IDTitulo {
  usd = 'USD',
  tprv = 'TPRV',
  tp = 'TP',
  tid = 'TID',
  thi = 'THI',
  tesu = 'TESU',
  test = 'TEST',
  tesp = 'TESP',
  tesoros = 'TESOROS',
  tesi = 'TESI'
}

export enum DescripcionTitulo {
  usd = 'DOLAR',
  tprv = 'TÍTULO DE PARTICIPACIÓN RENTA VARIABLE',
  tp = 'TÍTULO DE PARTICIPACIÓN',
  tid = 'TIDIS',
  thi = 'TITULOS HIPOTECARIOS',
  tesu = 'TES UVR',
  test = 'TEST TRM',
  tesp = 'TES PESOS',
  tesoros = 'BONOS DEL TESORO EEUU',
  tesi = 'TES IPC'
}

export interface Titulo {
  id: number,
  idtitulo: IDTitulo,
  titulo: DescripcionTitulo,
  clasificacion: string,
  valor: number,
  fecha_creacion: string,
  fecha_vencimiento: string,
  pagocuota: string
}

export type nuevoTitulo = Omit<Titulo, 'id'>
