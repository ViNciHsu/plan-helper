'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ThemeToggle from '../../../components/ThemeToggle';
import { getTrip, updateTrip } from '../../../utils/tripStorage';

export default function EditTrip() {
  const router = useRouter();
  const params = useParams();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const trip = getTrip(params.id);
    if (trip) {
      setTripData(trip);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  if (!tripData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        載入中...
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrip(params.id, tripData);
    router.push('/');
  };

  // 處理每日行程的變更
  const handleActivityChange = (dayIndex, activityIndex, value) => {
    const newSchedule = [...tripData.dailySchedule];
    newSchedule[dayIndex].activities[activityIndex] = value;
    setTripData({ ...tripData, dailySchedule: newSchedule });
  };

  // 添加新活動到特定日期
  const addActivity = (dayIndex) => {
    const newSchedule = [...tripData.dailySchedule];
    newSchedule[dayIndex].activities.push('');
    setTripData({ ...tripData, dailySchedule: newSchedule });
  };

  // 刪除活動
  const removeActivity = (dayIndex, activityIndex) => {
    const newSchedule = [...tripData.dailySchedule];
    newSchedule[dayIndex].activities.splice(activityIndex, 1);
    setTripData({ ...tripData, dailySchedule: newSchedule });
  };

  // 處理重要資訊的變更
  const handleInfoChange = (field, value) => {
    setTripData({
      ...tripData,
      importantInfo: { ...tripData.importantInfo, [field]: value }
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">編輯行程</h1>
          <ThemeToggle />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本資訊區塊 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4">基本資訊</h2>
            <div className="space-y-6">
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

              <div className="grid grid-cols-2 gap-4">
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
              </div>
            </div>
          </div>

          {/* 每日行程區塊 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4">每日行程</h2>
            {tripData.dailySchedule.map((day, dayIndex) => (
              <div key={day.date} className="mb-6 last:mb-0">
                <h3 className="font-medium mb-2">Day {dayIndex + 1} - {day.date}</h3>
                <div className="space-y-2">
                  {day.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={activity}
                        onChange={(e) => handleActivityChange(dayIndex, activityIndex, e.target.value)}
                        className="flex-1 p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="輸入活動"
                      />
                      <button
                        type="button"
                        onClick={() => removeActivity(dayIndex, activityIndex)}
                        className="p-2 text-red-500 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addActivity(dayIndex)}
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    + 添加活動
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 重要資訊區塊 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4">重要資訊</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">住宿</label>
                <input
                  type="text"
                  value={tripData.importantInfo.accommodation}
                  onChange={(e) => handleInfoChange('accommodation', e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">交通</label>
                <input
                  type="text"
                  value={tripData.importantInfo.transportation}
                  onChange={(e) => handleInfoChange('transportation', e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 按鈕區塊 */}
          <div className="flex gap-4 justify-end">
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
              儲存變更
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 