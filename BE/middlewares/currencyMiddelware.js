const currencyMiddelware = (req, res, next) => {
  const { currency } = req.query;
  if (currency) {
    req.currency = currency;
  }
  next();
};

export default currencyMiddelware;
