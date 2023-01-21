import * as titleService from '../src/services/titleService'
import inspectTitle from '../src/utils'

describe("Title service", () => {
    it('Should return an object', async () => {
        const response = await titleService.getTitles()
        expect(typeof response).toEqual('object')
    })

    it('Should return true when title was found', async () => {
        const response = await titleService.findByID(1)
        expect(response).toEqual(true)
    })

    it('Should return false when title was not found', async () => {
        const response = await titleService.findByID(9999999999)
        expect(response).toEqual(false)
    })

    it('Should return true when user already has a specific title', async () => {
        const response = await titleService.findByTitle('USD')
        expect(response).toEqual(true)
    })

    it('Should return false when user have not a specific title', async () => {
        const response = await titleService.findByTitle('TESOROS')
        expect(response).toEqual(false)
    })

    it('Should return true when title was removed successfully', async () => {
        const response = await titleService.deleteByID(4)
        expect(response).toEqual(true)
    })

    it('Should return id false when title already exists', async () => {
        const title = {
            idtitulo: "USD",
            titulo: "DOLAR",
            clasificacion: "DIV",
            valor: 500000000,
            fecha_creacion: "2022-03-14",
            fecha_vencimiento: "2023-03-15",
            pagocuota: "n"
        }
        const newTitle = inspectTitle(title)
        const response = await titleService.addTitle(newTitle)
        await expect(response).toEqual(false)
    })

    it('Should return id of title when was regitered successfully', async () => {
        const title = {
            idtitulo: "TESOROS",
            titulo: "BONOS DEL TESORO EEUU",
            clasificacion: "DIV",
            valor: 1000000000,
            fecha_creacion: "2022-03-14",
            fecha_vencimiento: "2023-03-15",
            pagocuota: "n"
        }
        const newTitle = inspectTitle(title)
        const response = await titleService.addTitle(newTitle)
        await expect(response > 0).toEqual(true)
    })

    it('Should return array with all titles moved', async () => {
        const response = await titleService.moveTitles('2022-02-16', '2022-08-25')
        expect(typeof response).toEqual('object')
    })

    it('Should return false when titles have no this date', async () => {
        const response = await titleService.moveTitles('1000-01-01', '2022-08-25')
        expect(response).toEqual(false)
    })

    it('Should return false when title was not found', async () => {
        const response = await titleService.titlePayment(0, 500)
        expect(response).toEqual(false)
    })

    it('Should return false when payment is less than valor', async () => {
        const response = await titleService.titlePayment(1, 500)
        expect(response).toEqual(false)
    })

    it('Should return true when payment is equal than valor', async () => {
        const response = await titleService.titlePayment(1, 500000000)
        expect(response).toEqual(true)
    })

})
