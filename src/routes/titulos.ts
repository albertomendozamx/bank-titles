import express from 'express';
import * as titleService from '../services/titleService'
const router = express.Router()

router.get('/', (_req, res) => {

  return res.status(200).send({
    status: true,
    message: 'All titles',
    data: titleService.getTitles()
  })
})

router.get('/:id', (req, res) => {
  const id = +req.params.id
  const titulo = titleService.findByID(id)
  return (titulo != null)
    ? res.status(200).send({ status: true, message: `${id}`, data: titulo })
    : res.status(404).send({ status: false, message: 'Not found', data: [] })
})

router.post('/', async (_req, res) => {
  try {
    // Save and return last id
    const data: any = []
    return res.status(201).send({ status: true, message: 'Created', data })
  } catch (error) {
    return res.send(400).send({ status: false, message: 'Errir', error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = +req.params.id
  const titulo = titleService.findByID(id)
  if (!titulo)
    return res.status(404).send({ status: false, message: 'Not found', data: [] })

  const wasDeleted = await titleService.deleteByID(id)
  if (!wasDeleted)
    return res.status(400).send({ status: false, message: 'Delete failed', data: [] })

  return res.status(200).send({
    status: true,
    message: `${id} was deleted successfully`,
    data: []
  })
})

router.patch('/:id', async (req, res) => {
  const id = +req.params.id
  const titulo = titleService.findByID(id)
  if (!titulo)
    return res.status(404).send({ status: false, message: 'Not found', data: [] })

  const wasDeleted = await titleService.deleteByID(id)
  if (!wasDeleted)
    return res.status(400).send({ status: false, message: 'Delete failed', data: [] })

  return res.status(200).send({
    status: true,
    message: `${id} was deleted successfully`,
    data: []
  })
})

export default router