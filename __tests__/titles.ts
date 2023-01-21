import { getTitles, findByID, findByTitle, deleteByID, addTitle } from '../src/services/titleService'
import inspectTitle from '../src/utils'

describe("Users' bank titles", () => {
    it('Should return an object', async () => {
        const response = await getTitles()
        expect(typeof response).toEqual('object');
    })

    it('Should return true when title was found', async () => {
        const response = await findByID(1)
        expect(response).toEqual(true)
    })

    it('Should return false when title was not found', async () => {
        const response = await findByID(9999999999)
        expect(response).toEqual(false)
    })

    it('Should return true when user already has a specific title', async () => {
        const response = await findByTitle('USD')
        expect(response).toEqual(true)
    })

    it('Should return false when user have not a specific title', async () => {
        const response = await findByTitle('TESOROS')
        expect(response).toEqual(false)
    })

    it('Should return true when title was removed successfully', async () => {
        const response = await deleteByID(4)
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
            pagocuota: "y"
        }
        const newTitle = inspectTitle(title)
        const response = await addTitle(newTitle)
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
        const response = await addTitle(newTitle)
        await expect(response > 0).toEqual(true)
    })
})
