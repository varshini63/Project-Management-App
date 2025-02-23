const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// @route   GET api/projects
// @desc    Get all projects for a user
router.get('/', auth, async (req, res) => {
    try {
      console.log("Fetching projects for User ID:", req.user.id); // Debugging
  
      const projects = await Project.find({
        $or: [{ owner: req.user.id }, { team: req.user.id }]
      }).populate('owner', ['name', 'email'])
        .populate('team', ['name', 'email']);
  
      console.log("Projects Found:", projects); // Debugging
  
      if (!projects.length) {
        return res.status(404).json({ msg: "No projects found for this user" });
      }
  
      res.json(projects);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      res.status(500).send('Server Error');
    }
  });
  

// @route   POST api/projects
// @desc    Create a new project
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, team, startDate, endDate } = req.body;

    const newProject = new Project({
      title,
      description,
      owner: req.user.id,
      team,
      startDate,
      endDate
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error("Error creating project:", err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/projects/:id
// @desc    Update a project
router.put('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid project ID' });
    }

    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Make sure user owns the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.error("Error updating project:", err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid project ID' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Ensure only the owner can delete
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await project.remove();
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error("Error deleting project:", err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/projects/:id
// @desc    Get a project by ID
router.get('/:id', auth, async (req, res) => {
    try {
      console.log("Project ID being searched:", req.params.id);
      console.log("User ID from token:", req.user.id);
      
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log("Invalid ObjectId format");
        return res.status(400).json({ msg: "Invalid project ID" });
      }
  
      const project = await Project.findById(req.params.id);
      console.log("Project found:", project);
      res.json(project);
    } catch (err) {
      console.error("Error fetching project:", err.message);
      res.status(500).send("Server Error");
    }
  });
  router.delete('/:id', auth, async (req, res) => {
    try {
      // Log all incoming data
      console.log('=== DELETE REQUEST DEBUG INFO ===');
      console.log('Project ID:', req.params.id);
      console.log('User ID:', req.user.id);
      console.log('Headers:', req.headers);
  
      // Validate project ID
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log('Invalid project ID format');
        return res.status(400).json({ msg: 'Invalid project ID format' });
      }
  
      // Find the project with detailed error handling
      let project;
      try {
        project = await Project.findById(req.params.id);
        console.log('Project found:', project);
      } catch (findError) {
        console.error('Error finding project:', findError);
        return res.status(500).json({ msg: 'Error finding project', error: findError.message });
      }
  
      if (!project) {
        console.log('Project not found');
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      // Authorization check
      console.log('Project owner:', project.owner.toString());
      console.log('Request user:', req.user.id);
      
      if (project.owner.toString() !== req.user.id) {
        console.log('Authorization failed');
        return res.status(403).json({ msg: 'Not authorized to delete this project' });
      }
  
      // Delete with detailed error handling
      try {
        const deleteResult = await Project.findByIdAndDelete(req.params.id);
        console.log('Delete result:', deleteResult);
        
        if (!deleteResult) {
          console.log('Delete operation returned null');
          return res.status(500).json({ msg: 'Delete operation failed' });
        }
        
        console.log('Project successfully deleted');
        return res.json({ 
          msg: 'Project deleted successfully', 
          id: req.params.id 
        });
      } catch (deleteError) {
        console.error('Error during delete operation:', deleteError);
        return res.status(500).json({ msg: 'Error deleting project', error: deleteError.message });
      }
  
    } catch (err) {
      console.error('=== MAIN ERROR CATCH BLOCK ===');
      console.error('Error type:', err.constructor.name);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      return res.status(500).json({ 
        msg: 'Server Error', 
        error: err.message,
        type: err.constructor.name,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  });
  
module.exports = router;
