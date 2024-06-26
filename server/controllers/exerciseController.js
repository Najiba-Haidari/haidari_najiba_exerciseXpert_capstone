import Exercise from '../models/exerciseModel.js';

// Get all exercises
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({userId: req.user._id});
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new exercise
export const createExercise = async (req, res) => {
  const { name, gifUrl, target, equipment, instructions, secondaryMuscles } = req.body;
  console.log("Received data:", req.body); 

  try {
    const newExercise = new Exercise({
      userId: req.user._id,
      name,
      gifUrl,
      target,
      equipment,
      instructions,
      secondaryMuscles,
    });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
};

// Delete an exercise
export const deleteExercise = async (req, res) => {
  const { id } = req.params;
  try {
    await Exercise.findByIdAndDelete(id);
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
