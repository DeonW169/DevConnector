const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateJobInput = require('../../validation/job');

// Load Models
const Job = require('../../models/Job');

// @route   GET api/job/all
// @desc    Get all job postings
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Job.find()
    .then(jobs => {
      if (!jobs) {
        errors.nojob = 'There are no jobs';
        return res.status(404).json(errors);
      }

      res.json(jobs);
    })
    .catch(err => res.status(404).json({
      job: 'There are no jobs'
    }));
});

// @route   GET api/job/handle/:handle
// @desc    Get job by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Job.findOne({
      handle: req.params.handle
    })
    .then(job => {
      if (!job) {
        errors.nojob = 'There is no job';
        res.status(404).json(errors);
      }

      res.json(job);
    })
    .catch(err => res.status(404).json(err));
});


// @route   POST api/job
// @desc    Create or edit job posting
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateJobInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const jobFields = {};
    jobFields.user = req.user.id;
    if (req.body.title) jobFields.title = req.body.title;
    if (req.body.refNumber) jobFields.refNumber = req.body.refNumber;
    if (req.body.salaryMin) jobFields.salaryMin = req.body.salaryMin;
    if (req.body.salaryMax) jobFields.salaryMax = req.body.salaryMax;
    if (req.body.salaryType) jobFields.salaryType = req.body.salaryType;
    if (req.body.description) jobFields.description = req.body.description;
    if (req.body.location) jobFields.location = req.body.location;
    if (req.body.sector) jobFields.sector = req.body.sector;

    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      jobFields.skills = req.body.skills.split(',');
    }
    // Experience - Spilt into array
    if (typeof req.body.experience !== 'undefined') {
      jobFields.experience = req.body.experience.split(',');
    }

    Job.findOne({
      user: req.user.id
    }).then(job => {
      if (job) {
        // Update
        Job.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: jobFields
        }, {
          new: true
        }).then(job => res.json(job));
      } else {
        // Create

        // Check if handle exists
        Job.findOne({
          handle: jobFields.handle
        }).then(job => {
          if (job) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Job
          new Job(jobFields).save().then(job => res.json(job));
        });
      }
    });
  }
);

module.exports = router;