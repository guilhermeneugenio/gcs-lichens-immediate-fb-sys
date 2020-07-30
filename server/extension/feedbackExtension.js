var express = require('express');
const diffFeedbacksArray = require('./diffFeedback/diffFeedbacksArray');

const immediateFeedback = () => {
    console.log('immediateFeedback');
};

const diffFeedback = (newInput) => {
    console.log('diffFeedback');
    diffFeedbacksArray.feedbacks.map(feedback => {
        feedback.module(newInput);
    });
};

exports.immediateFeedback = immediateFeedback;
exports.diffFeedback = diffFeedback;