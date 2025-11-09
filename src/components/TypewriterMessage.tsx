// src/components/TypewriterMessage.tsx

import React from 'react';
import { TypeAnimation } from 'react-type-animation';

// 1. กำหนด Types ของ props ที่จะรับเข้ามา (คือ 'text')
interface TypewriterMessageProps {
  text: string;
}

// 2. สร้าง Component
const TypewriterMessage: React.FC<TypewriterMessageProps> = ({ text }) => {
  return (
    <TypeAnimation
      // 3. ใส่ 'key={text}' สำคัญมาก!
      // เพื่อบังคับให้ Animation เริ่มพิมพ์ใหม่ทุกครั้งที่ข้อความเปลี่ยน
      key={text} 
      sequence={[
        text, // ข้อความที่จะพิมพ์
        5000, // เวลาที่จะให้ข้อความค้างไว้ (5 วินาที, เท่ากับ Timer ของเรา)
      ]}
      wrapper="span"
      speed={70}     // ความเร็วในการพิมพ์ (ยิ่งน้อยยิ่งเร็ว)
      repeat={0}     // พิมพ์แค่ครั้งเดียว
      cursor={false} // ไม่ต้องแสดง cursor กระพริบ
    />
  );
};

export default TypewriterMessage;
