// 從 localStorage 獲取所有行程
export const getAllTrips = () => {
  if (typeof window === 'undefined') return [];
  const trips = localStorage.getItem('trips');
  return trips ? JSON.parse(trips) : [];
};

// 獲取單個行程
export const getTrip = (id) => {
  const trips = getAllTrips();
  return trips.find(trip => trip.id === id);
};

// 創建新行程
export const createTrip = (tripData) => {
  const trips = getAllTrips();
  const newTrip = {
    id: Date.now().toString(), // 簡單的 ID 生成
    ...tripData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  trips.push(newTrip);
  localStorage.setItem('trips', JSON.stringify(trips));
  return newTrip;
};

// 更新行程
export const updateTrip = (id, tripData) => {
  const trips = getAllTrips();
  const index = trips.findIndex(trip => trip.id === id);
  
  if (index === -1) return null;
  
  trips[index] = {
    ...trips[index],
    ...tripData,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('trips', JSON.stringify(trips));
  return trips[index];
};

// 刪除行程
export const deleteTrip = (id) => {
  const trips = getAllTrips();
  const filteredTrips = trips.filter(trip => trip.id !== id);
  localStorage.setItem('trips', JSON.stringify(filteredTrips));
};

// 生成日期範圍內的每日行程模板
export const generateDailySchedule = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const schedule = [];
  
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    schedule.push({
      date: date.toISOString().split('T')[0],
      activities: []
    });
  }
  
  return schedule;
}; 