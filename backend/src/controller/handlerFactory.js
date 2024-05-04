const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

/**
 * @description  Factory function to delete document of given Model
 * @param {Object}  Model - Collection's Model
 * @returns {Function}  Handler Function
 */

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return next(new AppError("No document found with that ID! ", 404));
    }
    // 204 - Content not Present
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

/** Factory Function to Update document of given Model */
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID! ", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        result: doc,
      },
    });
  });

/** Factory Function to Create new  document of given Model */
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // Add the author field to the request body
    req.body.author = req.user.id;
    // Modern way of creating Documents
    // This will  return a promise with new document as data argument
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      message: "success",
      data: {
        result: newDoc,
      },
    });
  });

/** Factory Function to Get document of given Model
 * @param {Object} Model - Model - Collection's Model
 * @param {Object} popOption - Populate object
 */
exports.getOne = (Model, popOption) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;

    /** If  populate is not define */
    let query = Model.findById(id);

    /** If populate option is define  */
    if (popOption) query = Model.findById(id).populate(popOption);

    const doc = await query;

    // If document not found (404) Error handling
    if (!doc) {
      return next(new AppError(`document not found for ${id} id `, 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        result: doc,
      },
    });
  });

exports.getAllOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    console.log(req.user);
    if (req.params.storyId) filter = { tour: req.params.storyId };

    // EXECUTING A QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort();

    const doc = await features.query;
    // const doc = await features.query.explain();

    return res.status(200).json({
      status: "success",
      count: doc.length,
      data: {
        result: doc,
      },
    });
  });
