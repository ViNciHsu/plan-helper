'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import { getAllTrips, deleteTrip } from './utils/tripStorage';

export default function Home() {
  const router = useRouter();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setTrips(getAllTrips());
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('確定要刪除此行程嗎？')) {
      deleteTrip(id);
      setTrips(getAllTrips());
    }
  };

  return (
    <div className="grid grid-rows-[60px_1fr_20px] min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">旅遊行程助手</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => router.push('/trips/new')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            新增行程
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <div 
              key={trip.id}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{trip.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {trip.startDate} - {trip.endDate}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">地點：{trip.location}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">成員：{trip.members}人</p>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={(e) => handleDelete(trip.id, e)}
                  className="px-3 py-1 text-sm border border-red-300 dark:border-red-700 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  刪除
                </button>
                <button 
                  onClick={() => router.push(`/trips/${trip.id}/edit`)}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  編輯
                </button>
                <button 
                  onClick={() => router.push(`/trips/${trip.id}`)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  查看詳情
                </button>
              </div>
            </div>
          ))}

          <div 
            onClick={() => router.push('/trips/new')}
            className="p-6 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center cursor-pointer bg-white dark:bg-gray-800"
          >
            <div className="text-center">
              <div className="text-4xl text-gray-400 dark:text-gray-500 mb-2">+</div>
              <p className="text-gray-500 dark:text-gray-400">新增行程</p>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">最近更新</h2>
          <div className="space-y-2">
            {trips
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .slice(0, 3)
              .map(trip => (
                <div key={trip.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm">
                    <span className="text-blue-500 dark:text-blue-400">{trip.title}</span>
                    {' - '}已更新
                  </p>
                  <time className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(trip.updatedAt).toLocaleString()}
                  </time>
                </div>
              ))}
          </div>
        </section>
      </main>

      <footer className="flex justify-center items-center text-sm text-gray-500 dark:text-gray-400">
        © 2024 旅遊行程助手
      </footer>
    </div>
  );
}
