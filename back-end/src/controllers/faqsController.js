import faq from "../models/faq.js";

const faqController = {};

faqController.getAllFaqs = async (req, res) => {
  try {
    const faqs = await faq.find();
    res.status(200).json(faqs);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

faqController.insertFaqs = async (req, res) => {
  const { question, answer, level, isActive } = req.body;
  try {
    if ((!question || !answer, !level, isActive === undefined)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (level < 1 || level > 10) {
      return res
        .status(400)
        .json({ message: "Level must be between 1 and 10" });
    }
    if (question.length < 4 || answer.length < 4) {
      return res.status(400).json({ message: "Question or answer too short" });
    }
    const newFaq = new faq({ question, answer, level, isActive });
    newFaq.save();
    return res.status(200).json({ message: "Faqs saved" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

faqController.updateFaqs = async (req, res) => {
  const { question, answer, level, isActive } = req.body;
  try {
    if (level < 1 || level > 10) {
      return res
        .status(400)
        .json({ message: "Level must be between 1 and 10" });
    }
    if (question.length < 4 || answer.length < 4) {
      return res.status(400).json({ message: "Question or answer too short" });
    }

    const updatedFaqs = await faq.findByIdAndUpdate(
      req.params.id,
      {
        question,
        answer,
        level,
        isActive,
      },
      { new: true }
    );
    if (!updatedFaqs) return res.status(400).json({ message: "not found" });
    return res.status(200).json({ message: "Faqs updated" });
  } catch (error) {
    console.log("Error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

faqController.deleteFaqs = async (req, res) => {
  try {
    const deletedFaqs = await faq.findByIdAndDelete(req.params.id);
    if (!deletedFaqs) return res.status(400).json({ message: "Not found" });
    return res.status(200).json({ message: "Faqs deleted" });
  } catch (error) {
    console.log("Error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

faqController.get1Faqs = async (req, res) => {
  try {
    const faqs = await faq.findById(req.params.id);
    if (!faqs) return res.status(404).json({ message: "Not found" });
    res.status(200).json(faqs);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default faqController;
