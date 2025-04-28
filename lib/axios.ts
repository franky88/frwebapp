import axios from "axios"

const apiKey = process.env.CLOUDINARY_API_KEY!;
const apiSecret = process.env.CLOUDINARY_API_SECRET!;
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': process.env.KRAKEN_API_TOKEN
    },
    withCredentials: true,
});

export const axiosCloudinary = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || 'https://api.cloudinary.com/v1_1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
    },
    withCredentials: true,
});