const router = require("express").Router();
const axios = require('axios');
const https = require('https');
const config = require('../../config.json');

// this basically bypasses certificate checks.
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const url = (ext) => `${config.protocol}://${config.host}:${config.port}/${ext}`;

router.route("/dictionary")
  .post((req, res) => {
    const { body } = req;
    axios.request({
      method: 'GET',
      url: url(`${body.table}/${body.year}/cohort/dictionary`),
      httpsAgent,
    })
      .then((r) => {
        res.json(r.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  });

router.route('/explore')
  .post((req, res) => {
    const { body } = req;
    axios.request({
      method: 'POST',
      url: url(`${body.table}/${body.year}/cohort/${body.cohort_id}/associations_to_all_features2`),
      data: body.data,
      httpsAgent,
    })
      .then((r) => {
        res.json(r.data);
      })
      .catch((e) => {
        res.status(500).send(e);
      })
  });

router.route('/associate')
  .post((req, res) => {
    const { body } = req;
    axios.request({
      method: 'POST',
      url: url(`${body.table}/${body.year}/cohort/${body.cohort_id}/feature_association2`),
      data: body.data,
      httpsAgent,
    })
      .then((r) => {
        res.json(r.data);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  });

router.route('/cohort_features')
  .post((req, res) => {
    const { body } = req;
    axios.request({
      method: 'GET',
      url: url(`${body.table}/${body.year}/cohort/${body.cohort_id}/features`),
      httpsAgent,
    })
      .then((r) => {
        res.json(r.data);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  });

module.exports = router;