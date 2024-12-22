'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../../components/ThemeToggle';
import { createTrip, generateDailySchedule } from '../../utils/tripStorage';

export default function NewTrip() {
  const router = useRouter();
  const [tripData, setTripData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    members: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 生成每日行程模板
    const dailySchedule = generateDailySchedule(tripData.startDate, tripData.endDate);
    
    // 創建新行程
    const newTrip = createTrip({
      ...tripData,
      dailySchedule,
      importantInfo: {
        accommodation: '',
        transportation: ''
      }
    });
    
    router.push(`/trips/${newTrip.id}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">新增行程</h1>
          <ThemeToggle />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">行程名稱</label>
            <input
              type="text"
              value={tripData.title}
              onChange={(e) => setTripData({...tripData, title: e.target.value})}
              className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">開始日期</label>
              <input
                type="date"
                value={tripData.startDate}
                onChange={(e) => setTripData({...tripData, startDate: e.target.value})}
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">結束日期</label>
              <input
                type="date"
                value={tripData.endDate}
                onChange={(e) => setTripData({...tripData, endDate: e.target.value})}
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">地點</label>
            <input
              type="text"
              value={tripData.location}
              onChange={(e) => setTripData({...tripData, location: e.target.value})}
              className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">成員人數</label>
            <input
              type="number"
              value={tripData.members}
              onChange={(e) => setTripData({...tripData, members: e.target.value})}
              className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              建立行程
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 