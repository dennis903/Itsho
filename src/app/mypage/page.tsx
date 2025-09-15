'use client';

import Link from "next/link";
import { useState } from "react";

interface BookmarkedRestaurant {
  id: number;
  name: string;
  location: string;
  category: string;
  rating: number;
  savedDate: string;
}

interface UserReview {
  id: number;
  restaurantName: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
}

interface TripPlan {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  restaurantCount: number;
  status: 'planned' | 'ongoing' | 'completed';
}

const mockBookmarks: BookmarkedRestaurant[] = [
  {
    id: 1,
    name: "히로시 라멘",
    location: "도쿄 시부야",
    category: "라멘",
    rating: 4.2,
    savedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "스시 야마다",
    location: "오사카 도톤보리",
    category: "스시",
    rating: 4.5,
    savedDate: "2024-01-12"
  },
  {
    id: 3,
    name: "교토 텐푸라 하나",
    location: "교토 기온",
    category: "텐푸라",
    rating: 4.7,
    savedDate: "2024-01-10"
  }
];

const mockReviews: UserReview[] = [
  {
    id: 1,
    restaurantName: "히로시 라멘",
    rating: 5,
    date: "2024-01-15",
    content: "현지인들만 오는 곳이네요! 일본어 못해도 사장님이 친절하게 도와주셨고, 라멘 맛은 정말 최고였습니다.",
    likes: 12
  },
  {
    id: 2,
    restaurantName: "교토 텐푸라 하나",
    rating: 5,
    date: "2024-01-10",
    content: "50년 넘은 전통이 느껴지는 곳입니다. 관광지 라멘집과는 차원이 다른 깊은 맛이 있어요.",
    likes: 15
  }
];

const mockTripPlans: TripPlan[] = [
  {
    id: 1,
    title: "도쿄 맛집 투어",
    destination: "도쿄",
    startDate: "2024-03-15",
    endDate: "2024-03-19",
    restaurantCount: 8,
    status: 'planned'
  },
  {
    id: 2,
    title: "오사카 & 교토 여행",
    destination: "칸사이",
    startDate: "2024-01-10",
    endDate: "2024-01-14",
    restaurantCount: 12,
    status: 'completed'
  }
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<string>("bookmarks");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planned':
        return <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">예정</span>;
      case 'ongoing':
        return <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">진행중</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">완료</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-orange-600">잇쇼</Link>
          <div className="flex space-x-6">
            <Link href="/restaurants" className="text-gray-700 hover:text-orange-600">맛집 찾기</Link>
            <Link href="/community" className="text-gray-700 hover:text-orange-600">커뮤니티</Link>
            <Link href="/mypage" className="text-orange-600 font-medium">마이페이지</Link>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-orange-600">👤</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">김민수님</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>가입일: 2023-11-15</span>
                <span>•</span>
                <span>작성 리뷰: {mockReviews.length}개</span>
                <span>•</span>
                <span>저장한 맛집: {mockBookmarks.length}개</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b">
            <nav className="flex">
              {[
                { id: 'bookmarks', label: '저장한 맛집', count: mockBookmarks.length },
                { id: 'reviews', label: '내 리뷰', count: mockReviews.length },
                { id: 'trips', label: '여행 일정', count: mockTripPlans.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  {tab.label}
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Bookmarked Restaurants */}
            {activeTab === 'bookmarks' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">저장한 맛집</h3>
                  <button className="text-sm text-orange-600 hover:text-orange-700">
                    전체 관리
                  </button>
                </div>

                {mockBookmarks.length > 0 ? (
                  <div className="grid gap-4">
                    {mockBookmarks.map((restaurant) => (
                      <div key={restaurant.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-lg">{restaurant.name}</h4>
                              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
                                {restaurant.category}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{restaurant.location}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-yellow-500">★★★★☆ {restaurant.rating}</span>
                              <span className="text-gray-500">저장일: {restaurant.savedDate}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link 
                              href={`/restaurants/${restaurant.id}`}
                              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm"
                            >
                              보기
                            </Link>
                            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">🔖</div>
                    <p>아직 저장한 맛집이 없습니다.</p>
                    <Link 
                      href="/restaurants"
                      className="inline-block mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      맛집 찾아보기
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* User Reviews */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">내가 작성한 리뷰</h3>
                  <button className="text-sm text-orange-600 hover:text-orange-700">
                    전체 관리
                  </button>
                </div>

                {mockReviews.length > 0 ? (
                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{review.restaurantName}</h4>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                              <span className="text-gray-500">{review.date}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-sm text-gray-600 hover:text-orange-600">수정</button>
                            <button className="text-sm text-gray-600 hover:text-red-600">삭제</button>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-3">{review.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>👍 {review.likes}명이 도움됨</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">✍️</div>
                    <p>아직 작성한 리뷰가 없습니다.</p>
                    <Link 
                      href="/community"
                      className="inline-block mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      리뷰 작성하기
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Trip Plans */}
            {activeTab === 'trips' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">여행 일정</h3>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                    새 일정 만들기
                  </button>
                </div>

                {mockTripPlans.length > 0 ? (
                  <div className="grid gap-4">
                    {mockTripPlans.map((trip) => (
                      <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-lg">{trip.title}</h4>
                              {getStatusBadge(trip.status)}
                            </div>
                            <div className="text-gray-600 mb-2">
                              {trip.destination} • {trip.startDate} ~ {trip.endDate}
                            </div>
                            <div className="text-sm text-gray-500">
                              저장된 맛집: {trip.restaurantCount}개
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                              보기
                            </button>
                            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              수정
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">✈️</div>
                    <p>아직 만든 여행 일정이 없습니다.</p>
                    <button className="inline-block mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                      첫 여행 일정 만들기
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}