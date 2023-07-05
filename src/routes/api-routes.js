'use strict';

const express = require('express');

const data = require('../models');
const genralModles = require('../middleware/generalModels');

const router = express.Router();

router.param('model', genralModles);

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res, next) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  } catch (err) {
    next(err);
  }
}

async function handleGetOne(req, res, next) {
  try {
    const id = req.params.id;
    const modelName = req.params.model;

    if (modelName === 'student') {
      const student = await req.model.get(id);
      const teachers = await student.getTeachers();

      res.status(200).json({
        student,
        teachers,
      });
    } else if (modelName === 'teacher') {
      const teacher = await req.model.get(id);
      const students = await teacher.getStudents();

      res.status(200).json({
        teacher,
        students,
      });
    } else if (modelName === 'school') {
      const school = await req.model.get(id);
      const teachers = await school.getTeachers();
      const students = await school.getStudents();

      res.status(200).json({
        school,
        teachers,
        students,
      });
    } else {
      const theRecord = await req.model.get(id);
      res.status(200).json(theRecord);
    }
  } catch (err) {
    next(err);
  }
}

async function handleCreate(req, res, next) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  } catch (err) {
    next(err);
  }
}

async function handleUpdate(req, res, next) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (err) {
    next(err);
  }
}

async function handleDelete(req, res, next) {
  try {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(204).json(deletedRecord);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
