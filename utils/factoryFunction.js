const {
    goodResponseDoc,
    badResponse,
    goodResponseCustom,
  } = require('./response');
  
  exports.createOne = (Model) => async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      goodResponseDoc(res, 'Document created successfully', doc);
    } catch (error) {
      badResponse(res, 'Could not create document');
    }
  };
  
  exports.getOne = (Model) => async (req, res) => {
    try {
      const doc = await Model.findOne({ queryId: req.params.id });
      if (!doc) return badResponse(res, `${Model} not found`);
      goodResponseDoc(res, `success`, 200, doc);
    } catch (error) {
      badResponse(res, 'Document does not exist');
    }
  };
  
  exports.getMany = (Model) => async (req, res, next) => {
    try {
      const doc = await Model.find();
      const Doc = {
        result: doc.length,
        doc,
      };
      goodResponseDoc(res, 'Success', 200, Doc);
    } catch (error) {
      badResponse(res, 'Could not get doc');
      next(error);
    }
  };
  
  exports.updateOne = (Model) => async (req, res) => {
    try {
      if (!req.params.id) return badResponse(res, `No ${Model} ID specified`);
      const doc = await Model.findOneAndUpdate(
        { requryId: req.params.id },
        req.body,
        {
          new: true,
          runValidators: false,
        }
      );
      if (!doc) return badResponse(res, `${Model} not found`);
      goodResponseDoc(res, 'Doc updated', doc);
    } catch (error) {
      badResponse(res, 'Could not update Doc');
    }
  };
  
  exports.deleteOne = (Model) => async (req, res) => {
    try {
      const doc = await Model.findOneAndDelete({ queryId: req.params.id });
      if (!doc) return badResponse(res, 'Doc not found');
      goodResponseCustom(res, 201, `doc deleted successfully`);
    } catch (error) {
      badResponse(res, 'Could not delete doc');
    }
  };
  