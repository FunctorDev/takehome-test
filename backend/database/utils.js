exports.transformValueFromCsvToArrayOrElse = (value, delimiter = ',') => {
  const isStringQuoted = (str) => str.startsWith('"') && str.endsWith('"');

  const maybeUnQuoteString = (str) =>
    isStringQuoted(str) ? str.replace(/"/g, '') : str;

  if (value) {
    if (isStringQuoted(value)) {
      return [maybeUnQuoteString(value)];
    }

    return value.split(delimiter).map(maybeUnQuoteString);
  }

  return null;
};

exports.parseNumberOrElse = (v) => {
  const parsed = parseFloat(v);

  if (typeof parsed === 'number' && !isNaN(parsed)) {
    return parsed;
  }

  return null;
};
