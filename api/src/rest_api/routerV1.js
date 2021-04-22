import express from 'express';

const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { files, user } = req;
    // TODO process and save file
    return res.send({
      status: 'SUCCESS',
    });
  } catch (e) {
    return res.send({
      status: 'FAILED',
    });
  }
});
export default router;
