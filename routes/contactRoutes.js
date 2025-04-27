const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middlewares/auth');
const emailService = require('../utils/emailService');
const { Contact } = require('../models');

router.post('/', contactController.createContact);
router.get('/', auth.authenticate, auth.authorize('admin'), contactController.getAllContacts);
router.get('/:id', auth.authenticate, auth.authorize('admin'), contactController.getContactById);
router.put('/:id/respond', auth.authenticate, auth.authorize('admin'), contactController.markAsResponded);

router.post('/:id/response', auth.authenticate, auth.authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const { response } = req.body;
    await emailService.sendResponseToContact(contact, response);

    contact.responded = true;
    await contact.save();

    res.json({ message: 'Response sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;