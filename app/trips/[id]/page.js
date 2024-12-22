'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ThemeToggle from '../../components/ThemeToggle';
import { getTrip } from '../../utils/tripStorage';

export default function TripDetails() {
  const router = useRouter();
  const params = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const tripData = getTrip(params.id);
    if (tripData) {
      setTrip(tripData);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        載入中...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{trip.title}</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => router.push(`/trips/${params.id}/edit`)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              編輯行程
            </button>
          </div>
        </div>

        {/* 基本資訊區塊 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">行程概要</h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">日期：{trip.startDate} - {trip.endDate}</p>
            <p className="text-gray-600 dark:text-gray-300">地點：{trip.location}</p>
            <p className="text-gray-600 dark:text-gray-300">成員：{trip.members}人</p>
          </div>
        </div>

        {/* 每日行程區塊 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">每日行程</h2>
          <div className="space-y-6">
            {trip.dailySchedule.map((day, index) => (
              <div key={day.date} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                <h3 className="font-medium mb-2">Day {index + 1} - {day.date}</h3>
                {day.activities.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    {day.activities.map((activity, activityIndex) => (
                      <li key={activityIndex}>{activity}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">尚未安排活動</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 重要資訊區塊 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">重要資訊</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">住宿</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {trip.importantInfo.accommodation || '尚未設定住宿資訊'}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">交通</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {trip.importantInfo.transportation || '尚未設定交通資訊'}
              </p>
            </div>
          </div>
        </div>

        {/* 返回按鈕 */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            返回首頁
          </button>
        </div>
      </div>
    </div>
  );
} 