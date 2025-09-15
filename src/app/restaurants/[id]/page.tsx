'use client';

import Link from "next/link";
import { useState } from "react";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
}

interface Restaurant {
  id: number;
  name: string;
  location: string;
  address: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  hours: string;
  phone: string;
  reservationRequired: boolean;
  priceRange: string;
  specialFeatures: string[];
}

const mockRestaurant: Restaurant = {
  id: 1,
  name: "히로시 라멘",
  location: "도쿄 시부야",
  address: "도쿄도 시부야구 우다가와초 25-4",
  category: "라멘",
  rating: 4.2,
  reviewCount: 128,
  description: "1952년부터 3대째 이어져 온 전통 라멘집입니다. 현지인들만 아는 숨겨진 명소로, 진정한 도쿄의 맛을 경험할 수 있습니다. 특히 돈코츠 베이스의 진한 국물이 일품이며, 직접 만든 면발의 쫄깃함이 최고입니다.",
  hours: "월-금: 11:30-14:30, 18:00-22:00 / 토-일: 11:30-22:00",
  phone: "+81-3-1234-5678",
  reservationRequired: false,
  priceRange: "1,000-2,000엔",
  specialFeatures: ["현지인 맛집", "3대째 전통", "수제 면발", "깊은 맛의 국물"]
};

const mockReviews: Review[] = [
  {
    id: 1,
    author: "김민수",
    rating: 5,
    date: "2024-01-15",
    content: "정말 현지인들만 오는 곳이네요! 일본어 못해도 사장님이 친절하게 도와주셨고, 라멘 맛은 정말 최고였습니다. 국물이 진하면서도 느끼하지 않아요.",
    helpful: 12
  },
  {
    id: 2,
    author: "박지영",
    rating: 4,
    date: "2024-01-10",
    content: "타베로그에서는 찾을 수 없는 진짜 숨겨진 맛집이에요. 면발이 정말 쫄깃하고 차슈도 부드러워서 완전 만족했습니다. 다음에 도쿄 오면 또 올 예정!",
    helpful: 8
  },
  {
    id: 3,
    author: "이준호",
    rating: 5,
    date: "2024-01-05",
    content: "50년 넘은 전통이 느껴지는 곳입니다. 관광지 라멘집과는 차원이 다른 깊은 맛이 있어요. 현지인 추천 받고 왔는데 정말 좋았습니다.",
    helpful: 15
  }
];

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // In a real app, we would use params.id to fetch the specific restaurant data
  console.log('Restaurant ID:', params.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-orange-600">잇쇼</Link>
          <div className="flex space-x-6">
            <Link href="/restaurants" className="text-orange-600 font-medium">맛집 찾기</Link>
            <Link href="/community" className="text-gray-700 hover:text-orange-600">커뮤니티</Link>
            <Link href="/mypage" className="text-gray-700 hover:text-orange-600">마이페이지</Link>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-600">홈</Link>
          <span className="mx-2">›</span>
          <Link href="/restaurants" className="hover:text-orange-600">맛집 찾기</Link>
          <span className="mx-2">›</span>
          <span>{mockRestaurant.name}</span>
        </div>

        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-1/2">
              <div className="h-80 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">맛집 사진</span>
              </div>
              <div className="flex p-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-gray-500">{i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{mockRestaurant.name}</h1>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-gray-600">{mockRestaurant.location}</span>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
                      {mockRestaurant.category}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`text-2xl transition-colors ${isBookmarked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                  {isBookmarked ? '♥' : '♡'}
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-xl">★★★★☆</span>
                <span className="text-xl font-semibold ml-2">{mockRestaurant.rating}</span>
                <span className="text-gray-600 ml-2">({mockRestaurant.reviewCount} 리뷰)</span>
              </div>

              {/* Quick Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <span className="w-20 text-sm text-gray-600">가격대:</span>
                  <span className="text-sm">{mockRestaurant.priceRange}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 text-sm text-gray-600">예약:</span>
                  <span className="text-sm">{mockRestaurant.reservationRequired ? '필요' : '불필요'}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 text-sm text-gray-600">전화:</span>
                  <span className="text-sm">{mockRestaurant.phone}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {mockRestaurant.specialFeatures.map((feature, index) => (
                  <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium flex-1">
                  길찾기 (Google Maps)
                </button>
                <button className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium">
                  공유하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b">
            <nav className="flex">
              {[
                { id: 'overview', label: '상세정보' },
                { id: 'reviews', label: '리뷰' },
                { id: 'location', label: '위치' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">맛집 소개</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{mockRestaurant.description}</p>
                
                <h4 className="text-lg font-semibold mb-3">운영시간</h4>
                <p className="text-gray-700 mb-6">{mockRestaurant.hours}</p>

                <h4 className="text-lg font-semibold mb-3">주소</h4>
                <p className="text-gray-700">{mockRestaurant.address}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">한국인 리뷰 ({mockReviews.length})</h3>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    리뷰 작성하기
                  </button>
                </div>

                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-medium">{review.author}</span>
                            <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">{review.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="hover:text-orange-600 transition-colors">
                          👍 도움됨 ({review.helpful})
                        </button>
                        <button className="hover:text-orange-600 transition-colors">답글</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">위치 정보</h3>
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">📍</div>
                    <p>Google Maps 연동 예정</p>
                    <p className="text-sm mt-2">{mockRestaurant.address}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">교통 정보</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• JR 시부야역에서 도보 8분</li>
                    <li>• 지하철 시부야역에서 도보 10분</li>
                    <li>• 하치코 광장에서 도보 5분</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}