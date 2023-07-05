"use strict";

const express = require("express");

const data = require("../models");
const genralModles = require("../middleware/generalModels");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");

const router = express.Router();

router.param("model", genralModles);

router.get("/:model", bearer, handleGetAll);
router.get("/:model/:id", bearer, handleGetOne);
router.post("/:model", bearer, acl("create"), handleCreate);
router.put("/:model/:id", bearer,acl('update'), handleUpdate);
router.delete("/:model/:id", bearer,acl('delete'), handleDelete);

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
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
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