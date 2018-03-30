const express = require('express');
const router = express.Router();
const knex = require('../db/connection');

const knexPostgis = require('knex-postgis');
const st = knexPostgis(knex);

const authHelpers = require('../auth/_helpers');

// router.get('/user', authHelpers.loginRequired, (req, res, next)  => {
//   handleResponse(res, 200, 'success');
// });

router.get('/admin', (req, res, next)  => {
  res.render('admin', {title: 'Dashboard | Satark'});
});

router.post('/submit_crime', authHelpers.loginRequired, (req, res, next) => {
  // console.log('Recieved form data : ', req.body.fir_no, req.body.lat,
  // req.body.lng, req.body.crimetype, req.body.address, req.body.datetime);
  // console.log(req.user);

  // Get the district which has this point.
  const geo_loc_in = st.point(req.body.lng, req.body.lat);
  // Split date and time.
  const incident_date = req.body.datetime.split(' ')[0];
  const incident_time = req.body.datetime.split(' ')[1];
  // This report was mode now.
  const report_date = new Date();
  // Set optional fields as undefined.
  req.body.address = (req.body.address == '') ? undefined : req.body.address;
  req.body.victim_name = (req.body.victim_name == '') ? undefined : req.body.victim_name;
  req.body.victim_age = (req.body.victim_age == '') ? undefined : req.body.victim_age;

  const sql1 =
  knex.select('district').from('assam_dist').where(st.intersects(geo_loc_in,
  'geom')).then(function(rows) {
    var district = rows[0].district;
    knex('crimes').insert({
      address: req.body.address,
      geo_loc: geo_loc_in,
      incident_date: incident_date,
      dates: report_date,
      crimetype: req.body.crimetype,
      fir_no: req.body.fir_no,
      lat: req.body.lat,
      lng: req.body.lng,
      crimedistricts: district,
      recorded_by: req.user.username,
      time_of_day: incident_time,
      victim_age: req.body.victim_age,
      victim_gender: req.body.victim_gender,
    }).into('crimes').then(() => {
      var string = encodeURIComponent('true');
      res.redirect('/admin?success=' + string);
    }).catch((error) => {
      var string = encodeURIComponent('false');
      console.log(error);
      res.redirect('/admin?success=' + string);
    });
  });
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
