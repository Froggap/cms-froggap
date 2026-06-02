import {cmsRepository} from "../../database/mongoose/repositories/mongoose-main-section.repository.js"
import {saveMainSection} from "../../../core/cms/use-cases/save-main-section.use-case.js"

const saveMainSectionUseCase = saveMainSection(cmsRepository);

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