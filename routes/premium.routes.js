const express = require('express');
const router = express.Router();

router.get('/report', (req, res) => {
    const isPremium = req.user ? req.user.isPremium : false; 
    
    if (!isPremium) {
        return res.status(403).send("This is only for Premium Users.");
    }

    res.render('report', { isPremium });
});

router.get('/report-data', (req, res) => {
    res.json({
        success: true,
        expenses: [
            { date: '01-03-2021', description: 'Milk', category: 'Milk', amount: 60.00, type: 'Expense' },
            { date: '04-03-2021', description: 'Salary', category: 'Salary', amount: 40000.00, type: 'Income' },
            { date: '04-03-2021', description: 'Fruits', category: 'Fruits', amount: 500.00, type: 'Expense' },
            { date: '04-03-2021', description: 'Medicines', category: 'Health', amount: 50.00, type: 'Expense' }
        ],
        yearlySummary: [
            { month: 'March', income: 60000.00, expense: 5670.00 }
        ],
        notes: [
            { date: '11-02-2021', text: 'Gave advance to construction.' },
            { date: '16-02-2021', text: 'Fghj hhj hjj' }
        ]
    });
});

module.exports = router;