import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const { type = "general", message = "", email = "", context = "" } = req.body;

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ error: "Message must be at least 10 characters." });
    }

    const doc = await Feedback.create({
      type,
      message: message.trim(),
      email: email.trim(),
      context: context.trim(),
    });

    return res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};