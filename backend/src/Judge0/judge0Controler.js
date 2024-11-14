// src/Judge0/judge0Controller.js
const runCode = require('./judge0Service');

const runCodeController = async (req, res) => {
    const { source_code, language_id } = req.body;

    console.log("Received request to run code with data:", { source_code, language_id });

    try {
        const result = await runCode(source_code, language_id);
        res.status(200).json({
            message: "Code executed successfully",
            result,
        });
    } catch (error) {
        console.error("Error in executing code:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = runCodeController;
