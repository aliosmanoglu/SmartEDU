const nodemailer = require("nodemailer");


exports.getIndex = (req, res) => {
  res.status(200).render('index', {
    pageName: 'index',
  });
};
exports.getAbout = (req, res) => {
  res.status(200).render('about', {
    pageName: 'about',
  });
};
exports.getContact = (req, res) => {
  res.status(200).render('contact', {
    pageName: 'contact',
  });
};

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    pageName: 'login',
  });
};
exports.getRegister = (req, res) => {
  res.status(200).render('register', {
    pageName: 'register',
  });
};

// exports.sendEmail = (req,res) => {

//   const outputMessage = ` 
//     <h1>Message Detail</h1>
//     <ul>
//       <li>
//         Name : ${req.body.name}
//       </li>
//       <li>
//         Email : ${req.body.email}
//       </li>
//     </ul>
//     <p>
//       ${req.body.message}
//     </p>

//   `

//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: "aliguveli0@gmail.com",
//       pass: process.env.EMAIL_PASS,
//     },
//   });

// }