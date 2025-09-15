'use client';

import Link from "next/link";
import { useState } from "react";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  region: string;
  isBookmarkable: boolean;
}

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "히로시 라멘",
    location: "도쿄 시부야",
    category: "라멘",
    rating: 4.2,
    reviewCount: 128,
    description: "현지인들만 아는 숨겨진 라멘집. 진짜 도쿄 맛을 경험할 수 있습니다.",
    region: "tokyo",
    isBookmarkable: true
  },
  {
    id: 2,
    name: "스시 야마다",
    location: "오사카 도톤보리",
    category: "스시",
    rating: 4.5,
    reviewCount: 95,
    description: "3대째 이어져 온 전통 스시집. 신선한 해산물과 정성스러운 맛.",
    region: "osaka",
    isBookmarkable: true
  },
  {
    id: 3,
    name: "교토 텐푸라 하나",
    location: "교토 기온",
    category: "텐푸라",
    rating: 4.7,
    reviewCount: 87,
    description: "계절 재료를 사용한 고급 텐푸라. 교토의 전통을 느낄 수 있습니다.",
    region: "kyoto",
    isBookmarkable: true
  },
  {
    id: 4,
    name: "이자카야 타로",
    location: "후쿠오카 하카타",
    category: "이자카야",
    rating: 4.1,
    reviewCount: 203,
    description: "현지 직장인들이 퇴근 후 찾는 진짜 이자카야. 분위기가 최고입니다.",
    region: "fukuoka",
    isBookmarkable: true
  },
  {
    id: 5,
    name: "야키니쿠 미츠루",
    location: "히로시마 중심가",
    category: "야키니쿠",
    rating: 4.3,
    reviewCount: 156,
    description: "히로시마 최고급 와규를 맛볼 수 있는 곳. 현지인 추천 1순위.",
    region: "hiroshima",
    isBookmarkable: true
  }
];

export default function RestaurantsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [showMap, setShowMap] = useState<boolean>(false);

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    return (
      (selectedRegion === "" || restaurant.region === selectedRegion) &&
      (selectedCategory === "" || restaurant.category === selectedCategory)
    );
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviewCount - a.reviewCount;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

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
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">맛집 찾기</h1>
          
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">모든 지역</option>
              <option value="tokyo">도쿄</option>
              <option value="osaka">오사카</option>
              <option value="kyoto">교토</option>
              <option value="hiroshima">히로시마</option>
              <option value="fukuoka">후쿠오카</option>
            </select>

            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">모든 음식</option>
              <option value="라멘">라멘</option>
              <option value="스시">스시</option>
              <option value="이자카야">이자카야</option>
              <option value="야키니쿠">야키니쿠</option>
              <option value="텐푸라">텐푸라</option>
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="rating">평점순</option>
              <option value="reviews">리뷰순</option>
              <option value="name">이름순</option>
            </select>

            <button 
              onClick={() => setShowMap(!showMap)}
              className={`p-3 rounded-lg font-medium transition-colors ${
                showMap 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {showMap ? '목록 보기' : '지도 보기'}
            </button>
          </div>

          <div className="text-sm text-gray-600">
            총 {sortedRestaurants.length}개의 맛집을 찾았습니다.
          </div>
        </div>

        {/* Map/List Toggle */}
        {showMap ? (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🗺️</div>
                <p>Google Maps 연동 예정</p>
                <p className="text-sm mt-2">맛집 위치가 지도에 표시됩니다</p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Restaurant List */}
        <div className="grid gap-6">
          {sortedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex">
                {/* Image */}
                <div className="w-48 h-36 bg-gray-200 rounded-l-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-500">맛집 이미지</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">
                      <Link 
                        href={`/restaurants/${restaurant.id}`}
                        className="hover:text-orange-600 transition-colors"
                      >
                        {restaurant.name}
                      </Link>
                    </h3>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <span className="text-xl">♡</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-gray-600">{restaurant.location}</span>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
                      {restaurant.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="text-gray-600 ml-2">
                      {restaurant.rating} ({restaurant.reviewCount} 리뷰)
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {restaurant.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Link 
                      href={`/restaurants/${restaurant.id}`}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                    >
                      자세히 보기
                    </Link>
                    <span className="text-xs text-gray-500">현지인 추천</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}