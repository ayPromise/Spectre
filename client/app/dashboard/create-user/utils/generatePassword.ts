const generatePassword = () => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  password += "A";
  password += "a";
  password += "1";
  password += "!";
  for (let i = 4; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export default generatePassword;
