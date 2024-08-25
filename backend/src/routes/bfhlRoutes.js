const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('Received data:', req.body);
    console.log(req.body);
    try {
        const { data } = req.body;
        
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input: data should be an array" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const lowercaseAlphabets = alphabets.filter(char => char.toLowerCase() === char);
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

        const response = {
            is_success: true,
            user_id: "Ashish", 
            email: "ashish@vutbhopal.ac.in", 
            roll_number: "21BAI10076", 
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal server error" });
    }
});

router.get('/', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

module.exports = router;