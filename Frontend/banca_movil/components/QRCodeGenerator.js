// src/components/QRCodeGenerator.js
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = ({ value }) => {
  return <QRCode value={value} />;
};

export default QRCodeGenerator;