const express = require('express')
const jsonminify = require('jsonminify')

const Tree = require('../models/Tree')
const router = express.Router()


// Get data
router.get('/', (req, res) => {
  Tree.findOne((err, tree) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message })

    return res.json({
      status: 'ok',
      results: tree ? JSON.parse(tree.data) : null
    })
  })
})


// Reset tree to initial values
router.get('/reset', (req, res) => {
  Tree.collection.drop()

  const tree = new Tree()

  let foldersIdCounter = 1
  let camerasIdCounter = 1
  let eventsIdCounter = 1

  tree.data = jsonminify(`[
    {
      "type": "folder",
      "id": ${foldersIdCounter++},
      "name": "Домик для гостей",
      "contains": [
        {
          "type": "folder",
          "id": ${foldersIdCounter++},
          "name": "Cпальня",
          "contains": [
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера в углу",
              "realtime": true,
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            },
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера фронтовая",
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            }
          ]
        },
        {
          "type": "folder",
          "id": ${foldersIdCounter++},
          "name": "Холл",
          "contains": [
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера ночного видения",
              "realtime": true,
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            },
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера-тепловизор",
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            }
          ]
        },
        {
          "type": "camera",
          "id": ${camerasIdCounter++},
          "name": "Камера широкоугольная",
          "realtime": true,
          "contains": [
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Гос.номера"
            },
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Лица"
            }
          ]
        },
        {
          "type": "camera",
          "id": ${camerasIdCounter++},
          "name": "Камера под плинтусом",
          "contains": [
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Гос.номера"
            },
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Лица"
            }
          ]
        }
      ]
    },
    {
      "type": "folder",
      "id": ${foldersIdCounter++},
      "name": "Гостиная",
      "contains": [
        {
          "type": "camera",
          "id": ${camerasIdCounter++},
          "name": "Скрытая камера",
          "contains": [
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Гос.номера"
            },
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Лица"
            }
          ]
        }
      ]
    },
    {
      "type": "folder",
      "id": ${foldersIdCounter},
      "name": "Гараж",
      "contains": []
    }
  ]`)

  tree.save()

  return res.json({ status: 'ok', results: null })
})


// Update tree
router.post('/update', (req, res) => {
  Tree.findOneAndUpdate(
    {},
    { $set: { data: req.body.newTree }},
    () => {}
  )

  return res.json({ status: 'ok', results: null })
})


module.exports = router
