const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Question model
const Question = require('../../models/Question');

// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateQuestionInput = require('../../validation/question');

// @route   GET api/questions
// @desc    Get questions
// @access  Public
router.get('/', (req, res) => {
  Question.find()
    .sort({ date: -1 })
    .then(questions => res.json(questions))
    .catch(err => res.status(404).json({ noQuestionsFound: 'No questions found' }));
});

// @route   GET api/questions/:id
// @desc    Get question by id
// @access  Public
router.get('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err =>
      res.status(404).json({ noQuestionFound: 'No question found with that ID' })
    );
});

// @route   POST api/questions
// @desc    Create question
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateQuestionInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newQuestion = new Question({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newQuestion.save().then(question => res.json(question));
  }
);

// @route   DELETE api/questions/:id
// @desc    Delete question
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Question.findById(req.params.id)
        .then(question => {
          // Check for question owner
          if (question.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: 'User not authorized' });
          }

          // Delete
          question.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ questionNotFound: 'No question found' }));
    });
  }
);

// @route   POST api/questions/answer/:id
// @desc    Add answer to question
// @access  Private
router.post(
  '/answer/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateQuestionInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Question.findById(req.params.id)
      .then(question => {
        const newAnswer = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to answers array
        question.answers.unshift(newAnswer);

        // Save
        question.save().then(question => res.json(question));
      })
      .catch(err => res.status(404).json({ questionNotFound: 'No question found' }));
  }
);

// @route   DELETE api/questions/answer/:id/:answer_id
// @desc    Remove answer from question
// @access  Private
router.delete(
  '/answer/:id/:answer_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Question.findById(req.params.id)
      .then(question => {
        // Check to see if answer exists
        if (
          question.answers.filter(
            answer => answer._id.toString() === req.params.answer_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ answerNotExists: 'Answer does not exist' });
        }

        // Get remove index
        const removeIndex = question.answers
          .map(item => item._id.toString())
          .indexOf(req.params.answer_id);

        // Splice answer out of array
        question.answers.splice(removeIndex, 1);

        question.save().then(question => res.json(question));
      })
      .catch(err => res.status(404).json({ questionNotFound: 'No question found' }));
  }
);

module.exports = router;
