import inspectTitle from '../src/utils'

describe('Title properties validations', () => {
  it('Should return Error when idtitulo doesn`t exist', async () => {
    const title = {
      idtitulo: "USDX",
      titulo: "DOLAR",
      clasificacion: "DIV",
      valor: 500000000,
      fecha_creacion: "2022-03-14",
      fecha_vencimiento: "2023-03-15",
      pagocuota: "y"
    }
    const newTitle = () => inspectTitle(title)
    expect(newTitle).toThrow(Error)
  })

  it('Should return Error when titulo doesn`t exist', async () => {
    const title = {
      idtitulo: "USD",
      titulo: "DOLARES",
      clasificacion: "DIV",
      valor: 500000000,
      fecha_creacion: "2022-03-14",
      fecha_vencimiento: "2023-03-15",
      pagocuota: "y"
    }
    const newTitle = () => inspectTitle(title)
    expect(newTitle).toThrow(Error)
  })

  it('Should return Error when valor isn`t a number', async () => {
    const title = {
      idtitulo: "USD",
      titulo: "DOLAR",
      clasificacion: "DIV",
      valor: 'a500000000',
      fecha_creacion: "2022-03-14",
      fecha_vencimiento: "2023-03-15",
      pagocuota: "y"
    }
    const newTitle = () => inspectTitle(title)
    expect(newTitle).toThrow(Error)
  })

  it('Should return Error when fecha_creacion isn`t a date', async () => {
    const title = {
      idtitulo: "USD",
      titulo: "DOLAR",
      clasificacion: "DIV",
      valor: 500000000,
      fecha_creacion: 20220314,
      fecha_vencimiento: "2023-03-15",
      pagocuota: "y"
    }
    const newTitle = () => inspectTitle(title)
    expect(newTitle).toThrow(Error)
  })

  it('Should return Error when fecha_vencimiento isn`t a date', async () => {
    const title = {
      idtitulo: "USD",
      titulo: "DOLAR",
      clasificacion: "DIV",
      valor: 500000000,
      fecha_creacion: "2022-03-14",
      fecha_vencimiento: 20230315,
      pagocuota: "y"
    }
    const newTitle = () => inspectTitle(title)
    expect(newTitle).toThrow(Error)
  })

  it('Should return Error when pagocuota isn`t a char', async () => {
    const title = {
      idtitulo: "USD",
      titulo: "DOLAR",
      clasificacion: "DIV",
      valor: 500000000,
      fecha_creacion: "2022-03-14",
      fecha_vencimiento: "2023-03-15",
      pagocuota: "yes"
    }
    const newTitle = () => inspectTitle(title)
    expect(newTitle).toThrow(Error)
  })
})