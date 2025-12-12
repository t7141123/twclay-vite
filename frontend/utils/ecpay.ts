
import { md5 } from './md5';
import { CartItem } from '../types';

// ECPay Test Environment Credentials
const MERCHANT_ID = '2000132';
const HASH_KEY = '5294y06JbISpM5x9';
const HASH_IV = 'v77hoKGq4kWxNNIS';
const ACTION_URL = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';

interface ECPayParams {
  [key: string]: string;
}

// Helper to format date as yyyy/MM/dd HH:mm:ss
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

// ECPay specific URL encoding
const ecpayEncode = (str: string): string => {
  return encodeURIComponent(str)
    .replace(/%20/g, '+')
    .replace(/%2d/g, '-')
    .replace(/%5f/g, '_')
    .replace(/%2e/g, '.')
    .replace(/%21/g, '!')
    .replace(/%2a/g, '*')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .toLowerCase();
};

const generateCheckMacValue = (params: ECPayParams): string => {
  // 1. Filter out CheckMacValue if present and sort keys
  const keys = Object.keys(params).filter(k => k !== 'CheckMacValue').sort();

  // 2. Concatenate parameters
  let rawString = keys.map(key => `${key}=${params[key]}`).join('&');

  // 3. Add HashKey and HashIV
  rawString = `HashKey=${HASH_KEY}&${rawString}&HashIV=${HASH_IV}`;

  // 4. URL Encode
  const encodedString = ecpayEncode(rawString);

  // 5. MD5 and Uppercase
  return md5(encodedString).toUpperCase();
};

export const submitPaymentForm = (cartItems: CartItem[], totalAmount: number, language: string) => {
  const date = new Date();
  const tradeNo = `TWC${date.getTime()}`; // Unique Trade No
  const tradeDate = formatDate(date);

  // Construct ItemName string (Limit 200 chars, usually)
  // Format: Name1 NT$Price x Qty#Name2...
  let itemNames = cartItems.map(item => {
    // Determine name based on language or fallback to en
    const name = (item.productName as any)[language] || (item.productName as any)['en'] || 'Product';
    const variant = item.variantName ? `-${item.variantName}` : '';
    return `${name}${variant} ${item.price}元 x ${item.quantity}`;
  }).join('#');

  // Truncate if too long to avoid API error (optional safety)
  if (itemNames.length > 190) {
    itemNames = "台灣軟陶商品一批"; 
  }

  // Base parameters
  const params: ECPayParams = {
    MerchantID: MERCHANT_ID,
    MerchantTradeNo: tradeNo,
    MerchantTradeDate: tradeDate,
    PaymentType: 'aio',
    TotalAmount: totalAmount.toFixed(0),
    TradeDesc: 'Taiwan Clay Online Purchase',
    ItemName: itemNames,
    ReturnURL: 'https://example.com/api/payment-callback', // Mandatory, but unused in no-backend setup
    ChoosePayment: 'ALL',
    EncryptType: '1',
    ClientBackURL: window.location.href, // Button to return to shop
    OrderResultURL: window.location.href, // Redirect here after payment
  };

  // Calculate CheckMacValue
  params.CheckMacValue = generateCheckMacValue(params);

  // Create and submit form
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = ACTION_URL;
  form.style.display = 'none';

  Object.keys(params).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(form);
  }, 1000);
};
