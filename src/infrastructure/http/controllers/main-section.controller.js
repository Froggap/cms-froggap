import {cmsRepository} from "../../database/mongoose/repositories/mongoose-main-section.repository.js"
import {saveMainSection} from "../../../core/main-section/save-main-section.use-case.js"
import {getMainSection} from "../../../core/main-section/get-main-section.use-case.js"
import {updateMainSection} from "../../../core/main-section/update-main-section.use-case.js"
import {deleteMainSection} from "../../../core/main-section/delete-main-section.use-case.js"

const saveMainSectionUseCase = saveMainSection(cmsRepository);
const getMainSectionUseCase = getMainSection(cmsRepository);
const updateMainSectionUseCase = updateMainSection(cmsRepository);
const deleteMainSectionUseCase = deleteMainSection(cmsRepository);

export const save = async (req, res) => {
  try {
    const result = await saveMainSectionUseCase(req.body);

    return res.json({
      success: true,
      message: "Main section saved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const mainSection = await getMainSectionUseCase();
    return res.json({
      success: true,
      message: "Main section retrieved successfully",
      data: mainSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateMainSectionUseCase(id, req.body);

    return res.json({
      success: true,
      message: "Main section updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMainSectionUseCase(id);

    return res.json({
      success: true,
      message: "Main section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
