import express from 'express';
import * as titleService from '../services/titleService'
import inspectTitle from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  const allTitles = titleService.getTitles()
  return res.status(200).send({
    status: true,
    message: 'All titles',
    total: allTitles.length,
    data: allTitles
  })
})

router.get('/:id', (req, res) => {
  const id = +req.params.id
  const titulo = titleService.findByID(id)
  return (titulo != null)
    ? res.status(200).send({ status: true, message: `${id}`, data: titulo })
    : res.status(404).send({ status: false, message: 'Not found', data: [] })
})

router.post('/', async (req, res) => {
  try {
    const newUserTitle = inspectTitle(req.body)
    const savedUserTitle = await titleService.addTitle(newUserTitle)
    console.log('savedUserTitle', savedUserTitle)
    if (!savedUserTitle) {
      return res.status(400).send({
        status: false,
        message: 'User already has this title'
      })
    }

    return res.status(201).send({
      status: true,
      message: 'Created',
      data: { id: savedUserTitle, ...newUserTitle }
    })
  } catch (Error) {
    return res.status(400).send({ status: false, message: 'Error', error: `${Error}` })
  }
})

router.delete('/:id', async (req, res) => {
  const id = +req.params.id
  const titulo = titleService.findByID(id)
  if (!titulo)
    return res.status(404).send({ status: false, message: 'Not found', data: [] })

  try {
    const wasDeleted = await titleService.deleteByID(id)
    if (!wasDeleted)
      return res.status(400).send({ status: false, message: 'Delete failed', data: [] })

    return res.status(200).send({
      status: true,
      message: `${id} was deleted successfully`,
      data: []
    })
  } catch (Error) {
    return res.status(400).send({
      status: false,
      message: `${id} was not deleted`,
      data: []
    })
  }
})

router.patch('/move', async (req, res) => {
  const { origin, destiny } = req.body
  const newTitles = await titleService.moveTitles(origin, destiny)
  return res.status(200).send({
    status: true,
    data: newTitles
  })
})

router.patch('/:id', async (req, res) => {
  const id = +req.params.id
  const titulo = titleService.findByID(id)
  if (!titulo)
    return res.status(404).send({ status: false, message: 'Not found' })

  try {
    const cantidad = req.body.cantidad
    const statusTitle = await titleService.titlePayment(id, cantidad)
    if (!statusTitle)
      return res.status(200).send({ status: false, message: 'Updated failed' })

    return res.status(200).send({
      status: true,
      message: `${id} was updated successfully`
    })
  } catch (Error) {
    return res.status(400).send({
      status: false,
      message: Error,
    })
  }
})

export default router