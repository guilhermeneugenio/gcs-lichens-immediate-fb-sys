/* 
 * immediateFeedback
 * Description : Immediate feedback dummy module
 */

const immediateFeedback = (req, res) => {
    res.status(200).send({immediate: 'Thank you!'});
};

// Export module
exports.immediateFeedback = immediateFeedback;