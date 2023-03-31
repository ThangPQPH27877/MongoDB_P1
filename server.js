// buoc 1: cài đặt NodeJS
// bước 2: chạy example

const express = require('express')
const app = express()
const port = 3000

const expressHbs = require('express-handlebars');

const mongoose = require('mongoose');

const uri = 'mongodb+srv://thangpqph27877:T7dsreVeCSz8xJZg@thang1507.b7jubyg.mongodb.net/?retryWrites=true&w=majority';

const btModel = require('./baithoModel');

app.get('/tho', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  let listThos = await btModel.find({nam: 1975, tieude: 'Giai phong Dien Bien'});

  console.log(listThos);
  res.send(listThos);

})

app.get('/add_tho', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  const baitho = new btModel({
    tieude: 'Hat gao lang ta',
    nam: 1973
  });

  baitho.tacgia = 'Tran Dang Khoa';

  let kq  = await baitho.save();

  console.log(kq);

  let listThos = await btModel.find();

  // btModel.updateMany({nam: 1975}, {nam: 1976})
  // btModel.updateOne()

  // btModel.deleteMany()
  // btModel.deleteOne()

  res.send(listThos);

})

app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  //defaultLayout: 'main',
  //layoutsDir: "views/layouts/",
}));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );
// handlebars
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
})

app.get('/page2', (req, res) => {
  //res.render('home');
  res.render('page2', {layout: 'main', soA: 15, soB: 7, kq: 22});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

