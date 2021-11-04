const speakeasy = require("speakeasy");

const verified = speakeasy.totp.verify({
  secret: "q9)xLityi{X:<ftR:I(D#rcC%UX}nzEy",
  encoding: "ascii",
  token: "139876",
});

console.log(verified);
