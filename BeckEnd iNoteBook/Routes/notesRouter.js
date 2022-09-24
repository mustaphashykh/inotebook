const express = require('express');
const notesRouter = express.Router();
const notesModel = require('../Models/notesModel')
const protectRoute = require('../MiddleWare/protectRoute')

notesRouter
    .route('/getallnotes')
    .get(protectRoute, async (req, res) => {
        try {
            const notes = await notesModel.find({ user_id: req.id });
            if (notes) {
                res.status(200).json({
                    "message": "successfully fetched all notes",
                    "notes": notes
                })
            } else {
                res.status(404).json({
                    "message": "No notes available yet"
                })
            }
        } catch (error) {
            res.status(500).json({ "error": error.message })
        }
    }),

    notesRouter
        .route('/addnotes')
        .post(protectRoute, async (req, res) => {
            try {
                console.log(req.id);
                const new_note = {
                    user_id: req.id,
                    title: req.body.title,
                    description: req.body.description,
                    tag: req.body.tag
                }
                const saved_note = await notesModel.create(new_note);
                if (saved_note) {
                    res.status(200).json({
                        "message": "Note successfully added.",
                        "note": saved_note
                    })
                } else {
                    res.status(401).send('Internal server error.');
                }

            } catch (error) {
                res.status(500).json({ "error": error.message })
            }
        })

notesRouter
    .route('/updatenotes/:id')
    .put(protectRoute, async (req, res) => {
        try {
            let db_note = await notesModel.findById(req.params.id);
            if (db_note) {
                if (db_note.user_id.toString() == req.id) {
                    db_note = {
                        title: req.body.title,
                        description: req.body.description,
                        tag: req.body.tag
                    }
                    const saved_note = await notesModel.findByIdAndUpdate(req.params.id, db_note);
                    if (saved_note) {
                        res.status(200).json({
                            'message': 'successfully updated',
                            'updated note': saved_note
                        })
                    } else {
                        res.status(401).json({ "error": 'internal server error' })
                    }
                } else {
                    res.status(401).json({
                        message: 'unauthorized user'
                    })
                }
            } else {
                res.status(404).json({ "error": "note not found." })
            }
        }
        catch (error) {
            res.status(500).json({ "error": error.message })
        }
    })

notesRouter
    .route('/deletenotes/:id')
    .delete(protectRoute, async (req, res) => {
        try {
            let db_note = await notesModel.findById(req.params.id);
            if (db_note) {
                if (db_note.user_id.toString() == req.id) {
                    const deleted_note = await notesModel.findByIdAndDelete(req.params.id);
                    if (deleted_note) {
                        res.status(200).json({
                            'message': 'successfully deleted',
                            'updated note': deleted_note
                        })
                    } else {
                        res.status(401).json({ "error": 'internal server error' })
                    }
                } else {
                    res.status(401).json({
                        message: 'unauthorized user'
                    })
                }
            } else {
                res.status(404).json({ "error": "note not found." })
            }
        }
        catch (error) {
            res.status(500).json({ "error": error.message })
        }
    })

module.exports = notesRouter;