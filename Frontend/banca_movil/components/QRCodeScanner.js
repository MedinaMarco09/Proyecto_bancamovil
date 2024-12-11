import React from 'react';
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCodeScannerComponent = ({ onScan }) => {
  return (
    <View>
      <QRCodeScanner onRead={onScan} />
    </View>
  );
};

export default QRCodeScannerComponent;