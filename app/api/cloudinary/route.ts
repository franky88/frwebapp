import { NextRequest, NextResponse } from 'next/server';
import { axiosCloudinary } from '@/lib/axios';

export async function POST(req: NextRequest) {
  const { folderName } = await req.json();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;

  try {
    const response = await axiosCloudinary.post(`/${cloudName}/folders/${folderName}`, {},
    );

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.response?.data || error.message }, { status: 500 });
  }
}