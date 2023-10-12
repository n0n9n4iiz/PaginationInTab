const express = require('express');
const router = express.Router();
const db = require('./database');

router.get('/isconnected', async (req, res) => {
  try {
    const result = await db.isConnected();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/tankall', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const perPage = parseInt(req.query.perPage) || 10
  const pagination = {page,perPage}
  const type = req.query.type
    try {
      const result = await db.getTankAll(pagination,type);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.get('/tanktype', async(req,res) => {
    try{
      const result = await db.getTypeGroup()
      res.status(200).json(result)
    }catch(err){
      res.status(500).json({error:'Internal Server Error'})
    }
})
router.get('/tankall2', async (req, res) => {
    try {
      const result = await db.getTankAll2();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;